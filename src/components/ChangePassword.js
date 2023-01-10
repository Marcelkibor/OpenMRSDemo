import React from 'react'

const ChangePassword = () => {
function changePassword(){
const getSession = window.localStorage.getItem("JSESSIONID")
var raw = JSON.stringify({"oldPassword":"Admin123","newPassword":"Admin123"});
fetch("openmrs/ws/rest/v1/password \n",{
headers:{
"Content-Type":"application/json;charset=UTF-8",
"Access-Control-Allow-Headers":"*",
"Access-Control-Allow-Methods":"*",
"Access-Control-Allow-Origin":"*",
'Authorization': 'Basic '+btoa('admin:Admin123'), 
"Cookie": "JSESSIONID="+getSession,
},
credentials:"include",
method:"POST",
redirect: 'follow',
body:raw
}) .then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));
}
 return (
    <>
    <span><a style={{fontSize:'15px'}} href='/authenticated'>Back</a></span><br></br>
    <h5>Change your password</h5>
    <input placeholder='new password'></input><br></br>
    <input placeholder='confirm password'></input><br></br><br></br>
    <button>ChangePassword</button>
    </>
    
  )
}

export default ChangePassword