import React ,{useEffect, useState}from 'react'
import  Accordion  from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Visits = ({visits,loading,onClick}) => {
const [accordionSummary, setAccordionSummary] = useState(null);
const [encounters,setEncounters]= useState([]);
const[observations,setObservations] = useState([])
const UUID = JSON.parse(window.localStorage.getItem("UUID"));
const getSession = JSON.parse(window.localStorage.getItem("JSESSIONID"))
const getBtoa = JSON.parse(window.localStorage.getItem("BTOA"));
  //fetch all encounters to co
  useState(()=>{
    setObservations([])
  })
 const handleAccordionSummary = (accordionSummary) => {
  setObservations([])
    setAccordionSummary(accordionSummary);
    fetch("/openmrs/ws/rest/v1/encounter?patient="+UUID+"&concept=18316c68-b5f9-4986-b76d-9975cd0ebe31&fromdate=2016-10-08&v=default&limit=1",{
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
      //  console.log(requestBody.results)
       setEncounters(requestBody.results)
       encounters.map(enc=>{
        var fetched_visit;
        fetched_visit= enc.visit.uuid
        //compare if the displayed visit is contained in the fetched encounters visits
        // if the visit uid is same as that from the encounters, save all observations
        if(fetched_visit==accordionSummary){
    // checkConditions(enc.uuid)
    //this condition is fault as some encounters have no visits, but have observations but they keeps being appended to the new array
    setObservations(enc.obs)
        }
        else{
          console.log("Not found")
        }
       })
       },)
  };
  //if a fetched encounter contains a visit id displayed on the ui,
  // fetch all the observations of this encounter. parameters needed are: patient and encounter uuid
  function checkConditions(data){
    //current visit id
    const visit_id = accordionSummary
  console.log("encounter ",data," has this ",visit_id, "visit")
  }
function getObservations(data){
  console.log("This visit has this ",data," observation")
}
  return (
    <div>
     <div className='patientVisits'>
        <h5>Visits:</h5>
        <Accordion>
  {visits.map(item => (
    <AccordionSummary onClick={() => handleAccordionSummary(item.uuid)}>
      <Typography>{item.uuid}</Typography>
    </AccordionSummary>
  ))}
</Accordion>
    </div>
    <div className='patientVitals'>
      <h6>Vitals:</h6>
      {observations? <>
      {observations.map(obs=>(
        <p>{obs.uuid}<br></br>{obs.display}</p>
        
      ))}
      </>:<></>}
    </div>
    </div>

  )
}

export default Visits