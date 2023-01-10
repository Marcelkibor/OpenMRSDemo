import logo from './logo.svg';
import './App.css';
import { Form, Navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect  } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Authenticated from './components/Authenticated';
import Home from './components/Home';
function App() {
  const [logSession,isLogSession] = useState(false);
function loginFunc(){
  fetch("openmrs/ws/rest/v1/session",{
    headers:{
      "Content-Type":"application/x-javascript;charset=UTF-8",
      'Authorization': 'Basic '+btoa('admin:Admin123'), 
    },
    credentials:"include",
    method:"get",
    redirect: 'follow'
  }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
    // const authValue = headers.get("authorization");
    const userCookieId = requestBody.sessionId
    console.log(userCookieId)
  
      window.localStorage.setItem("JSESSIONID",JSON.stringify(requestBody.sessionId))
    },)
  isLogSession(!logSession);
};
  return (
<>
    {logSession ? <Authenticated/>:
     <div>
        <label>Username</label>
        <input></input>
        <label>Password</label>
        <input></input><br></br><br></br>
        <button onClick={loginFunc}>Login</button>
      </div>
      }  
    </>
    
  );
}

export default App;
