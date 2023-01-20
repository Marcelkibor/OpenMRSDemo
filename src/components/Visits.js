import React, { useEffect, useState } from 'react'
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
  var displayObs;
  var gettedObs;
  const [loadedOBS, setLoadedOBS] = useState([]);
  function handleAccordionSummary(accordionSummary, newExpanded) {
    // JSON.parse(window.localStorage.removeItem("OBS"))
    setLoadingV(true)
    setLoadedOBS([])
    setAccordionSummary(accordionSummary);
    fetch("/openmrs/ws/rest/v1/visit?patient=" + UUID + "&v=full", {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        'Authorization': 'Basic ' + getBtoa,
        "Cookie": "JSESSIONID=" + getSession,
      },
      credentials: "same-origin",
      method: "get",
      // body:raw,
      redirect: 'follow',
    }).then((Response) => Promise.all([Response.json(), Response.headers])).then(([requestBody, headers]) => {
      // console.log("results are",requestBody.results)
      setObservations(requestBody.results)
      let detailsArray = [];
      observations.forEach(element => {
        if(element.uuid===accordionSummary){
          element.encounters.forEach(enc=>{
            enc.obs.forEach(s_obs=>{
              detailsArray.push(s_obs)
            })
          })  
        }
      });
      setPatientObs(detailsArray)
      setLoadingV(false)
    },
    )
    
    const getObs = (data) => {

      console.log("details array is", data)
    }
  }; 
  return (
    <div style={{ display: "flex" }}>
      <div className='patientVisits'>
        <h4 style={{ color: "white" }}>Visits:</h4>
        {visits.map((item, index) => (
          <span key={item.uuid}>
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} className='visitBorder'
                onClick={() => handleAccordionSummary(item.uuid)}
              >
                <Typography>Location: {item.uuid}</Typography>
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
      <div className='patientVitals'>
      <ObservationComponent data = {patientObs}/>
      </div>
  
      {/* {loadingV ? <>Loading...</>:<>
      <div className = "patientVitals">
      </div>
      </>} */}
      </div>
  )
}
export default Visits

