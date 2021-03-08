import axios from "axios";
import {
FETCH_OPERATIONS,
CREATE_OPERATION,
UPDATE_OPERATION,
DELETE_OPERATION
  } from "../constants";
  
  const fetchOperationsCreator = (data) => ({ 
    type: FETCH_OPERATIONS, 
    data 
  });
  
  const createOperationCreator = (data) => ({
    type: CREATE_OPERATION,
    data
  });

  const updateOperationCreator = (data) => ({
    type: UPDATE_OPERATION,
    data
  });

  const deleteOperationCreator = (data) => ({
    type: DELETE_OPERATION,
    data
  });

 
 export const fetchOperations = (id) => (dispatch) => {
  return axios.get(`/api/operations/getOperations/${id}`)
  .then(({data}) => {
    localStorage.setItem("operations", JSON.stringify(data))
    return dispatch(fetchOperationsCreator(data))
  }
)};

export const createOperation = (operationData) => (dispatch) => {
  return axios.post(`/api/operations/newOperation`, operationData)
  .then(({data}) => dispatch(createOperationCreator(data))
)};

