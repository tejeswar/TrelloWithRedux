let addList = function (event) {
    console.log("Add List Button got clicked");
    console.dir(event);
    let boardId = event.target.id;//board1
    renderListsView(boardId);

}
$('#listModal').on('click', '#listSave', function (event) {

    let listTitle = $('#formGroupListTitleInput').val();
  
    let boardId = document.getElementById("boardIdSpan").innerText;
    console.log("List title :" + listTitle + " going to be added with board id: " + boardId);
   /*
    let newlyCreatedListObj = createListObject(boardId, listTitle);
    createListInsideBoard(boardId, newlyCreatedListObj);
  
    console.log("List got added to the board");
    console.log("Board '" + boardId + "lists");
    */
   let action = {
       type:"ADD_LIST",
       payload:{
           listName:listTitle,
           boardId:boardId
       },
       viewName:viewNames[1]
   }
   store.dispatch(action);
    $('#listClose').click();

  
  })