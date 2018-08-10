/*
<div id="board1" class="specificBoardClass">
<div id="specificBoardName">
    <span id="boardHeader">b1</span>
    <span id="boardIdSpan">board1</span>
</div>
<div class="addListButton">
    <button id="saveList" type="button" class="btn btn-primary" data-toggle="modal" data-target="#listModal" data-placement="top">+Add List</button>
</div>
<div id="listContainer">
    <div id="board1_list1" class="task-list">
        <div class="task-header">
            <span>list1</span>
        </div>
        <div id="board1_list1_card1" class="todo-task" style="background:green" draggable="true">
            <div class="task-header">card1</div>
            <div class="task-description">desc</div>
            <button class="editCard">Edit</button>
            <button class="deleteCard">delete</button>
        </div>
        <div class="addCardButton">
            <button id="save" type="button" class="btn btn-primary open-modal" data-toggle="modal" data-target="#cardModal"
                data-placement="top">Add Card</button>
        </div>
    </div>
    <div id="board1_list2" class="task-list">
        <div class="task-header">
            <span>list2</span>
        </div>
        <div class="addCardButton">
            <button id="save" type="button" class="btn btn-primary open-modal" data-toggle="modal" data-target="#cardModal"
                data-placement="top">Add Card</button>
        </div>
    </div>
</div>
</div>
*/
//import {getSpecificBoardById,getAllListsOfABoard} from "../service/boards-service";
/*
function renderListsView(_boardId) {
    //FIRST GET THE BOARD MODEL FROM THE DB
    let singleBoardObj = getSpecificBoardById(_boardId);
    let boardname = singleBoardObj.boardTitle;

    //GET ALL THE LISTS OF THE SPECIFIED BOARDID FROM THE STATE AND CREATE THE VIEW
    let listsOfLists = getAllListsOfABoard(_boardId);
    let wholeBoardSection = "";
    let boardHeaderSection = `
    <div id=${_boardId} class="specificBoardClass">
    <div id="specificBoardName">
        <span id="boardHeader">${boardname}</span>
        <span id="boardIdSpan">${_boardId}</span>
    </div>
    <div class="addListButton">
        <button id="saveList" type="button" class="btn btn-primary" data-toggle="modal" data-target="#listModal" data-placement="top">+Add List</button>
    </div>`;
    let listContainerSection = `<div id="listContainer">`;
    wholeBoardSection = wholeBoardSection+boardHeaderSection+listContainerSection;
    let specificBoardEndingSection = `</div>
                       </div>`;//These two ending divs are for listContainer and specificBoardClass
    let allListsHtmlString = "";//It just needs to be appended to wholeBoardSection
   
    for (let listCount = 0; listCount < listsOfLists.length; listCount++) {
        let singleListObj = listsOfLists[listCount];
        let specificList = `
       <div id=${singleListObj.listId} class="task-list">
          <div class="task-header">
             <span>${singleListObj.listTitle}</span>
          </div>`;
          allListsHtmlString = allListsHtmlString+specificList;
        let listOfCards = singleListObj.arrOfCards;
        let wholeCardSectionOfAList = "";
       
        for(let cardCount = 0; cardCount < listOfCards.length; cardCount++ ) {
            let singleCardSection = "";
            let singleCardObj = listOfCards[cardCount];
            singleCardSection = singleCardSection+`
            <div id=${singleCardObj.cardId} class="todo-task" style="background:green" draggable="true">
            <div class="task-header">${singleCardObj.cardTitle}</div>
            <div class="task-description">${singleCardObj.cardDesc}</div>
            <button class="editCard">Edit</button>
            <button class="deleteCard">delete</button>
        </div>
            `;
            wholeCardSectionOfAList = wholeCardSectionOfAList+singleCardSection;
        }
    

       let addCardButtonPerList = `
            <div class="addCardButton">
                <button id="save" type="button" class="btn btn-primary open-modal" data-toggle="modal" data-target="#cardModal"
                    data-placement="top" onclick="abc">Add Card</button>
            </div>
            </div>`;//this ending div is for a specific list item <div id="board1_list1"
           allListsHtmlString =allListsHtmlString+wholeCardSectionOfAList+addCardButtonPerList;
    }
  
    wholeBoardSection  = wholeBoardSection+allListsHtmlString+specificBoardEndingSection;
    console.log(wholeBoardSection);
    document.getElementById("BoardsContainer").innerHTML = wholeBoardSection;
    
}
*/
function renderListsViewUpdate(){
    
    let boardId = document.getElementById("boardIdSpan").innerHTML;
    console.log("UPDATING LIST VIEW");
    if(boardId != null || boardId != undefined)
    renderListsView1(boardId);
}

