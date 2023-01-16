import React from 'react'

const Visits = ({visits,loading,onClick}) => {
  return (
    <div>
     <div className='patientVisits'>
        <h5>Visits:</h5>
          {visits.map(vt=>(
            <>
            <span>
              Location: <>{vt.location.display}</>
            </span><br></br>
            <span>
              DateTime: <>{vt. encounterDatetime}</>
            </span><br></br>
            </>
          ))}
        </div> 

    </div>
  )
}

export default Visits