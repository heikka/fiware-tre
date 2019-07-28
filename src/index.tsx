import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from "redux-thunk";

import { mapreducer } from './store/map/mapreducers';
import { doSelectMapId } from './store/map/mapactiontypes';
import { selectMapId } from './store/map/mapactions';
import { pointreducer } from './store/point/pointreducers';

//const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools as typeof compose : null || compose;

const rootReducer = combineReducers({
    map: mapreducer,
    point: pointreducer
});

/*
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));
*/
export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
    const middlewares = [thunkMiddleware];
    const middleWareEnhancer = applyMiddleware(...middlewares);
  
    const store = createStore(
      rootReducer,
      composeWithDevTools(middleWareEnhancer)
    );
  
    return store;
  }
  

const app = (
    <Provider store={configureStore()}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
