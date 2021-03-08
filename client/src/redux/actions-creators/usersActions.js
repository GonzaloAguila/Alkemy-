import axios from "axios";
import {
 FETCH_USER,
 CREATE_USER,
 LOGGED_USER,
  } from "../constants";
  
  const fetchUserCreator = (data) => ({ 
    type: FETCH_USER, 
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
    localStorage.setItem("loggedUser", JSON.stringify(data))
    return dispatch(fetchUserCreator(data))
  }
)};

export const createUser = (newuser) => (dispatch) => {
   console.log(newuser)
  return axios.post("/api/users/newUser", newuser)
  .then(({data}) => dispatch(createUserCreator(data))
)};

export const checkUserStatus = () => (dispatch) => {
  return axios.get("/api/users/auth/me")
  .then(({data}) => dispatch(checkUserStatusCreator(data)));
};

export const logoutUser = () => (dispatch) => {
 return axios.post(`/api/users/auth/logout`)
 .then(() => dispatch(checkUserStatusCreator({}))
)};

export const updateUserWallet = (user,tier) => (dispatch) => {
  return axios.put(`/api/users/updatewallet`, {name: user, wallet: tier})
  .then(({data}) => {
    console.log(data, 'la data que me envia el server')
    dispatch(checkUserStatusCreator(data))
  }
 )};