import React from 'react'

function GetLocations(){
    const getLocations = ()=>{
const getSession = window.localStorage.getItem("JSESSIONID")
fetch("openmrs/ws/rest/v1/location?tag=Login+Location'\n",{
headers:{
    "Content-Type":"application/json;charset=UTF-8",
    'Authorization': 'Basic '+btoa('admin:Admin123'), 
    "Cookie": "JSESSIONID="+getSession,
},
credentials:"include",
method:"GET",
redirect: 'follow'
}).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
// const authValue = headers.get("authorization");
console.log(requestBody)
// setUsers(res);
})
    }
  return (
    <div>
        <button onClick={getLocations}>Get Locations</button>
    </div>
  )
}

export default GetLocations