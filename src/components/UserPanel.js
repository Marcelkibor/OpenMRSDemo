import React, { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import Visits from './Visits';
import PersonIcon from '@mui/icons-material/Person';
function UserPanel(){
const UUID = JSON.parse(window.localStorage.getItem("UUID"));
const NM = JSON.parse(window.localStorage.getItem("NM"))
const GN = JSON.parse(window.localStorage.getItem("GN"))
const BT = JSON.parse(window.localStorage.getItem("BT"))
const [loading,isLoaded] = useState(true)
const[visit,setVisit] = useState([])
  useEffect(()=>{
    fetch("/openmrs/ws/rest/v1/visit?patient="+UUID+"&v=full",{
      headers:{
      "Content-Type":"application/json",
      'Authorization': 'Basic '+window.localStorage.getItem("BTOA"),
      "Cookie": "JSESSIONID="+window.localStorage.getItem("JSESSIONID"), 
      },
      credentials:"same-origin",
      method:"get",
      redirect: 'follow',
      }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
        setVisit(requestBody.results)
        isLoaded(false) 
      },)
  },[UUID])
      return (
     <div className = "fetchedUser">
      {loading ? <ClipLoader color='white'
size={120}/>:<>
<div className = "fetchedUser" style={{padding:'5% 10% 0% 0%'}}>
<span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Patient: <PersonIcon style={{color:'white', fontSize:'45px'}}/></span><br></br>
  <span style={{color:'white'}}>Name: {NM}</span><br></br>
  <span style={{color:'white'}} >Gender: {GN}</span><br></br>
  <span style={{color:'white'}}>BirthDate: {BT.split("T")[0]}</span><br></br>
</div>
<Visits visits={visit} loading={loading} />
</>}
</div>
)}
export default UserPanel