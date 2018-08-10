function generateIdForCard(_listId) {
    let cardId = parseInt(getValueFromLocaleStorage(cardIdConst));
    persistValueInLocaleStorage(cardIdConst, cardId + 1);
    return _listId + "_card" + cardId;
}
function Card(_listId, _cardTitle, _cardDesc) {
    this.cardId = generateIdForCard(_listId);
    this.cardTitle = _cardTitle;
    this.cardDesc = _cardDesc;
}
function createCardObject(_listId, _cardTitle, _cardDesc) {

    let cardObj = new Card(_listId, _cardTitle, _cardDesc);
    return cardObj;
}

function createCardInsideList(_cardObj,newState) {
    let wholecardId = _cardObj.cardId;
    //wholecardId will be of the format board1_list1_card1
    let boardId = wholecardId.split('_')[0];
    let listId = wholecardId.split('_')[1];
    let cardId = wholecardId.split('_')[2];
    let singleListObj = getSpecificListById(boardId + "_" + listId);
    if (singleListObj != null && singleListObj.arrOfCards != null) {
        singleListObj.arrOfCards.push(_cardObj);

    }
    updateListObjInsideBoard(singleListObj,newState);
    console.log("card got saved successfully inside the list");
}
function updateCardInsideList(_cardObj,newState) {

    let wholecardId = _cardObj.cardId;
    console.log(wholecardId + " is going to be updated");
    let boardId = wholecardId.split('_')[0];
    let listId = wholecardId.split('_')[1];
    let cardId = wholecardId.split('_')[2];
    let singleBoard = getSpecificBoardById(boardId);
    for (let listCount = 0; listCount < singleBoard.arrOfLists.length; listCount++) {
        let singleListObj = singleBoard.arrOfLists[listCount];
        if (singleListObj.listId == boardId + "_" + listId) {
            let _arrOfCards = singleListObj.arrOfCards;
            for (let cardCount = 0; cardCount < _arrOfCards.length; cardCount++) {
                if (wholecardId == _arrOfCards[cardCount].cardId) {
                    let matchedCardObj = _arrOfCards[cardCount];
                    matchedCardObj.cardTitle = _cardObj.cardTitle;
                    matchedCardObj.cardDesc = _cardObj.cardDesc;
                }
            }
        }
    }
    
   // updateBoardObjInLocalStorage(singleBoard);
    updateBoardInsideArrOfBoards(newState, singleBoard);
    console.log(wholecardId + " got updated successfully");
}
function getCardObjectById(_cardId) {//_cardId will be of the format like board1_list1_card1
    let singleListObj = getSpecificListById(_cardId.split('_')[0] + "_" + _cardId.split('_')[1]);
    let _arrOfCards = singleListObj.arrOfCards;
    for (let cardCount = 0; cardCount < _arrOfCards.length; cardCount++) {
        if (_cardId == _arrOfCards[cardCount].cardId) {
            console.log("match found with cardId : " + _cardId);
            let matchedCardObj = _arrOfCards[cardCount];
            return matchedCardObj;
        }
    }
    return null;
}

function removeCard(_cardId,newState) {//_cardId=board1_list1_card1
    console.log(_cardId + " going to be deleted");
    let matchedListPosition = null;
    let boardId = _cardId.split("_")[0];
    let _listId = boardId + "_" + _cardId.split("_")[1];
    let singleBoard = getSpecificBoardById(boardId);
    for (let listCount = 0; listCount < singleBoard.arrOfLists.length; listCount++) {
        let singleListObj = singleBoard.arrOfLists[listCount];
        if (singleListObj.listId == _listId) {
            let _arrOfCards = singleListObj.arrOfCards;
            for (let cardCount = 0; cardCount < _arrOfCards.length; cardCount++) {
                if (_cardId == _arrOfCards[cardCount].cardId) {


                    _arrOfCards.splice(cardCount, 1);
                    singleListObj.arrOfCards = _arrOfCards;
                    console.log(_cardId + "  got deleted successfully....");
                    //console.log(singleListObj.arrOfCards);  
                    updateListObjInsideBoard(singleListObj,newState);
                    //console.log(arrOfBoards);
                }
            }
        }
    }

}

function updateCardWrapper(_beingEdittedCardId,cardTitle,cardDesc,newState){
    
     
    console.log(_beingEdittedCardId+"  card is going to be editted.");
     //clean the locale storage once card edit is identified else we will be in trouble
     localStorage.removeItem(isCardBeingEditted);
     localStorage.removeItem(beingEdittedCardId);
    let cardObj = {};
    cardObj.cardId = _beingEdittedCardId;
    cardObj.cardTitle = cardTitle;
    cardObj.cardDesc = cardDesc;
    updateCardInsideList(cardObj,newState);
    
   
    console.log(_beingEdittedCardId+"  card got updated.");
}

function addCardWrapper(cardTitle,cardDesc,_cardParentListId,newState){
    let singleCardObj = createCardObject(_cardParentListId,cardTitle,cardDesc);
      //clean up the locale storage
      localStorage.removeItem(isCardBeingSaved);
      localStorage.removeItem(cardParentListId);
    createCardInsideList(singleCardObj,newState);
      console.log("Card got added");
    
    
}