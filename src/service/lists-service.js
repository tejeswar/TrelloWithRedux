function generateIdForList(boardId) {
    let listId = parseInt(getValueFromLocaleStorage(listIdConst));
    persistValueInLocaleStorage(listIdConst, listId + 1);
    return boardId + "_list" + listId;
}
function List(boardId, listTitle) {
    this.listId = generateIdForList(boardId);
    this.listTitle = listTitle;
    this.arrOfCards = [];
    function displayList() {
        console.log("listId:" + this.listId + "@@" + this.listTitle);
    }
}
function createListObject(boardId, listTitle) {
    var listObj = new List(boardId, listTitle);
    return listObj;
}
function createListInsideBoard(_newState,boardId, listObj) {
    var singleBoard = getSpecificBoardById(boardId);
    if (singleBoard != null && singleBoard.arrOfLists != null) {

        singleBoard.arrOfLists.push(listObj);
        //also update in the listOfBoards
       // let listOfBoards = getObjFromLocaleStorage(listOfBoardsConst);//!123a
        updateBoardInsideArrOfBoards(_newState, singleBoard);
        //persistObjInLocaleStorage(listOfBoardsConst,listOfBoards);
        //updateBoardObjInLocalStorage(singleBoard);
    }
}
function updateBoardInsideArrOfBoards(_newState, _singleBoard) {
    let _listOfBoards = _newState.listOfBoards;
    if (_listOfBoards != null && _listOfBoards.length > 0) { }
    for (let count = 0; count < _listOfBoards.length; count++) {
        let singleBoardObj = _listOfBoards[count];
        if (singleBoardObj.boardId == _singleBoard.boardId) {
            _listOfBoards[count] = _singleBoard;
            return;
        }
    }
    console.log("NOTHING HAPPENED INSIDE updateBoardInsideArrOfBoards");
}
function getSpecificListById(_listId) {
    let boardId = _listId.split('_')[0];
    //let listId = _listId.split('_')[1];
    let singleBoard = getSpecificBoardById(boardId);
    if (singleBoard != null && singleBoard.arrOfLists != null) {
        for (let listCount = 0; listCount < singleBoard.arrOfLists.length; listCount++) {
            let singleList = singleBoard.arrOfLists[listCount];
            if (singleList.listId == _listId) {
                return singleList;
            }
        }
        return null;
    }
}
function updateListObjInsideBoard(_listObj,newState) {
    let _listId = _listObj.listId;
    let boardId = _listId.split('_')[0];
    let listId = _listId.split('_')[1];
    let singleBoard = getSpecificBoardById(boardId);
    for (let listCount = 0; listCount < singleBoard.arrOfLists.length; listCount++) {
        let singleListObj = singleBoard.arrOfLists[listCount];
        if (singleListObj.listId == _listId) {
            singleBoard.arrOfLists[listCount] = _listObj;
        }
    }
   // let listOfBoards = getObjFromLocaleStorage(listOfBoardsConst);
    updateBoardInsideArrOfBoards(newState, singleBoard);
    //no need to save the data in the locale storage here.updated data will be saved inside the updateBoardInsideArrOfBoards all together.
    //updateBoardObjInLocalStorage(singleBoard);
    console.log(_listId + " got updated successfully in the board and locale storage");

}
//export{updateListObjInsideBoard,getSpecificListById,updateBoardInsideArrOfBoards,createListInsideBoard,createListObject,List}

