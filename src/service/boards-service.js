console.log("boards-service.js got loaded");
function clearLocaleStorage(event) {
    localStorage.clear();
    console.log("Locale storage got cleared now:" + localStorage.length);
}
 function persistObjInLocaleStorage(key, _obj) {
    console.log(JSON.stringify(_obj));
    localStorage.setItem(key, JSON.stringify(_obj));
}
function persistValueInLocaleStorage(key, premitiveValue) {
    localStorage.setItem(key, premitiveValue);
}
function getObjFromLocaleStorage(_key) {
    return JSON.parse(localStorage.getItem(_key));
}
function getValueFromLocaleStorage(key) {
    return localStorage.getItem(key);
}
function generateIdForBoard() {
    let boardId = parseInt(getValueFromLocaleStorage(boardIdConst));
    persistValueInLocaleStorage(boardIdConst, boardId + 1);
    return "board" + boardId;

}

function Board(boardTitle) {
    this.boardId = generateIdForBoard();
    this.boardTitle = boardTitle;
    this.arrOfLists = [];
    let displayBoard = function () {
        console.log("boardId:" + this.boardId + "##" + this.boardTitle);
    }
};
function createBoard(_newState,boardTitle) {
    var boardObj = new Board(boardTitle);
    _newState.listOfBoards.push(boardObj);
   // let listOfBoards = getObjFromLocaleStorage(listOfBoardsConst);//!123a
    //listOfBoards.push(boardObj);//!123a
    //persistObjInLocaleStorage(listOfBoardsConst, listOfBoards);
}
function getSpecificBoardById(_boardId) {
    console.log("Board Id is:" + _boardId);
    let _listOfBoards = getObjFromLocaleStorage(listOfBoardsConst).listOfBoards;
    //let _listOfBoards = store.getState();
    for (var boardCount = 0; boardCount < _listOfBoards.length; boardCount++) {
        let singleBoard = _listOfBoards[boardCount];
        if (singleBoard.boardId == _boardId) {
            console.log("match found with board Id:" + singleBoard.boardId);
            return _listOfBoards[boardCount];
        }
    }
    return [];

}
function getAllListsOfABoard(_boardId) {
    let singleBoard = getSpecificBoardById(_boardId);
    if (singleBoard != null && singleBoard.arrOfLists.length > 0) {
        return singleBoard.arrOfLists;
    }
    return [];
}
//export{getAllListsOfABoard,getSpecificBoardById,createBoard,Board,getValueFromLocaleStorage,getObjFromLocaleStorage,persistValueInLocaleStorage,persistObjInLocaleStorage,clearLocaleStorage}


