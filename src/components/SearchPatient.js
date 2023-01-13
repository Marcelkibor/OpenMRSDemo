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
const[visit,setVisit] = useState([])
const[vitals,setVitals] = useState([])
//this state controls rendering of the div containing names.
//if visits are not initialized, dont display the fetchedUser div, otherwise true. 
const [v_initialize,is_v_initialized] = useState(false)
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
  if(username.trim().length!==0){
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
      console.log(requestBody.results)
      },)
      //visits fetching     
        fetch("/openmrs/ws/rest/v1/visit?patient="+JSON.parse(window.localStorage.getItem("UUID")),{
        headers:{
        "Content-Type":"application/json",
        'Authorization': 'Basic '+window.localStorage.getItem("BTOA"),
        "Cookie": "JSESSIONID="+window.localStorage.getItem("JSESSIONID"), 
        },
        credentials:"same-origin",
        method:"get",
        // body:raw,
        redirect: 'follow',
        }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
        setVisit(requestBody.results)
          window.localStorage.setItem("VISIT",JSON.stringify(visit))
        is_v_initialized(true)
        },)
        //vitals fetching
        fetch("openmrs/ws/rest/v1/obs?patient="+JSON.parse(window.localStorage.getItem("UUID"))+"&limit=1",{
          headers:{
          "Content-Type":"application/json",
          'Authorization': 'Basic '+window.localStorage.getItem("BTOA"),
          "Cookie": "JSESSIONID="+window.localStorage.getItem("JSESSIONID"), 
          },
          credentials:"same-origin",
          method:"get",
          
          redirect: 'follow',
          }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
            setVitals(requestBody.results)
            window.localStorage.setItem("VITALS",JSON.stringify(vitals))
            is_v_initialized(true)
          })
  }
  else{
    window.localStorage.removeItem("UUID")
    window.localStorage.removeItem("NM")
    window.localStorage.removeItem("GN")
    window.localStorage.removeItem("BT")
    window.localStorage.removeItem("VSID")
    window.localStorage.removeItem("VSD")
    window.localStorage.removeItem("VISIT")
    window.localStorage.removeItem("VITALS")
  }

},[username])
const getUserPanel=()=>{
isLoading(true)
}
  return (
<div> {loggedIn ? <>{loading ? <UserPanel/>:
  <>
    <h6>Search for patient by name</h6>
      <Form>
        <Form.Control type="text" placeholder="Search patient name" 
          name = 'username' value  = {username} onChange = {onChange} autoComplete = "on"/>
        </Form>
        <div>
          {v_initialize ?       <div className = "fetchedUser" >
    {userDetails.map(user => (
  <div style={{padding:"10px 0px 10px 10px"}} href="/panel" onClick={getUserPanel} key={user.person}>
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

   </div>: <div></div>}
        </div>

</>
}</>:<Login/>}
</div>
)}
export default SearchPatient