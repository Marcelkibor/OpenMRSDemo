import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Authenticated from './Authenticated';
function Login(){
  const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("JSESSIONID")|| false));
  const LoginFunc = ()=>{
    // fetch("openmrs/ws/rest/v1/session",{
    //   headers:{
    //   "Content-Type":"application/x-javascript;charset=UTF-8",
    //   'Authorization': 'Basic '+btoa('admin:Admin123'), 
    //   },
    //   method:"GET",
    //   redirect: 'follow'
    //   }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
    //   window.localStorage.setItem("JSESSIONID",JSON.stringify(requestBody.sessionId))
    //   console.log(requestBody)
    //   },)
    setauthenticated(!authenticated)
  }

  return (
    <div>
      {authenticated ? <Authenticated/>:<>
      <br></br><br></br>
 <label>Username</label>
  <input></input>
  <br></br>
  <label>Password</label>
  &nbsp;
  <input></input>
  <br></br>
  <button onClick={LoginFunc}>Login</button>
      </>}
 
  </div>
  )
}

export default Login