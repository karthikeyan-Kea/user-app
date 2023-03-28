import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { persistor, store } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Users from './pages/users';
import ApiUsers from './pages/apiUsers/ApiUsers';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            <Route path="/" element={<Users />}></Route>
            <Route path="/api-users" element={<ApiUsers />}></Route>
          </Routes>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
