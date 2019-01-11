import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';

// import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

//import reducers
import uploadsReducer from './store/reducers/uploads';
import authReducer from './store/reducers/auth';

//redux debugging
const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// get reducers
const rooteReducers = combineReducers({
  auth: authReducer,
  uploads: uploadsReducer
})

// init a store
const store = createStore(rooteReducers, composeEnhancers(
  // for async calls
  applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));