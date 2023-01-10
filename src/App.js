import logo from './logo.svg';
import './App.css';
import { Form, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authenticated from './components/Authenticated';
import Home from './components/Home';
import Login from './components/Login';
import RetiredUsers from './components/RetiredUsers';
function App() {
  return (
<Router>
  <Routes>
<Route path="/login" element={<Login/>} exact />
<Route path ='/auth' element= {<Authenticated/>}/>
</Routes>
</Router>
  );
}

export default App;
