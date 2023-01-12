import React, { useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import UserPanel from './UserPanel'
import Login from './Login'
function SearchPatient (){
const getSession = JSON.parse(window.localStorage.getItem("JSESSIONID"))
const getBtoa = JSON.parse(window.localStorage.getItem("BTOA"))
const [FormData,SetFormData] = useState({
  username:'',
})
const[userDetails,setUserDetails] = useState([])
const [loggedIn,isLoggedIn]= useState(window.localStorage.getItem("JSESSIONID")||false);
const [loading,isLoading] = useState(false);
//is loading is a state that determines if the div with fetched results has been clicked.
// by default it's false, which renders the division as is, otherwise navigate to user panel
const { username} = FormData;
const onChange = (e)=>{
SetFormData({...FormData, [e.target.name]:e.target.value})
}
useEffect(()=>{
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
    // console.log(requestBody)
    setUserDetails(requestBody.results)
    console.log(userDetails)
    },)
},[username])
const getUserPanel=()=>{
isLoading(true)
}
  return (
<div>{loggedIn ? <>{loading ? <UserPanel/>:
  <>
    <h6>Search for patient by name</h6>
      <Form>
        <Form.Control type="text" placeholder="Search patient name" 
          name = 'username' value  = {username} onChange = {onChange} autoComplete = "on"/>
        </Form>
      <div className = "fetchedUser" >
    {userDetails.map(user => (
  <div style={{padding:"10px 0px 10px 10px"}} onClick={getUserPanel} key={user.person}>
    <span style={{color:'white',Height:"5vh",fontWeight:"bolder", fontSize:'23px'}}>Patient Details</span>
      <span style={{color:'white'}}>
        <h6 style={{fontSize:"16px"}}>Name: <span style={{fontWeight:"300"}}>{user.person.display}</span></h6> </span>
        <span style={{color:'white'}}> 
        <h6  style={{fontSize:"16px"}} >BirthDate: <span style={{fontWeight:"300"}}>{user.person.birthdate}</span>
        </h6></span>
        <span style={{color:'white'}}>
          <h6 style={{fontSize:"16px"}} >Gender: <span style={{fontWeight:"300"}}>{user.person.gender}</span></h6> </span>
    </div>),)}
    </div>
</>
}</>:<Login/>}
</div>
)}
export default SearchPatient