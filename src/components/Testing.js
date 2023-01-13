import React, { useEffect } from 'react'

function Testing() {
    useEffect(()=>{
        // var raw = JSON.stringify({"patient":"aaa70db6-f60a-4f71-b87f-aa9a60056039","visitType":"7b0f5697-27e3-40c4-8bae-f4049abfb4ed","startDatetime":"2016-10-08T04:09:25.000Z","location":"aff27d58-a15c-49a6-9beb-d30dcfc0c66e","indication":null,"encounters":["37ecb524-6c5a-4793-a449-cab1be102199"]});
        fetch("/openmrs/ws/rest/v1/patient/66d5327e-3b09-4edc-8aae-5291eb9707d5",{
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
