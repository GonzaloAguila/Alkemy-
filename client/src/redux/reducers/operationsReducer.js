import {
    CREATE_OPERATION,
    UPDATE_OPERATION,
    DELETE_OPERATION,
    FETCH_OPERATIONS
    } from "../constants";
    
    const initialState = {
      operations: [],
    };
    
    export default (state = initialState, action) => {
      switch (action.type) {
        case FETCH_OPERATIONS:
          return { ...state, operations: action.data};   
        case CREATE_OPERATION:
            return { ...state, operations:[...state.operations, action.data] };       
        default:
          return state;
      }
  } 