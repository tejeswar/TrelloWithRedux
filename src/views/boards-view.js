/*
<div class="board-list" id="pending">
   <div class="task-header flex-container">
     <a id="board1" href="#">Done</a>
   </div>
</div>
*/
function renderBoardsView(){
    console.log("inside renderBoardsView");
   

    let listOfBoards = store.getState().listOfBoards;
    console.log("No of boards inside Redux state:"+listOfBoards.length);
    let singleBoardView = "";
    for(let boardCount = 0;boardCount < listOfBoards.length ; boardCount++){
      let singleBoardObj = listOfBoards[boardCount];
      let boardTitle = singleBoardObj.boardTitle;
      let boardId = singleBoardObj.boardId;
      singleBoardView = singleBoardView+
      `<div class="board-list" id="pending">
          <div class="task-header flex-container">
             <a id=${boardId} href="#" class="todoItemClass" onClick="viewBoard(event)">${boardTitle}</a>
          </div>
      </div>
      `;
    }
    document.getElementById("BoardsContainer").innerHTML ="<br>"+ singleBoardView;
  
}
store.subscribe(()=>{
  let currentView = store.getState().currentView;
  console.log("CURRENT VIEW:"+currentView);
  if(currentView == viewNames[0]){
    renderBoardsView();
  }

});