store.subscribe(() => {
    let currentView = store.getState().currentView;
    console.log("CURRENT VIEW:"+currentView);
    if(currentView === viewNames[1]) {
        renderListsViewUpdate();
    }
});

function renderListsView1(_boardId) {
    //FIRST GET THE BOARD MODEL FROM THE DB
    let singleBoardObj = getSpecificBoardById(_boardId);
    let boardname = singleBoardObj.boardTitle;

    let boardContainer = document.getElementById(boardContainerConst);
boardContainer.innerHTML = "";
   let singleBoardDiv = document.createElement('div');
   singleBoardDiv.setAttribute('id', _boardId);
   singleBoardDiv.setAttribute('class', 'specificBoardClass');
   boardContainer.appendChild(singleBoardDiv);

   let specificBoardDiv = document.createElement('div');
   singleBoardDiv.appendChild(specificBoardDiv);
   specificBoardDiv.setAttribute('id', "specificBoardName");

   let boardNameSpan = document.createElement("span");
   boardNameSpan.setAttribute('id',"boardHeader");
   boardNameSpan.innerText = boardname;
   specificBoardDiv.appendChild(boardNameSpan);
   let boardIdSpan = document.createElement("span");
   boardIdSpan.setAttribute('id',"boardIdSpan");
   boardIdSpan.innerText = _boardId;
   specificBoardDiv.appendChild(boardIdSpan);

   let newButton = createAddListButton(boardname);
   singleBoardDiv.appendChild(newButton);

//UPTO ABOVE IT IS CORRECT

let listContainerDiv = document.createElement("div");
singleBoardDiv.appendChild(listContainerDiv);

//GET ALL THE LISTS OF THE SPECIFIED BOARDID FROM THE STATE AND CREATE THE VIEW
let listsOfLists = getAllListsOfABoard(_boardId);

for (let listCount = 0; listCount < listsOfLists.length; listCount++) {
    let singleListObj = listsOfLists[listCount];
    let singleListDiv = document.createElement('div');//<div id="singleList" class="task-list">
    singleListDiv.setAttribute('id', singleListObj.listId);
    singleListDiv.setAttribute('class', 'task-list');

    /*

singleListDiv.addEventListener("dragover",function(event){
    event.preventDefault();
    //allowDrop(event);//not required
},false);
singleListDiv.addEventListener("drop",function(event){
   // alert('dropped');
    drop(event);
},false);
    */
   let listHeaderDiv = document.createElement('div');// <div class="task-header">
   listHeaderDiv.setAttribute('class', 'task-header');
   let listHeaderSpan = document.createElement('span');//<span>list header<span>
   listHeaderSpan.innerText = singleListObj.listTitle;
   listHeaderDiv.appendChild(listHeaderSpan); //</div>
   singleListDiv.appendChild(listHeaderDiv);
   listContainerDiv.appendChild(singleListDiv);

   
///////////////ADD ALL THE CARDS TO THE LIST          ////////

let noOfCardsInsideList = singleListObj.arrOfCards.length;
console.log(singleListObj.listId +" has "+noOfCardsInsideList+" cards");
for(let cardCount = 0;cardCount<noOfCardsInsideList;cardCount++){
    let singleCardObj = singleListObj.arrOfCards[cardCount];
    createSingleCardDOM(singleCardObj);
}

let addCardButtonDiv = document.createElement('div');// <div class="addCardButton">
addCardButtonDiv.setAttribute('class', 'addCardButton');
let addCardButton = document.createElement('button');//<button id="save" type="button" class="btn btn-primary"
addCardButton.setAttribute('id', 'save');
addCardButton.setAttribute('type', 'button');
addCardButton.setAttribute('class', 'btn btn-primary open-modal');
addCardButton.setAttribute('data-toggle', 'modal');
addCardButton.setAttribute('data-target', '#cardModal');

addCardButton.addEventListener('click', function(event) {
    // `this` refers to the anchor tag that's been clicked
   console.log("modal going to be poped up");
   let parentListId = $(this).parent().parent().attr('id');
   console.log("Parent list is:"+parentListId);

   //just save this parentListId so that we can use while actually saving the card
   localStorage.setItem(cardParentListId,parentListId);
   localStorage.setItem(isCardBeingSaved,isCardBeingSavedValue);

  }, true);
addCardButton.setAttribute('data-placement', 'top');
addCardButton.innerText = 'Add Card';
addCardButtonDiv.appendChild(addCardButton);// </div>
singleListDiv.appendChild(addCardButtonDiv);

 }//END OF lists loop
 
}//END OF renderListsView1

