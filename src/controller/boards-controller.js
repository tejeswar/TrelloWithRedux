console.log("todo controller got loaded");
$('#boardModal').on('click', '#save', function (event) {
    let boardName = $('#formGroupExampleInput').val();
    console.log("Board title is:" + boardName);
    let action = {
        type: "ADD_BOARD",
        boardTitle: boardName,
        viewName:viewNames[0]
    }
    store.dispatch(action);
    $('#close').click();

});
let viewBoard = function (event) {
    event.preventDefault();
    console.log("Button got clicked");
    //console.dir(event);
    let boardId = event.target.id;//board1
    //renderListsView(boardId);
    renderListsView1(boardId);

}
//onClick=viewBoard(event)
  //$('#toDocontainer').on('click', '.todoItemClass', deleteTodoItem1);
  //$('.task-header .flex-container').on('click', '.todoItemClass', viewBoard);