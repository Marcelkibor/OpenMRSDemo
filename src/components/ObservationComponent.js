import React from 'react'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Accordion from '@mui/material/Accordion';

const ObservationComponent = (data) => {
    return (
    <div>
       {data.data.map(obs=> (
         <span key={obs.uuid}>
            <>
         <Accordion>
            <AccordionSummary>
               <span key={obs.uuid}>
               <>
         {obs.display}
         </> 
               </span>

        
            </AccordionSummary>
        
         </Accordion>
         </>
         </span>
         
       )
       )
       }
       
      
    </div>
  )
}

export default ObservationComponent