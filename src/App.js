import logo from './logo.svg';
import './App.css';
import { Navigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authenticated from './components/Authenticated';
// const requestBody = {
//   "username":"admin",
//   "password":"Admin123",
// }
// const[logRedirect,setLogRedirect] = useState();
fetch("openmrs/ws/rest/v1/session",{
  headers:{
    "Content-Type":"application/x-javascript;charset=UTF-8",
    'Authorization': 'Basic '+btoa('admin:Admin123'), 
  },
  credentials:"same-origin",
  method:"get",
  redirect: 'follow'
}).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
  // const authValue = headers.get("authorization");
  const userCookieId = requestBody.sessionId
  console.log(userCookieId)

    window.localStorage.setItem("userCookieId",JSON.stringify(requestBody.sessionId))
  },)
function App() {
  return (
    <Router>
 <div className="App">
     <h1>Hello!</h1>
<Routes>
  <Route path='/auth' element={<Authenticated/>} exact/>
  </Routes>
    </div>
    </Router>
   
  );
}

export default App;
