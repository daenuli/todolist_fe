import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Getstarted from './components/Getstarted';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import './App.css';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Getstarted />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<PrivateRoute element={Home} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
