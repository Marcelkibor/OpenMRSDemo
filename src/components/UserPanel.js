import React, { useEffect, useState } from 'react'
import Login from './Login';
import SearchPatient from './SearchPatient';
import { ClipLoader } from 'react-spinners'

function UserPanel(){
  const UUID = JSON.parse(window.localStorage.getItem("UUID"));
  const NM = JSON.parse(window.localStorage.getItem("NM"))
const GN = JSON.parse(window.localStorage.getItem("GN"))
const BT = JSON.parse(window.localStorage.getItem("BT"))
  const [loading,isLoaded] = useState(true)
  const[visit,setVisit] = useState([])
const[vitals,setVitals] = useState([])
  useEffect(()=>{
    fetch("/openmrs/ws/rest/v1/visit?patient="+UUID,{
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
        // console.log("visits ",requestBody.results)
        setVisit(requestBody.results)
      },)
      //vitals fetching
      fetch("openmrs/ws/rest/v1/obs?patient="+UUID+"&limit=1",{
        headers:{
        "Content-Type":"application/json",
        'Authorization': 'Basic '+window.localStorage.getItem("BTOA"),
        "Cookie": "JSESSIONID="+window.localStorage.getItem("JSESSIONID"), 
        },
        credentials:"same-origin",
        method:"get",
        
        redirect: 'follow',
        }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
          // console.log("vitals",requestBody.results)
          setVitals(requestBody.results)
          isLoaded(false)         
          // is_v_initialized(true)
          // console.log(vitals)
        })
  },[UUID])

      return (
     <div className = "fetchedUser">
      {loading ? <ClipLoader color='white'
size={120}/>:<>
<div className = "fetchedUser">
<span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Patient:</span><br></br>
            <span style={{color:'white'}}>Name: {NM}</span><br></br>
            <span style={{color:'white'}} >Gender: {GN}</span><br></br>
            <span style={{color:'white'}}>BirthDate: {BT}</span><br></br>
</div>

    <div className='patientVisits'>
        <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Visits:</span><br></br>
          {visit.map(vt=>(
            <>
            <span >
              Visit ID: <br></br><>{vt.uuid}</>
            </span><br></br>
            <span >
              Description:<br></br>{vt.display}
            </span>
            </>
          ))}
        </div> 
         <div className='patientVitals'>
            <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Vitals:</span>
              {vitals.map(vs=>(
                <div>
                  {vs.display}
                </div>
              ))}
              
            </div>

</>}
     </div>
      )}
export default UserPanel