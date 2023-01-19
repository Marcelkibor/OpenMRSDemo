import React ,{useEffect, useState}from 'react'
import  Accordion  from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ClipLoader } from 'react-spinners'
const Visits = ({visits,loading,onClick}) => {
const [accordionSummary, setAccordionSummary] = useState(null);
const[observations,setObservations] = useState([]);
const UUID = JSON.parse(window.localStorage.getItem("UUID"));
const getSession = JSON.parse(window.localStorage.getItem("JSESSIONID"))
const getBtoa = JSON.parse(window.localStorage.getItem("BTOA"));
const [loadingV,setLoadingV] = useState(false)

 function handleAccordionSummary(accordionSummary,newExpanded){
  setObservations([])
  setLoadingV(true)
    setAccordionSummary(accordionSummary);
    fetch("/openmrs/ws/rest/v1/visit?patient="+UUID+"&v=full",{
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
        setObservations(requestBody.results)
        console.log(requestBody.results)

        observations.map(obs=>{
          if(obs.uuid===accordionSummary){
            obs.encounters.map(enc=>{
              enc.obs.map(s_obs=>{
               console.log("observations are:",s_obs)
              })
        })
          }

})
},
)

  };
  return (
    <div style={{display:"flex"}}>
     <div className='patientVisits'>
        <h4 style={{color:"white"}}>Visits:</h4>
  {visits.map((item,index) => (
    <span key={item.uuid}>
      <Accordion>
  <AccordionSummary   expandIcon={<ExpandMoreIcon />} className='visitBorder'
    onClick={() => handleAccordionSummary(item.uuid)} 
    >
      <Typography>Location: {item.location.display}</Typography>
    </AccordionSummary>
    <AccordionDetails  >
    <Typography>Date: {item.startDatetime}</Typography>
    </AccordionDetails>
    <AccordionDetails>
    <Typography>Visit Type: {item.visitType.display}</Typography>

    </AccordionDetails>
    </Accordion>
    </span>
  ))}

    </div>
    </div>

  )
}
export default Visits