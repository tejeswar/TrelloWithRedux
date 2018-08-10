
$('#cardModal').on('click', '#cardSave', function (event) {
    let cardTitle = $('#formGroupCardTitleInput').val();
    let cardDesc = $('#formGroupCardDescriptionInput').val();
    console.log("Card title :"+cardTitle + " is going to be saved");
    
    let iscardgettingEditted = localStorage.getItem(isCardBeingEditted);
    let iscardgettingsaved = localStorage.getItem(isCardBeingSaved);
    if(iscardgettingEditted === isCardBeingEdittedValue){
        let _beingEdittedCardId = localStorage.getItem(beingEdittedCardId);
        let action = {
            type:"EDIT_CARD",
            payload:{
                cardTitle:cardTitle,
                cardDesc:cardDesc,
                beingEdittedCardId:_beingEdittedCardId
            },
            viewName:viewNames[1]
        }
        $('#cardClose').click();
        store.dispatch(action);
      
       
    }
    else if(iscardgettingsaved === isCardBeingSavedValue){
      let _cardParentListId = localStorage.getItem(cardParentListId);
     let action = {
        type:"ADD_CARD",
        payload:{
            cardTitle:cardTitle,
            cardDesc:cardDesc,
            cardParentListId:_cardParentListId
         },

        viewName:viewNames[1]
    }
    $('#cardClose').click();
    store.dispatch(action);

      
         
    }
    else{
      console.error("controll should not come inside it.something is wrong");
    }
    
  })
  