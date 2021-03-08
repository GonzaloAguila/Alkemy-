import {
    CREATE_USER,
    FETCH_USER,
    FETCH_USER_ERROR
    } from "../constants";
    
    const initialState = {
      user: {},
      lastUser: {},
      error: ""
    };
    
    export default (state = initialState, action) => {
      switch (action.type) {
        case FETCH_USER:
          return { ...state, user: action.data };
        case FETCH_USER_ERROR:
            return { ...state, error: action.data };     
        case CREATE_USER:
            return { ...state, lastUser: action.data };       
        default:
          return state;
      }
  } 