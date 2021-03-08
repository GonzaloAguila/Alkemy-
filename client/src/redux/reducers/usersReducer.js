import {
    CREATE_USER,
    FETCH_USER,
    LOGGED_USER
    } from "../constants";
    
    const initialState = {
      user: {},
      lastUser: {},
      loggedUser: {}
    };
    
    export default (state = initialState, action) => {
      switch (action.type) {
        case FETCH_USER:
          return { ...state, user: action.data };   
        case CREATE_USER:
            return { ...state, lastUser: action.data };
        case LOGGED_USER:
            return { ...state, loggedUser: action.data };        
        default:
          return state;
      }
  } 