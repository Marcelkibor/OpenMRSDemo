import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authenticated from './components/Authenticated';
import ChangePassword from './components/ChangePassword';
import Login from './components/Login';
import RetiredUsers from './components/RetiredUsers';
import GetLocations from './components/GetLocations';
import CreateUser from './components/CreateUser';
function App() {
  return (
<Router>
  <Routes>
<Route path="/" element={<Login/>} exact />
<Route path ='/authenticated' element= {<Authenticated/>}/>
<Route path='/retired' element = {<RetiredUsers/>}/>
<Route path = "/changepassword" element = {<ChangePassword/>}/>
<Route path = "/locations" element = {<GetLocations/>}/>
<Route path = "/createuser" element = {<CreateUser/>}/>
</Routes>
</Router>
  );
}

export default App;
