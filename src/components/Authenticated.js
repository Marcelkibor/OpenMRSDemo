import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import App from '../App'
import Login from './Login';
function Authenticated (){
const [logOut,isLoggedOut] = useState(false);
const logOutSession = ()=>{
// this function performs log out and destroying of the Jsession id
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
.then(isLoggedOut(true))
.catch(error => console.log('error', error));
};
 return (
<>
{logOut ? <Login/>:<>
<h6>Authenticated</h6>
  <button onClick={logOutSession}>Logout</button>
</>}
</>
  )
}
export default Authenticated