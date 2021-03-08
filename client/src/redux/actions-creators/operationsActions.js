import axios from "axios";
import {
  FETCH_OPERATIONS,
  CREATE_OPERATION,
  UPDATE_OPERATION,
  DELETE_OPERATION,
  FETCH_IN_OPERATIONS,
  FETCH_OUT_OPERATIONS,
} from "../constants";

const fetchOperationsCreator = (data) => ({
  type: FETCH_OPERATIONS,
  data,
});

const fetchInOperationsCreator = (data) => ({
  type: FETCH_IN_OPERATIONS,
  data,
});

const fetchOutOperationsCreator = (data) => ({
  type: FETCH_OUT_OPERATIONS,
  data,
});

const createOperationCreator = (data) => ({
  type: CREATE_OPERATION,
  data,
});

const updateOperationCreator = (data) => ({
  type: UPDATE_OPERATION,
  data,
});

const deleteOperationCreator = (data) => ({
  type: DELETE_OPERATION,
  data,
});

export const fetchOperations = (id, type) => (dispatch) => {
  return axios.get(`/api/operations/getOperations/${id}`).then(({ data }) => {
    if (type === "in") {
      localStorage.setItem("operations", JSON.stringify(data));
      return dispatch(fetchInOperationsCreator(data));
    } else if (type === "out") {
      localStorage.setItem("operations", JSON.stringify(data));
      return dispatch(fetchOutOperationsCreator(data));
    }
    localStorage.setItem("operations", JSON.stringify(data));
    return dispatch(fetchOperationsCreator(data));
  });
};

export const createOperation = (operationData) => (dispatch) => {
  return axios
    .post(`/api/operations/newOperation`, operationData)
    .then(({ data }) => dispatch(createOperationCreator(data)));
};

export const deleteOperation = (operationId) => (dispatch) => {
  console.log(operationId);
  return axios
    .delete(`/api/operations/deleteOperation/${operationId}`)
    .then(() => dispatch(deleteOperationCreator(operationId)));
};
