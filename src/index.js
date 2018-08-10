/*
import $ from '../node_modules/jquery/dist/jquery'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import './css/style.css'
import {getSpecificBoardById,Board,getValueFromLocaleStorage,getObjFromLocaleStorage,persistValueInLocaleStorage,persistObjInLocaleStorage,clearLocaleStorage}
*/

console.log("This is index.js");


window.onload =function(){
    console.log("window onload mehtod got called");
    
    initialiseApplicationConstants();
    initialiseEventListeners();
   
    }

    function initialiseApplicationConstants(){
        let exitingBoards =  getObjFromLocaleStorage(listOfBoardsConst); 
        if(exitingBoards == null){
          let applDataObject = {
            listOfBoards:[],
            currentView:viewNames[0]
          }
          persistObjInLocaleStorage(listOfBoardsConst,applDataObject);
          console.log("==="+getObjFromLocaleStorage(listOfBoardsConst));
        }
        let boardId = getValueFromLocaleStorage(boardIdConst);
        let listId = getValueFromLocaleStorage(listIdConst);
        let cardId = getValueFromLocaleStorage(cardIdConst);
        let anchorId = getValueFromLocaleStorage(anchorIdConst);
        if(boardId == null){
        let _boardId = 1;
        persistValueInLocaleStorage(boardIdConst,_boardId);
        }
        //let = getValueFromLocaleStorage();
        if(listId == null){
          let _listId = 1;
          persistValueInLocaleStorage(listIdConst,_listId);
        }
        //let = getValueFromLocaleStorage();
        if(cardId == null){
          let _cardId = 1;
          persistValueInLocaleStorage(cardIdConst,_cardId);
        }
        //let = getValueFromLocaleStorage();
        if(anchorId == null){
          let _anchorId = 1;
          persistValueInLocaleStorage(anchorIdConst,_anchorId);
        }
        
      }
      function initialiseEventListeners(){
        document.getElementById("navbarDropdownMenuLink").addEventListener('click',function(event){
          createListOfBoardLinks(event);
        });
        document.getElementById('clearLocale').addEventListener('click',function(event){
          clearLocaleStorage(event);
        });
      }
      

  /*
  $('#cardModal').on('click', '#cardSave', function (event) {
    let cardTitle = $('#formGroupCardTitleInput').val();
    let cardDesc = $('#formGroupCardDescriptionInput').val();
    console.log("Card title :"+cardTitle + " is going to be saved");
      
    
    
    let iscardgettingEditted = localStorage.getItem(isCardBeingEditted);
    let iscardgettingsaved = localStorage.getItem(isCardBeingSaved);
    if(iscardgettingEditted === isCardBeingEdittedValue){
      
      let _beingEdittedCardId = localStorage.getItem(beingEdittedCardId);
      console.log(_beingEdittedCardId+"  card is going to be editted.");
      let cardObj = {};
      cardObj.cardId = _beingEdittedCardId;
      cardObj.cardTitle = cardTitle;
      cardObj.cardDesc = cardDesc;
      updateCardInsideList(cardObj);
      $('#cardClose').click();
      let boardId = _beingEdittedCardId.split("_")[0];
      let _thisObj = {};
      _thisObj.id = boardId;
      _thisObj.innerText = getSpecificBoardById(boardId).boardTitle;
      createSpecificBoardSection(_thisObj, "");
      //clean the locale storage once card edit is done else we will be in trouble
      localStorage.removeItem(isCardBeingEditted);
      localStorage.removeItem(beingEdittedCardId);
      console.log(_beingEdittedCardId+"  card got updated.");
    }
    else if(iscardgettingsaved === isCardBeingSavedValue){
      let _cardParentListId = localStorage.getItem(cardParentListId);
      let singleCardObj = createCardObject(_cardParentListId,cardTitle,cardDesc);
      createCardInsideList(singleCardObj);
      console.log("Card got added");
      $('#cardClose').click();
      let singleCardId = singleCardObj.cardId;
      let boardId = singleCardId.split("_")[0];
      let _thisObj = {};
      _thisObj.id = boardId;
      _thisObj.innerText = getSpecificBoardById(boardId).boardTitle;
      createSpecificBoardSection(_thisObj, "");
      //clean up the locale storage
      localStorage.removeItem(isCardBeingSaved);
      localStorage.removeItem(cardParentListId);
         
    }
    else{
      console.error("controll should not come inside it.something is wrong");
    }
    
  })
     */   