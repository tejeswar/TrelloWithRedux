console.log("reducer got loaded");
function addBoardReducer(currentState, action) {
    console.log("inside addBoardReducer Reducer");
    if (typeof currentState === 'undefined' || currentState === null) {
        console.log("RETURNED FROM UNDEFINED");
        let initialState = {
            listOfBoards: [],
            currentView:viewNames[0]
        };
        
        console.dir(initialState);
        return initialState;
    }
   // console.log(Array.isArray(currentState));
    //let newState = Object.assign([],currentState);
       // let newState = [...currentSate]
       let newState = JSON.parse(JSON.stringify(currentState));
    console.dir(newState);
    switch (action.type) {
        case "ADD_BOARD":
            console.log(action.boardTitle+" going to be added");
            createBoard(newState, action.boardTitle);
            console.log("Board '" + action.boardTitle + "' got added...");
            newState.currentView = action.viewName;
            persistObjInLocaleStorage(listOfBoardsConst, newState);
            return newState;
        case "ADD_LIST":
            let _payLoad = action.payload;
            let boardId = _payLoad.boardId;
            let listTitle = _payLoad.listName;
            console.log(boardId +" : "+listTitle);
            let newlyCreatedListObj = createListObject(boardId, listTitle);
            createListInsideBoard(newState,boardId, newlyCreatedListObj);
            newState.currentView = action.viewName;
            persistObjInLocaleStorage(listOfBoardsConst, newState);
            return newState;
        case "ADD_CARD":
            let _payLoad1 = action.payload;
            addCardWrapper( _payLoad1.cardTitle,_payLoad1.cardDesc, _payLoad1.cardParentListId,newState);
            newState.currentView = action.viewName;
            persistObjInLocaleStorage(listOfBoardsConst, newState);
            return newState;
                    

        case "EDIT_CARD":
            let _payLoad2 = action.payload;
            updateCardWrapper( _payLoad2.beingEdittedCardId,_payLoad2.cardTitle,_payLoad2.cardDesc,newState);
            persistObjInLocaleStorage(listOfBoardsConst,newState);
            return newState;

        case "DELETE_CARD":
           
            let cardId = action.cardId;
            removeCard(cardId,newState);
            persistObjInLocaleStorage(listOfBoardsConst, newState);
            return newState;

        default:
            return currentState;
 
    }
}

