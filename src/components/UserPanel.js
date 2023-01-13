import React, { useEffect, useState } from 'react'
import Login from './Login';
function UserPanel(){
  const[userD,getUserD] = useState([])
    const [loggedIn,isLoggedIn]= useState(window.localStorage.getItem("JSESSIONID")||false);
    const pID = JSON.parse(window.localStorage.getItem("UUID"))
    const NM = JSON.parse(window.localStorage.getItem("NM"))
    const GN = JSON.parse(window.localStorage.getItem("GN"))
    const BT = JSON.parse(window.localStorage.getItem("BT"))
    return (
    <div style={{height:"130vh"}}>
        {loggedIn ? <>
          <div className='patientDetails'>
            <span>Name: {NM}</span><br></br>
            <span>Gender: {GN}</span><br></br>
            <span>BirthDate: {BT}</span><br></br>
            </div>
            <div className='patientVisits'>
              
              <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Visits</span>
            </div>
            <div className='patientVitals'>
              <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Vitals</span>
            </div>
        </>:<Login/>}
 
    </div>
  )
}
export default UserPanel