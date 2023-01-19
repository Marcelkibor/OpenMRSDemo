import React, { useEffect, useState } from 'react'
function Testing() {
  // update encounter -> /openmrs/ws/rest/v1/encounter/d3360c01-9813-4ff8-bd81-909af6612632
  // marcels encounters -> 6cbdc937-4cd4-4be2-ac55-a720bfdac9a0,8563b647-eeb8-460e-95ad-4d6b49e2c71d,29160118-fb24-4482-b44e-90eb3b0d9b73
  //marions encounters -> 6b5c4f05-255e-4149-9d29-dd7dd5ab9c82,6ce2630f-2aee-40c9-bc75-9d841998886b, 8665b649-4cc0-4578-8491-66a77be85ecf
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
  // persons
  // 1. Emily ->d30151d5-0bc0-483e-80f2-a9b600a31854
  // 2. Jackson ->61d5d308-d1e1-4cdc-9a1b-496bc5172075
  // 2. Mary ->a3e4741b-74ea-460c-81b3-7b20a9b60b8d
  // 2. create patientIdentifierType -> existing->{8d793bee-c2cc-11de-8d13-0010c6dffd0f,05a29f94-c0ed-11e2-94be-8c13b969e334}
// -> created identifier with identifer type
  useEffect(()=>{

    // concept class for test->8d4907b2-c2cc-11de-8d13-0010c6dffd0f

    //create the following concepts ->
    // created a concept for temperature->5d9bceca-e0e5-4cfa-b133-2c7b12d1981f
    // pulse rate concept->8a70a6ff-8366-428e-a820-0e8ead5628d8
    // respiration rate concept->1f1b72b2-02d9-44a7-aae7-9fedcfd8553e
// weight concept ->351e04e5-290c-4414-88f4-8dacd9645f58

    // create a concept-> 
    // var raw = JSON.stringify({"names":
    // [{"name":"Pulse Rate (BPM)"
    // ,"locale":"en","localePreferred":true,
    // "conceptNameType":"FULLY_SPECIFIED"}],
    // "datatype":"8d4a4488-c2cc-11de-8d13-0010c6dffd0f",
    // "version":"1.0.0","conceptClass":"8d492774-c2cc-11de-8d13-0010c6dffd0f",
    // });
    // create observation->
     var raw = JSON.stringify({"person":
    "aaa70db6-f60a-4f71-b87f-aa9a60056039"
    ,"concept":"1f1b72b2-02d9-44a7-aae7-9fedcfd8553e",
    "encounter":"6b5c4f05-255e-4149-9d29-dd7dd5ab9c82",
    "obsDatetime":"2019-11-14T07:37:31.000+0000","value":35});

    fetch("/openmrs/ws/rest/v1/visit/7593c281-a335-4b1f-be88-4fd171a12fcb?purge=true",{
      headers:{
      "Content-Type":"application/json",
      'Authorization': 'Basic '+window.localStorage.getItem("BTOA"),
      "Cookie": "JSESSIONID="+window.localStorage.getItem("JSESSIONID"), 
      },
      credentials:"same-origin",
      method:"delete",
      // body:raw,
      redirect: 'follow',
      }).then((Response)=>Promise.all([Response.json(),Response.headers])).then(([requestBody,headers])=>{
        console.log(requestBody)
      },)
  },[])
  
  return (
    <div>
    </div>
  )
  }
  // 65724ce7-b718-447a-b8ca-d0589619d17b, 6b4c1fe1-e2e6-497e-94d3-793bd072514e, f7517ab3-57b2-4cb9-b867-166aafd19ff2
  // /openmrs/ws/rest/v1/obs/4b2412bd-b538-4038-81d4-d2af153082b6?purge=true
export default Testing
