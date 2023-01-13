import React, { useEffect, useState } from 'react'
import Login from './Login';
import SearchPatient from './SearchPatient';
function UserPanel(){
  const visitArray = JSON.parse(window.localStorage.getItem("VISIT"))
    const [loggedIn,isLoggedIn]= useState(window.localStorage.getItem("JSESSIONID")||false);
    const pID = JSON.parse(window.localStorage.getItem("UUID"))
    const NM = JSON.parse(window.localStorage.getItem("NM"))
    const GN = JSON.parse(window.localStorage.getItem("GN"))
    const BT = JSON.parse(window.localStorage.getItem("BT"))
      // var raw = JSON.stringify({"patient":"aaa70db6-f60a-4f71-b87f-aa9a60056039","visitType":"b2bd9271-7078-482c-b33f-c7600a9c0521"});
console.log(NM,"has the visit",visitArray)
      return (
    <div style={{height:"130vh"}}>
        {loggedIn ? <>
          <div className='patientDetails'>
            <span>Name: {NM}</span><br></br>
            <span>Gender: {GN}</span><br></br>
            <span>BirthDate: {BT}</span><br></br>
            </div>
              {visitArray?<>
                <div className='patientVisits'>
                  {visitArray.map(vt=>(
                    <>
                    <span style={{color:"white"}}>
                      Visit ID: <br></br><>{vt.uuid}</>
                    </span><br></br>
                    <span style={{color:"white"}}>
                      Description:<br></br>{vt.display}
                    </span>
                    </>
                  ))}
                </div>
              </>:<SearchPatient/>}
           
            <div className='patientVitals'>
              <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Vitals</span>
            </div>
        </>:<Login/>}
 
    </div>
  )
}
export default UserPanel