import store from "./store/store";
import App from './App.jsx'
import React from 'react';
import { Provider } from 'react-redux';

export default function Order(){
    return(
        <Provider store={store}>
            <App/>
        </Provider>
    );

}