/*
//////////////////////////////////////////////////////////////////////////////




           
}
*/
function createSingleCardDOM(_singelCarObj) {
    let cardId = _singelCarObj.cardId;
    let parentListId = cardId.split("_")[0]+"_"+cardId.split("_")[1];
    let parentListDiv = document.getElementById(parentListId);

let cardIdDiv = document.createElement("div");
cardIdDiv.setAttribute("id",_singelCarObj.cardId);
console.log("#"+_singelCarObj.cardId);
//$("#"+_singelCarObj.cardId).draggable();
cardIdDiv.setAttribute("class","todo-task");
cardIdDiv.setAttribute("style","background:green");

cardIdDiv.setAttribute("draggable","true");
cardIdDiv.addEventListener("dragstart",function(event){
    console.log(event.target.id+" getting dragged");
    event.dataTransfer.setData("text", event.target.id);
    //drag(event);
});


let cardTitleDiv = document.createElement("div");
cardTitleDiv.setAttribute("class","task-header");
cardTitleDiv.innerText = _singelCarObj.cardTitle;
cardIdDiv.appendChild(cardTitleDiv);

let cardDescDiv = document.createElement("div");
cardDescDiv.setAttribute("class","task-description");
cardDescDiv.innerText = _singelCarObj.cardDesc;
cardIdDiv.appendChild(cardDescDiv);

let cardEditButton = document.createElement("button");
cardEditButton.setAttribute("class","editCard");
cardEditButton.innerText = "Edit";
cardIdDiv.appendChild(cardEditButton);
cardEditButton.addEventListener("click",function(){
    let _that = this;
    populateModal(_that);

});
let cardDeleteButton = document.createElement("button");
cardDeleteButton.setAttribute("class","deleteCard");
cardDeleteButton.innerText = "delete";
cardDeleteButton.addEventListener("click",function(event){
    let cardId = $(this).parent().attr('id');
    console.log("delte card:"+parentListId);

    let action = {
        type:"DELETE_CARD",
       cardId:cardId,
        viewName:viewNames[1]
    }
    store.dispatch(action);
    
    let boardId = cardId.split("_")[0];
   });
cardIdDiv.appendChild(cardDeleteButton);
parentListDiv.appendChild(cardIdDiv);
console.log("createSingleCardDOM::  "+parentListDiv);

}
 function populateModal(_this) {
  
  //console.dir(_this);
  let editCardId = $(_this).parent().attr("id");
  console.log("edit card got clicked:"+editCardId);
  //saving this property in order to know whether 'save card' is being called as part of editing or adding
  localStorage.setItem(isCardBeingEditted,isCardBeingEdittedValue);
  localStorage.setItem(beingEdittedCardId,editCardId);
  let singleCardObj = getCardObjectById(editCardId);
  $('#formGroupCardTitleInput').val(singleCardObj.cardTitle);
  $('#formGroupCardDescriptionInput').val(singleCardObj.cardDesc);
      $("#cardModal").modal();
}
function createAddListButton(boardTitle) {
    console.log("======createAddListButton========");

    let newButton = document.createElement('button');
    newButton.setAttribute('id', 'saveList');
    newButton.setAttribute('type', 'button');
    newButton.setAttribute('class', 'btn btn-primary');
    newButton.setAttribute('data-toggle', 'modal');
    newButton.setAttribute('data-target', '#listModal');
    newButton.setAttribute('data-placement', 'top');
    newButton.innerText = "+Add List";

    let newDiv = document.createElement('div');
    newDiv.setAttribute('class', 'addListButton');
    newDiv.appendChild(newButton);


    return newDiv;

}


