import React, { useEffect, useState } from 'react'
import Login from './Login';

function UserPanel(){
    const [loggedIn,isLoggedIn]= useState(window.localStorage.getItem("JSESSIONID")||false);
  return (
    <div>
        {loggedIn ? <>
            <p>User Details</p>
        </>:<Login/>}
 
    </div>
  )
}
export default UserPanel