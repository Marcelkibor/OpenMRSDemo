import React, { useEffect, useState } from 'react'
import Login from './Login';
import SearchPatient from './SearchPatient';
function UserPanel(){
  const[visitArray,setVisitArray] = useState(JSON.parse(window.localStorage.getItem("VISIT")||false));
  const[vitalArray,setVitalArray] = useState(JSON.parse(window.localStorage.getItem("VITALS")||false));
    const [loggedIn,isLoggedIn]= useState(window.localStorage.getItem("JSESSIONID")||false);
    const pID = JSON.parse(window.localStorage.getItem("UUID"))
    const NM = JSON.parse(window.localStorage.getItem("NM"))
    const GN = JSON.parse(window.localStorage.getItem("GN"))
    const BT = JSON.parse(window.localStorage.getItem("BT"))
      // var raw = JSON.stringify({"patient":"aaa70db6-f60a-4f71-b87f-aa9a60056039","visitType":"b2bd9271-7078-482c-b33f-c7600a9c0521"});
// console.log(NM,"has the visit",visitArray)
      return (
    <div style={{height:"130vh"}}>
      
        {loggedIn ? <>
          <div className='patientDetails'>
          <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Patient:</span><br></br>
            <span>Name: {NM}</span><br></br>
            <span>Gender: {GN}</span><br></br>
            <span>BirthDate: {BT}</span><br></br>
            </div>
                <div className='patientVisits'>
                <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Visits:</span><br></br>
                  {visitArray.map(vt=>(
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
              {vitalArray.map(vs=>(
                <div>
                  {vs.display}
                </div>
              ))}
              
            </div>
        </>:<Login/>}
      </div>
  )
}
export default UserPanel