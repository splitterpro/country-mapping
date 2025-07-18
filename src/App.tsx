import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
//components
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
//style
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
//redux
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
