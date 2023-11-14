import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { msalConfig, loginRequest } from './Auth/authConfig';
import { MsalProvider } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import axios from 'axios';

const msalInstance = new PublicClientApplication(msalConfig);

axios.interceptors.request.use(
  async (response) => {
    let msalResponse: any;
    const accessTokec = sessionStorage.getItem("AccessToken");
    const account = msalInstance.getAllAccounts()[0];
    if (!accessTokec) {
      msalResponse = await msalInstance.acquireTokenSilent({
        ...loginRequest,
        account: account,
      });
    }
    if (msalResponse && msalResponse.accessToken) {
      sessionStorage.setItem("AccessToken", msalResponse.accessToken);
    }
    response.headers.Authorization = `Bearer ${accessTokec}`;
    return response;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </BrowserRouter>
);
