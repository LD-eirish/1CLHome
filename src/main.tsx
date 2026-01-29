import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './application/App';
import './presentation/styles/base.css';
import './presentation/styles/layout.css';
import './presentation/styles/components.css';
import './presentation/styles/navigation.css';
import './presentation/styles/accessibility.css';

const rawBase = import.meta.env.BASE_URL as string;
const basename = rawBase.replace(/\/$/, '') || '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
