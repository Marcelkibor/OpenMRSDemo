import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authenticated from './components/Authenticated';
import Login from './components/Login';
import Navigator from './components/Navigator';
import SearchPatient from './components/SearchPatient';
function App() {
  return (
<Router>
  <Navigator/>
  <Routes>
<Route path="/" element={<Login/>} exact />
<Route path ='/authenticated' element= {<Authenticated/>}/>
<Route path='/search' element = {<SearchPatient/>}/>
</Routes>
</Router>
  );
}

export default App;
