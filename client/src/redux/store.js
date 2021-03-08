import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../redux/reducers'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducer, composeEnhancers(applyMiddleware(createLogger(), thunkMiddleware)));