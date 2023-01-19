import React ,{useEffect, useState}from 'react'
import  Accordion  from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ClipLoader } from 'react-spinners'
const Visits = ({visits,loading,onClick}) => {
const [accordionSummary, setAccordionSummary] = useState(null);
const [encounters,setEncounters]= useState([]);
const[observations,setObservations] = useState([]);
const UUID = JSON.parse(window.localStorage.getItem("UUID"));
const getSession = JSON.parse(window.localStorage.getItem("JSESSIONID"))
const getBtoa = JSON.parse(window.localStorage.getItem("BTOA"));
const [loadingV,setLoadingV] = useState(false)
 function handleAccordionSummary(accordionSummary,newExpanded){
  console.log("visit id is ",accordionSummary)
  setObservations([])
  window.localStorage.removeItem("OBS")
  setLoadingV(true)
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
        setLoadingV(false)
       setEncounters(requestBody.results)
       encounters.map(enc=>{
        var fetched_visit;
        fetched_visit= enc.visit.uuid
        //compare if the displayed visit is contained in the fetched encounters visits
        // if the visit uid is same as that from the encounters, save all observations
        if(fetched_visit==accordionSummary){
    //this condition is fault as some encounters have no visits, but have observations but they keeps being appended to the new array
    setObservations(enc.obs)
    if(observations){
      window.localStorage.setItem("OBS",JSON.stringify(observations))
    }
  }
    else{
      console.log("Not found")
    }
  }
  )

},
)
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
    <div style={{display:"flex"}}>
     <div className='patientVisits'>
        <h4 style={{color:"white"}}>Visits:</h4>
  {visits.map((item,index) => (
    <span key={item.uuid}>
      <Accordion>
  <AccordionSummary   expandIcon={<ExpandMoreIcon />} className='visitBorder'  onClick={() => handleAccordionSummary(item.uuid)} >
      <Typography>{item.display}</Typography>
    </AccordionSummary>
    <AccordionDetails  >
    <Typography>{item.uuid}</Typography>
    </AccordionDetails>
    </Accordion>
    </span>
  ))}

    </div>
    
      {loadingV ? 
      <ClipLoader color='white'
      size={70}/>
      :<>
      {observations?
        <div className='patientVitals'>
      <h4 style={{color:"white"}}>Vitals:</h4>
      {observations.map(obs=>(
        <span key={obs.uuid}>
          <Accordion>
          <AccordionDetails  >
    <Typography>{obs.display}</Typography>
    </AccordionDetails>
          </Accordion>
        </span>

 
      ))}
      </div>:<></>
      }
      </>}
     
    </div>

  )
}
export default Visits