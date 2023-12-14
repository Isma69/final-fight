import React from 'react';
import './index.css';
import Game from './Components/Game';
import * as serviceWorker from './serviceWorker';
import { store } from './store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
<Provider store={store}>
<Game />
</Provider>,
</BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
