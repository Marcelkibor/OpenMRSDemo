import React, {useEffect, useState} from 'react'
import Accordion from '@mui/material/Accordion';
import ObservationComponent from './ObservationComponent';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ClipLoader } from 'react-spinners'

const Visits = ({ visits, loading, onClick }) => {
  const [accordionSummary, setAccordionSummary] = useState(null);
  const [observations, setObservations] = useState([]);
  const UUID = JSON.parse(window.localStorage.getItem("UUID"));
  const getSession = JSON.parse(window.localStorage.getItem("JSESSIONID"))
  const getBtoa = JSON.parse(window.localStorage.getItem("BTOA"));
  const [loadingV, setLoadingV] = useState(false);
  const  [patientObs,setPatientObs] =useState([]);
  
  useEffect(()=>{
    fetch("/openmrs/ws/rest/v1/visit?patient=" + UUID + "&v=full", {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': 'Basic ' + getBtoa,
        "Cookie": "JSESSIONID=" + getSession,
      },
      credentials: "same-origin",
      method: "get",
      redirect: 'follow',
    }).then((Response) => Promise.all([Response.json(), Response.headers])).then(([requestBody, headers]) => {
      //set results in observations array
      setObservations(requestBody.results)
    },
    )
  })
  function handleAccordionSummary(accordionSummary, newExpanded) {
    // JSON.parse(window.localStorage.removeItem("OBS"))
    setAccordionSummary(accordionSummary);
    setLoadingV(true)
    let detailsArray = [];
  //iterate through the visits =>"observations" array and set each obs child from encounters to an local array.
    observations.forEach(element => {
      if(element.uuid===accordionSummary){
        element.encounters.forEach(enc=>{
          enc.obs.forEach(s_obs=>{
            detailsArray.push(s_obs)
          })
        })  
      }
    });
    // the details array is loaded with obs children, 
    // && populate a state variable "patient obs" with all the elements of the local array
    setPatientObs(detailsArray)
    setLoadingV(false)
  }; 
  return (
    <div style={{ display: "flex", margin:'auto' }}>
      <div className='patientVisits'>
        <h4 style={{ color: "white" }}>Visits:</h4>
        {visits.map((item, index) => (
          <span key={item.uuid}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='visitBorder'
                onClick={() => handleAccordionSummary(item.uuid)} 
              >
                <Typography><span > Visit Date:</span> {item.startDatetime.split("T")[0]}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography><span >Visit Type:</span> {item.visitType.display}</Typography>
              </AccordionDetails>
              <AccordionDetails  >
                <Typography>
                <span >Visit Id:</span>{item.uuid}
                  </Typography>
              </AccordionDetails>
            </Accordion>
          </span>
        ))}

      </div>
      <div className='patientVitals'>
        {loadingV ? <ClipLoader size = {60} color = "white"/>:<>
        {patientObs.length>0 ? <>
          <h4 style={{ color: "white" }}>Vitals:</h4>
      <ObservationComponent data = {patientObs}/>
        </>:<><p style={{color:'white'}}>No Vitals for this visit</p></>}
        </>}
     
      </div>
  
      {/* {loadingV ? <>Loading...</>:<>
      <div className = "patientVitals">
      </div>
      </>} */}
      </div>
  )
}
export default Visits

