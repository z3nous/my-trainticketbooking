import React from "react";
import { Provider } from 'react-redux';

import store from './store/store';
import App from './App.jsx';

export default function Ticket(){
    return (
        <Provider store={store}>
            <App/> 
        </Provider>
    );
}