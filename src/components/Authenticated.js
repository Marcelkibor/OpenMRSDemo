import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import App from '../App'
const Authenticated = () => {
  const[logOut,isLoggedOut] = useState(false);
  const [users,setUsers] = useState([]);
  function logOutSession(){
    isLoggedOut(!logOut)
    // <Navigate to="/"/>
  }
  useEffect(()=>{
    const getSession = window.localStorage.getItem("userCookieId")
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
    setUsers(requestBody.results);
    console.log(users)
  })
  },[...users]);
  function getRetiredUsers(){
console.log("length of users array is "+users.length)
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