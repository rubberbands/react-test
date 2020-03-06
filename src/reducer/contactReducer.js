import * as actionTypes from '../actions/actionTypes';

export default (state = {list: [], current: null}, action) => {
    switch (action.type){
       case actionTypes.GET_CONTACT:
      console.log("RUN!!!");
      return{
        ...state,
        current: JSON.stringify(state.list[0])
      };
      case actionTypes.CREATE_NEW_CONTACT:
        return {
          ...state,
         list: state.list.concat(action.payload.contact)
        };
      case actionTypes.REMOVE_CONTACT:
        console.log(action.payload);
        return {
          ...state,
          list: state.list.filter ((data, i) => i !== action.payload)
        };
      case actionTypes.UPDATE_CONTACT:
      return{
        ...state,
        list: state.list.map((data, i) => {
          if(i == action.payload.id){
            return action.payload.contact;
          } else {
            return data;
          }
        }) 
      };
      default:
        return state;
    }
  };