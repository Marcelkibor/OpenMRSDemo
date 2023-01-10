import React from 'react'

const RetiredUsers = () => {
function getRetiredUsers(){
    //get all non-retired users
    const getSession = window.localStorage.getItem("JSESSIONID")
    fetch("openmrs/ws/rest/v1/user?q=admin&v=default",{
    headers:{
        "Content-Type":"application/json;charset=UTF-8",
        "Access-Control-Allow-Headers":"*",
        "Access-Control-Allow-Methods":"*",
        "Access-Control-Allow-Origin":"*",
        'Authorization': 'Basic '+btoa('admin:Admin123'), 
        "Cookie": "JSESSIONID="+getSession,
    },
    credentials:"include",
    method:"get",
    redirect: 'follow'
    }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
    // const authValue = headers.get("authorization");
    var res  = requestBody.results
    // setUsers(res);
    console.log(res)
    })
}
  return (
    <div> 
    <button onClick={getRetiredUsers}>Get Retired Users</button>
    </div>
  )
}

export default RetiredUsers