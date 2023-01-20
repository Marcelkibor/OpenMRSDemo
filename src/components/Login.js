import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Authenticated from './Authenticated';
import { Form, Alert } from 'react-bootstrap';
import Button from './Button';
import { ClipLoader } from 'react-spinners'
import { padding } from '@mui/system';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
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
<div style={{margin:'auto', marginTop:'20vh' ,padding:'2% 2% 2% 2%', backgroundColor:"#00b894", maxWidth:'fit-content', borderRadius:'15px'}}>
  <h6 style={{color:"white",textAlign:'center', fontWeight:'800'}}>Authenticate <AccountBoxIcon style={{color:"white",fontSize:'30px'}}/> </h6>
<Form>
<Form.Label style={{fontWeight:'600', color:'white'}}>Username:</Form.Label>&nbsp;
<Form.Control style={{width:'400px'}} type="text" placeholder="username" 
name = 'username' value  = {username} onChange = {onChange} autoComplete = "on"/>
<br></br><Form.Label style={{fontWeight:'600', color:'white'}}>Password:</Form.Label>&nbsp;&nbsp;
<Form.Control style={{width:'400px'}} type="password" placeholder="******" 
name = 'password' value  = {password} onChange = {onChange} autoComplete = "on"/><br></br>
</Form>
<Button
onClick={gotEmail}
size="20px"  backgroundColor="#6ab04c" color="white" borderRadius = "10px" 
>
Login
</Button>
</div>

</>}
</>}    
  </div>
  )
}

export default Login