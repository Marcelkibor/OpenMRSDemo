import React, { useEffect, useState } from 'react'
function Testing() {
  //visit type uuid->b2bd9271-7078-482c-b33f-c7600a9c0521
  // patient uuid ->66d5327e-3b09-4edc-8aae-5291eb9707d5,aaa70db6-f60a-4f71-b87f-aa9a60056039
  //location id=>2fd2ec64-a13a-4065-a43e-691c89330014
  //provider uuid ->62695a35-6985-4bdf-9603-0c36bab320b1
  //vitals is a encounter type ->67a71486-1a54-468f-ac3e-7091a9a79584
  //clinician is an encounter role ->240b26f9-dd88-4172-823d-4a8bfeb7841f
  //concept data type {numeric}->8d4a4488-c2cc-11de-8d13-0010c6dffd0f-> for values and units eg height.
  // location->Amani Ward->aff27d58-a15c-49a6-9beb-d30dcfc0c66e
  // provider role as organizational doctor->c892c9aa-9490-4c45-b836-eb061nk6a09415
  //created encounters with ids ->6cbdc937-4cd4-4be2-ac55-a720bfdac9a0,6b5c4f05-255e-4149-9d29-dd7dd5ab9c82
  //visit uuid for mrc->c4feda70-ca27-4e7d-afb2-75c1b2686bc6
  //facility visit uid->7b0f5697-27e3-40c4-8bae-f4049abfb4ed
  // const[testdata,setTestData] = useState([]||false)
  // useEffect(()=>{
  //   var raw = JSON.stringify({"visit":"75e16aee-8f47-4036-86b2-7adc4ab1d38c"});
  //   fetch("/openmrs/ws/rest/v1/encounter/8563b647-eeb8-460e-95ad-4d6b49e2c71d",{
  //     headers:{
  //     "Content-Type":"application/json",
  //     'Authorization': 'Basic '+window.localStorage.getItem("BTOA"),
  //     "Cookie": "JSESSIONID="+window.localStorage.getItem("JSESSIONID"), 
  //     },
  //     credentials:"same-origin",
  //     method:"post",
  //     body:raw,
  //     redirect: 'follow',
  //     }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
  //       console.log(requestBody)
  //     },)
  // },[])
  
  return (
    <div>
    </div>
  )
  }
export default Testing
