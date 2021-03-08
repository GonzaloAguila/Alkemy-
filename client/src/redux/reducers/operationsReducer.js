import {
    CREATE_OPERATION,
    UPDATE_OPERATION,
    DELETE_OPERATION,
    FETCH_OPERATIONS,
    FETCH_IN_OPERATIONS,
    FETCH_OUT_OPERATIONS
    } from "../constants";
    
    const initialState = {
      operations: [],
    };

    const updateOperation = (newoperation) => {
        const oldOpIndex = initialState.operations.findIndex((op) => op.id = newoperation.id)
        return initialState.operations[oldOpIndex] = newoperation
    }
    
    export default (state = initialState, action) => {
      switch (action.type) {
        case FETCH_OPERATIONS:
          return { ...state, operations: action.data};
        case FETCH_IN_OPERATIONS:
          return { ...state, operations: action.data.filter((op) => op.type === "in")};
        case FETCH_OUT_OPERATIONS:
          return { ...state, operations: action.data.filter((op) => op.type === "out")};         
        case CREATE_OPERATION:
          return { ...state, operations:[...state.operations, action.data] };  
        case DELETE_OPERATION:
          return { ...state, operations: state.operations.filter((op) => op.id !== action.data)}
        case UPDATE_OPERATION:
          return { ...state, operations: updateOperation(action.data)}; ;          
        default:
          return state;
      }
  } 