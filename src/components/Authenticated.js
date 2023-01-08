import React from 'react'

const Authenticated = () => {
  const getSession = window.localStorage.getItem("userCookieId")
  fetch("openmrs/ws/rest/v1/user?q=admin&v=default",{
    headers:{
      "Content-Type":"application/x-javascript;charset=UTF-8",
      'Authorization': 'Basic '+btoa('admin:Admin123'), 
    "Cookie": "JSESSIONID="+getSession,
    },
    credentials:"same-origin",
    method:"get",
    redirect: 'follow'
  }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
    // const authValue = headers.get("authorization");
    console.log(requestBody)
  })
  return (
    <h6>Authenticated</h6>
  )
}

export default Authenticated