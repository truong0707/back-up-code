import { Link } from 'react-router-dom'
import { StateStore } from '../../store/redux/Store';
import { useSelector } from 'react-redux';
import React from 'react';

const Navbar = () => {
  const getUser = useSelector((state: StateStore) => state.userLogin.userInfo);
  
  return (
    <>
      {
        getUser ? <><Link to={'/admin/home'} >Admin page</Link></> : <><Link to={'/login'} >Login page</Link></>
      }
    </>
  )
}
export default Navbar;
