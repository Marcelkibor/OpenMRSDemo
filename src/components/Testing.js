import React, { useEffect } from 'react'

function Testing() {
  //visit type uuid->b2bd9271-7078-482c-b33f-c7600a9c0521
  // patient uuid ->66d5327e-3b09-4edc-8aae-5291eb9707d5
  //location id=>2fd2ec64-a13a-4065-a43e-691c89330014
    useEffect(()=>{
      // var raw = JSON.stringify({"patient":"aaa70db6-f60a-4f71-b87f-aa9a60056039","visitType":"b2bd9271-7078-482c-b33f-c7600a9c0521"});
      fetch("/openmrs/ws/rest/v1/visit?patient=66d5327e-3b09-4edc-8aae-5291eb9707d5",{
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
            console.log(requestBody)
            },)
    })

  return (
    <div>Testing</div>
  )
}

export default Testing
