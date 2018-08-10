
console.log("store.js got loaded");
let currentSate = getObjFromLocaleStorage(listOfBoardsConst);
let store = Redux.createStore(addBoardReducer,currentSate);