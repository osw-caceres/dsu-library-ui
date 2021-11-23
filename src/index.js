import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

ReactDOM.render(
  <React.StrictMode>
    <Provider template={AlertTemplate} {...{ timeout: 8000, position: positions.BOTTOM_CENTER }} >
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

