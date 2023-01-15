import React from 'react'

const Visits = ({visits,loading}) => {
  return (
    <div>
     <div className='patientVisits'>
        <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Visits:</span><br></br>
          {visits.map(vt=>(
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

    </div>
  )
}

export default Visits