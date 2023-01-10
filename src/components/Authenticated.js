import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import App from '../App'
const Authenticated = () => {
  const[logOut,isLoggedOut] = useState(false);
  const [users,setUsers] = useState([]);
  useEffect(()=>{
    const getSession = window.localStorage.getItem("JSESSIONID")
  fetch("openmrs/ws/rest/v1/user?q=admin&v=default",{
    headers:{
      "Content-Type":"application/json;charset=UTF-8",
      "Access-Control-Allow-Headers":"*",
      "Access-Control-Allow-Methods":"*",
      "Access-Control-Allow-Origin":"*",
      'Authorization': 'Basic '+btoa('admin:Admin123'), 
      "Cookie": "JSESSIONID="+getSession,
    },
    credentials:"include",
    method:"get",
    redirect: 'follow'
  }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
    // const authValue = headers.get("authorization");
    var res  = requestBody.results
    setUsers(res);
    console.log(res)
  })
  },[]);
  function logOutSession(){
    fetch("openmrs/ws/rest/v1/session",{
      headers:{
        "Content-Type":"application/x-javascript;charset=UTF-8",
        'Authorization': 'Basic '+btoa('admin:Admin123'), 
      },
      // credentials:"omit",
      method:"DELETE",
      redirect: 'follow'
    }).then(response => response.text())
    .then(result => console.log(result))
    .then(window.localStorage.removeItem("JSESSIONID"))
    .then( isLoggedOut(!logOut))
    .catch(error => console.log('error', error));
    };
  function getRetiredUsers(){
}
  return (
    <>
    {logOut ? <App/>:
    <>
      <h6>Authenticated</h6>
      <>
      <h4>List of retired users are</h4>
      {/* <ul>
        {users.map(users=>{
          <li key={users.uuid}>{users.username}</li>
        })}
      </ul> */}

      </>
       <button onClick={logOutSession}>Logout</button>
       <button onClick={getRetiredUsers}>Get Users</button>
    </>
    }
    </>
  )
}

export default Authenticated