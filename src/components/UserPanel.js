import React, { useEffect, useState } from 'react'
import Login from './Login';

function UserPanel(){
    const [loggedIn,isLoggedIn]= useState(window.localStorage.getItem("JSESSIONID")||false);
  return (
    <div style={{height:"135vh"}}>
        {loggedIn ? <>
          <div className='patientDetails'>
            <br></br>
            <span style={{fontWeight:"bold"}}>Name: <span style={{fontWeight:"400"}}>Marcel Omwanga</span></span> <br></br>
            <span style={{fontWeight:"bold"}}>BirthDate: <span style={{fontWeight:"400"}}>12/12/20</span></span><br></br>
            <span style={{fontWeight:"bold"}}>Gender: <span style={{fontWeight:"400"}}>M</span></span><br></br>
            <span style={{fontWeight:"bold"}}>Uuid: <span style={{fontWeight:"400"}}>12345</span></span>
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