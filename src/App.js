import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authenticated from './components/Authenticated';
import Login from './components/Login';
import Navigator from './components/Navigator';
import SearchPatient from './components/SearchPatient';
import UserPanel from './components/UserPanel';
import Testing from './components/Testing';
function App() {
  return (
<Router>
  <Navigator/>
  <Routes>
<Route path="/" element={<Login/>} exact />
<Route path ='/authenticated' element= {<Authenticated/>}/>
<Route path='/search' element = {<SearchPatient/>}/>
<Route path='/panel' element = {<UserPanel/>}/>
<Route path='/test' element = {<Testing/>}/>
</Routes>
</Router>
  );
}

export default App;
