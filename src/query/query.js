import React from "react";
import { Provider } from 'react-redux';

import store from './store/store';
import './query.css';
import App from './App.jsx';

export default function Query(){
    return (
        <Provider store={store}>
            <App/> 
        </Provider>
    );
}