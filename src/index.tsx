import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import QueryProvider from './providers/QueryProvider';

ReactDOM.render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
