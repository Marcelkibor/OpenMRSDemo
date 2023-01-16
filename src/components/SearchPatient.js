import React, { Component, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { Navigate } from 'react-router-dom'
import UserPanel from './UserPanel'
import Login from './Login'
function SearchPatient (){
const getSession = JSON.parse(window.localStorage.getItem("JSESSIONID"))
const getBtoa = JSON.parse(window.localStorage.getItem("BTOA"))
const [userPanel,setUserPanel] = useState(false)
const [FormData,SetFormData] = useState({
  username:'',
})

//this state controls rendering of the div containing names.
//if visits are not initialized, dont display the fetchedUser div, otherwise true. 
const[userDetails,setUserDetails] = useState([])
const [loggedIn,isLoggedIn]= useState(window.localStorage.getItem("JSESSIONID")||false);
//is loading is a state that determines if the div with fetched results has been clicked.
// by default it's false, which renders the division as is, otherwise navigate to user panel
const [loaded,isLoaded] = useState(false)
const { username} = FormData;
const onChange = (e)=>{
SetFormData({...FormData, [e.target.name]:e.target.value})
}
function goPanel(){
  setUserPanel(true)
}
useEffect(()=>{
  if(username.trim().length!==0){
    isLoaded(true)
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
      //user detail results
      setUserDetails(requestBody.results)
      isLoaded(false)
      },)
   
  }
  if(username.trim.length<3){
    setUserDetails([])
    // window.localStorage.removeItem("UUID")
    // window.localStorage.removeItem("NM")
    // window.localStorage.removeItem("GN")
    // window.localStorage.removeItem("BT")
    // window.localStorage.removeItem("VISIT")
    // window.localStorage.removeItem("VITALS")
  }

},[username])
// const getUserPanel=()=>{
// isLoading(true)
// }
  return (
<div>
  {loggedIn ? <>
    {userPanel ? <UserPanel/>:
<>
<h6>Search for patient by name</h6>
      <Form>
        <Form.Control type="text" placeholder="Search patient name" 
          name = 'username' value  = {username} onChange = {onChange} autoComplete = "on"/>
        </Form>
        <div className = "fetchedUser">
{loaded ? 
<ClipLoader
color='white'
size={120}
/>
:
<>
{userDetails ?<>
{userDetails.map(user => (
  <div onClick={goPanel} style={{padding:"10px 0px 10px 10px"}}   key={user.person}>
    <span style={{color:'white',Height:"5vh",fontWeight:"bolder", fontSize:'23px'}}>Patient Details</span>
      <span style={{color:'white'}}>
        <h6 style={{fontSize:"16px"}}>Name: <span style={{fontWeight:"300"}}>{user.person.display}
        {window.localStorage.setItem("UUID",JSON.stringify(user.person.uuid))}
        {window.localStorage.setItem("NM",JSON.stringify(user.person.display))}
        {window.localStorage.setItem("BT",JSON.stringify(user.person.birthdate))}
        {window.localStorage.setItem("GN",JSON.stringify(user.person.gender))}
</span></h6> </span>
        <span style={{color:'white'}}> 
        <h6  style={{fontSize:"16px"}} >BirthDate: <span style={{fontWeight:"300"}}>{user.person.birthdate}</span>
        </h6></span>
        <span style={{color:'white'}}>
          <h6 style={{fontSize:"16px"}} >Gender: <span style={{fontWeight:"300"}}>{user.person.gender}</span></h6> </span>
    </div>),)}
</>:
<>
</>
}</>
}
    
   </div>
</>
}
  </>:<Login/>} 


</div>
)}
export default SearchPatient