import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
function SearchPatient (){
const getSession = JSON.parse(window.localStorage.getItem("JSESSIONID"))
const getBtoa = JSON.parse(window.localStorage.getItem("BTOA"))
const [FormData,SetFormData] = useState({
  username:'',
})
const { username} = FormData;
const onChange = (e)=>{
SetFormData({...FormData, [e.target.name]:e.target.value})
}
const searchUser=(e)=>{
fetch("/openmrs/ws/rest/v1/patient?q="+username+"&v=default&limit=1",{
    headers:{
    "Content-Type":"application/json;charset=UTF-8",
    'Authorization': 'Basic '+getBtoa,
    "Cookie": "JSESSIONID="+getSession, 
    },
    credentials:"same-origin",
    method:"get",
    // body:raw,
    redirect: 'follow',
    }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
    console.log(requestBody)
    },)
}
  return (
    <div>
<a href='/authenticated'>Back</a> 
<h4>Search for patient by name</h4>
<br></br>
<Form>
<Form.Label>Username:</Form.Label>&nbsp;
<Form.Control type="text" placeholder="Search patient name" 
name = 'username' value  = {username} onChange = {onChange} autoComplete = "on"/>
<Button onClick={searchUser}>Search</Button></Form>

    </div>
  )
}

export default SearchPatient