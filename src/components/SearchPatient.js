import React from 'react'
function SearchPatient (){
const createUser=()=>{
const getSession = JSON.parse(window.localStorage.getItem("JSESSIONID"))
//create person raw
// var raw = JSON.stringify({"names":[{"givenName":"Marcel","familyName":"Omwenga"}],"gender":"M","birthdate":"1997-09-02","addresses":[{"address1":"30, Vivekananda Layout, Munnekolal,Marathahalli","cityVillage":"Bengaluru","country":"India","postalCode":"560037"}]});
// create patient from person raw
// var raw = JSON.stringify({"person":"66d5327e-3b09-4edc-8aae-5291eb9707d5","identifiers":[{"identifier":"1003EY","identifierType":"05a29f94-c0ed-11e2-94be-8c13b969e334","location":"8d6c993e-c2cc-11de-8d13-0010c6dffd0f","preferred":false}]});

fetch("/openmrs/ws/rest/v1/patient?q=Marcel&v=default&limit=1",{
    headers:{
    "Content-Type":"application/json;charset=UTF-8",
    'Authorization': 'Basic '+btoa('amrs_test:Ampath123'),
    "Cookie": "JSESSIONID="+getSession, 
    },
    credentials:"same-origin",
    method:"get",
    // body:raw,
    redirect: 'follow',
    }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
    console.log(requestBody)
    },)
}
  return (
    <div><a href='/authenticated'>Back</a> Search for patient by name
        <br></br>
        <input placeholder='Search by name'></input>
        <button onClick={createUser}>Search</button>
    </div>
  )
}

export default SearchPatient