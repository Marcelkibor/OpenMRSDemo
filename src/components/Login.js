import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Authenticated from './Authenticated';
import { Form,Button, Alert } from 'react-bootstrap';
import { ClipLoader } from 'react-spinners'
function Login(){
  const [authenticated, setauthenticated] = useState(JSON.parse(localStorage.getItem("JSESSIONID")|| false));
  const [FormData,SetFormData] = useState({
    username:'',
    password:'',
})
const [loading,isLoading]=useState(false)
const { username, password} = FormData;
const onChange = (e)=>{
SetFormData({...FormData, [e.target.name]:e.target.value})
}
  const gotEmail=(e)=>{ 
    if(username.trim().length!==0 && password.trim().length!==0){
      isLoading(true)
e.preventDefault();
fetch("openmrs/ws/rest/v1/session",{
headers:{
"Content-Type":"application/x-javascript;charset=UTF-8",
'Authorization': 'Basic '+btoa(username+":"+password), 
},
method:"GET",
redirect: 'follow'
}).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
  console.log(requestBody)
if(requestBody.authenticated==true){
  window.localStorage.setItem("JSESSIONID",JSON.stringify(requestBody.sessionId));
window.localStorage.setItem("BTOA",JSON.stringify(btoa(username+":"+password)));
setauthenticated(true)
}if(requestBody.authenticated ==false){
  setauthenticated(false)
 
  alert("invalid username or password")
}
},)
}
else{
      alert("Fill in form details!")
  }
isLoading(false)
}
  return (
    <div>
{authenticated ? <Authenticated/>:<>
{loading ? <ClipLoader
color='blue'
size={60}
/>:<>
<Form >
<Form.Label>Username:</Form.Label>&nbsp;
<Form.Control type="text" placeholder="username" 
name = 'username' value  = {username} onChange = {onChange} autoComplete = "on"/>
<br></br><Form.Label>Password:</Form.Label>&nbsp;&nbsp;
<Form.Control type="password" placeholder="******" 
name = 'password' value  = {password} onChange = {onChange} autoComplete = "on"/><br></br>
</Form>
<Button
onClick={gotEmail}
variant = "primary"
>
Login
</Button>
</>}
</>}    
  </div>
  )
}

export default Login