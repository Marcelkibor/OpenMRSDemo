import { Navbar,Nav } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import { useState } from "react";
import React from 'react'
import Login from "./Login";
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import mrs from "../resources/mrs.png"
function Navigator(){
  const [logOut,isLoggedOut] = useState(false);
const getBtoa = JSON.parse(window.localStorage.getItem("BTOA"))
  const logOutSession = ()=>{
// this function performs log out and destroying of the Jsession id
fetch("openmrs/ws/rest/v1/session",{
headers:{
"Content-Type":"application/x-javascript;charset=UTF-8",
'Authorization': 'Basic '+getBtoa, 
},
// credentials:"omit",
method:"DELETE",
redirect: 'follow'
}).then(response => response.text())
.then(result => console.log(result))
.then(window.localStorage.removeItem("JSESSIONID"))
.then(window.localStorage.removeItem("BTOA"))
.then(isLoggedOut(true))
.catch(error => console.log('error', error));
};
  return (
    <>
<Navbar className="topNav">
<Container>
<Navbar.Brand style={{color:'white'}} href="/">   <img className="rounded-image" width={50} height={50} src={mrs} alt="image description"/>&nbsp;&nbsp;&nbsp;OpenMRS Demo</Navbar.Brand>
<Navbar.Toggle />
<Navbar.Collapse className="justify-content-end">
<Container>
          <Nav className="me-auto">
            <Nav.Link style={{color:'white'}} href="/">Home <HomeIcon  style ={{color:"white", fontSize:'20px'}}/></Nav.Link>
            <Nav.Link style={{color:'white'}} href="/search">Search <SearchIcon style ={{color:"white", fontSize:'20px'}}/> </Nav.Link>
          </Nav>
        </Container>
</Navbar.Collapse>
</Container>
</Navbar>
    </>
  )
}

export default Navigator