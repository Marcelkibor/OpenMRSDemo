import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import App from '../App'
import Login from './Login';
function Authenticated (){
const [logOut,isLoggedOut] = useState(false);
const logOutSession = ()=>{
// this function performs log out and destroying of the Jsession id
// fetch("openmrs/ws/rest/v1/session",{
// headers:{
// "Content-Type":"application/x-javascript;charset=UTF-8",
// 'Authorization': 'Basic '+btoa('admin:Admin123'), 
// },
// // credentials:"omit",
// method:"DELETE",
// redirect: 'follow'
// }).then(response => response.text())
// .then(result => console.log(result))
// .then(window.localStorage.removeItem("JSESSIONID"))
// .then(isLoggedOut(true))
// .catch(error => console.log('error', error));
isLoggedOut(true)
};
 return (
<>
{logOut ? <Login/>:<>
<h4>Authenticated <button onClick={logOutSession}>Logout</button></h4>
<>
<p>You can perform the following operations</p>
<ul>
<li>
<a href='/changepassword'>Change Password</a>
</li>
<li>
<a href='/retired'>Get retired users</a>
</li>
<li>
<a href='/locations'>Get Locations</a>
</li>
</ul>

</>
  
</>}
</>
  )
}
export default Authenticated