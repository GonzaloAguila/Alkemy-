import axios from "axios";
import {
 FETCH_USER,
 CREATE_USER,
 LOGGED_USER,
 FETCH_USER_ERROR
  } from "../constants";
  
  const fetchUserCreator = (data) => ({ 
    type: FETCH_USER, 
    data 
  });
  
  const fetchUserErrorCreator = (data) => ({ 
    type: FETCH_USER_ERROR, 
    data 
  });

  const createUserCreator = (data) => ({
    type: CREATE_USER,
    data
  });

  const checkUserStatusCreator = (data) => ({
    type: LOGGED_USER,
    data
  });


 
 export const fetchUser = (userdata) => (dispatch) => {
  return axios.post(`/api/users/login`, userdata)
  .then(({data}) => {
    if(data.id){
    localStorage.setItem("loggedUser", JSON.stringify(data))
    return dispatch(fetchUserCreator(data))
    }else {
    return dispatch(fetchUserErrorCreator("Credenciales incorrectas"))  
    }
  }
)};

export const createUser = (newuser) => (dispatch) => {
  return axios.post("/api/users/newUser", newuser)
  .then(({data}) => dispatch(createUserCreator(data))
)};

export const logoutUser = () => (dispatch) => {
 return axios.post(`/api/users/auth/logout`)
 .then(() => dispatch(checkUserStatusCreator({}))
)};
