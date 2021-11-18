import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './Pages/Dashboard';

export default function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}
