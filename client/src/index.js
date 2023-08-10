import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store';
import { setUser } from './redux/user/userSlice';

const storedUser = localStorage.getItem('user');
if (storedUser) {
  const parsedUser = JSON.parse(storedUser);
  store.dispatch(setUser(parsedUser));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
