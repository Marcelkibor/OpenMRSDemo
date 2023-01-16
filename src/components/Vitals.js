import React from 'react'

const Vitals = ({vitals,loading}) => {
  return (
    <div>
     <div className='patientVitals'>
        <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Vitals:</span><br></br>
          {vitals.map(vt=>(
            <>
            <span >
              {/* futher destructure the nested array to obtain vital values */}
             {vt.obs.map(d=>(
              <p> {d.display}</p>
             ))}
            </span>
            </>
          ))}
        </div> 

    </div>
  )
}

export default Vitals