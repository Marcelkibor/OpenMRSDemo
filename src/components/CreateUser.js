import React from 'react'
function CreateUser(){
    const genderList = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
];
  return (
    <div>
        <h3>
            Fill in the form to create a new user <span><a style={{fontSize:'15px'}} href='/authenticated'>Back</a></span>
        </h3>
        <>
        <label>Given Name&nbsp; <input placeholder='First Name' name='givenName'></input></label><br></br>
        <label>Family Name <input placeholder='Last Name' name='FamilyName'></input></label><br></br>
        <label>Gender</label><br></br>
        {genderList.map((x, i) => <label key={i}>
        <input
          type="radio"
          name="gender"
          value={x.value}
        /> {x.label}
      </label>)}<br></br>
        <label>BirthDate&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='date' name='BirthDate'></input></label><br></br>
        <label>Address1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input placeholder='ADR' type='text'></input></label><br></br>
        <label>City Village&nbsp;&nbsp;&nbsp;<input placeholder='C.V'></input></label><br></br>
        <label>Country&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' placeholder = "ST"></input></label><br></br>
        <label>Postal Code&nbsp;&nbsp;<input placeholder='P/C' type='text'></input></label><br></br>
        <label>Password&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="password" placeholder = "****"></input></label><br></br>
    <br></br>
    <button>Create</button>
        </>
    
    </div>
  )
}
export default CreateUser