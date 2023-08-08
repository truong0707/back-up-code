import React from 'react'
import { Link } from 'react-router-dom'
import { StateStore } from '../../store/redux/Store';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);
  
  return (
    <div>
      {
        getUser ? <>  <Link to={'/admin'} >Admin page</Link></> : <><Link to={'/login'} >Login page</Link></>
      }

        {/* <Link to={'/login'} >Login</Link>
        ----
        <Link to={'/register'} ></Link> */}
    </div>
  )
}
