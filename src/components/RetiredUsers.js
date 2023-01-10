import React from 'react'

const RetiredUsers = () => {
function getRetiredUsers(){
    //get all non-retired users
    const getSession = JSON.parse(window.localStorage.getItem("JSESSIONID"))
    fetch("openmrs/ws/rest/v1/user?q=admin&v=default",{
    headers:{
        "Content-Type":"application/json;charset=UTF-8",
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
}
  return (
    <div> 
      <span><a style={{fontSize:'15px'}} href='/authenticated'>Back</a></span>
      <h5>Fetch a list of retired users </h5>
      <button onClick={getRetiredUsers}>Fetch</button>

    </div>
  )
}

export default RetiredUsers