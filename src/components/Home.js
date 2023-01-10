import React from 'react'
import { Navigate,  } from 'react-router-dom';
const Home = () => {
    const handleClick = () => Navigate({to : "/auth"});
  return (
 
 <div>Home
  </div>
   
   
  )
}

export default Home