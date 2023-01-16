import React, { useEffect, useState } from 'react'
import Login from './Login';
import SearchPatient from './SearchPatient';
import { ClipLoader } from 'react-spinners'
import Visits from './Visits';
import Pagination from './Pagination';
import Vitals from './Vitals';

function UserPanel(){
  const UUID = JSON.parse(window.localStorage.getItem("UUID"));
  const NM = JSON.parse(window.localStorage.getItem("NM"))
const GN = JSON.parse(window.localStorage.getItem("GN"))
const BT = JSON.parse(window.localStorage.getItem("BT"))
  const [loading,isLoaded] = useState(true)
  const[visit,setVisit] = useState([])
const[vitals,setVitals] = useState([])
const [currentPage,setCurrentPage]=useState(1)
const [postPerPage]=useState(1)
  useEffect(()=>{
    fetch("/openmrs/ws/rest/v1/encounter?patient="+UUID+"&concept=18316c68-b5f9-4986-b76d-9975cd0ebe31&fromdate=2016-10-08&v=default",{
      headers:{
      "Content-Type":"application/json",
      'Authorization': 'Basic '+window.localStorage.getItem("BTOA"),
      "Cookie": "JSESSIONID="+window.localStorage.getItem("JSESSIONID"), 
      },
      credentials:"same-origin",
      method:"get",
      // body:raw,
      redirect: 'follow',
      }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
        setVisit(requestBody.results)
        isLoaded(false) 
        console.log(requestBody)
      },)
      //vitals fetching
      // fetch("openmrs/ws/rest/v1/obs?patient="+UUID+"&limit=1",{
      //   headers:{
      //   "Content-Type":"application/json",
      //   'Authorization': 'Basic '+window.localStorage.getItem("BTOA"),
      //   "Cookie": "JSESSIONID="+window.localStorage.getItem("JSESSIONID"), 
      //   },
      //   credentials:"same-origin",
      //   method:"get",
        
      //   redirect: 'follow',
      //   }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
      //     console.log("vitals",requestBody.results)
      //     setVitals(requestBody.results)
      //     isLoaded(false)         
      //     // is_v_initialized(true)
      //     // console.log(vitals)
      //   })
  },[UUID])

const lastPostIndex = currentPage * postPerPage
const firstPostIndex = lastPostIndex - postPerPage
const currentPosts = visit.slice(firstPostIndex,lastPostIndex)
const paginate = pageNumber =>setCurrentPage(pageNumber);
      return (
     <div className = "fetchedUser">
      {loading ? <ClipLoader color='white'
size={120}/>:<>
<div className = "fetchedUser">
<span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Patient:</span><br></br>
            <span style={{color:'white'}}>Name: {NM}</span><br></br>
            <span style={{color:'white'}} >Gender: {GN}</span><br></br>
            <span style={{color:'white'}}>BirthDate: {BT}</span><br></br>
</div>
<Visits visits={currentPosts} loading={loading} />
  <Vitals vitals={currentPosts} loading={loading}/>
  <Pagination paginate={paginate} postPerPage={postPerPage} totalPosts={visit.length}/>   

     
         {/* <div className='patientVitals'>
            <span style={{fontSize:"20px", fontWeight:'bolder', color:'white'}}>Vitals:</span>
              {vitals.map(vs=>(
                <div>
                  {vs.display}
                </div>
              ))}
              
            </div> */}

</>}
     </div>
      )}
export default UserPanel