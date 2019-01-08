import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Components/App';

// Dont Leave space betwwen <BrowserRouter> And <App />.
ReactDOM.render(<BrowserRouter><App /></BrowserRouter> , document.getElementById('root'));
