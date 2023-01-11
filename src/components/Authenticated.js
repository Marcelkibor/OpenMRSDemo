import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import App from '../App'
import Login from './Login';
function Authenticated (){
const [logOut,isLoggedOut] = useState(false);
const getBtoa = JSON.parse(window.localStorage.getItem("BTOA"))
const logOutSession = ()=>{
// this function performs log out and destroying of the Jsession id
fetch("openmrs/ws/rest/v1/session",{
headers:{
"Content-Type":"application/x-javascript;charset=UTF-8",
'Authorization': 'Basic '+getBtoa, 
},
// credentials:"omit",
method:"DELETE",
redirect: 'follow'
}).then(response => response.text())
.then(result => console.log(result))
.then(window.localStorage.removeItem("JSESSIONID"))
.then(window.localStorage.removeItem("BTOA"))
.then(isLoggedOut(true))
.catch(error => console.log('error', error));
};
 return (
<>
{logOut ? <Login/>:<>
<h4>Authenticated <button onClick={logOutSession}>Logout</button></h4>
<>
<p>You can perform the following operations</p>
<ul>
<li>
<a href='/search'> Search Patient</a>
</li>
</ul>
</>
</>}
</>
  )
}
export default Authenticated