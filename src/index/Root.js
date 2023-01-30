import store from "./store/store";
import './Root.css'
import App from './App.jsx'
import React from 'react';
import { Provider } from 'react-redux';

export default function Root(){
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    );

}
