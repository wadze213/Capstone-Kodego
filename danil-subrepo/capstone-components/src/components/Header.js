import React, { useEffect, useState } from 'react';
import {Link,useNavigate} from "react-router-dom";
import styled from 'styled-components';
import '../css/header.css'


const NavList = styled.a`
  text-decoration: none;
  `;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 1rem;
  font-weight: 500;
  &:hover, &:focus {
    color: #88BDBC;
    font-weight: 800;
  }
  &:active{
    color: #88BDBC;
  }
`

let isLogin = localStorage.getItem('isActive')?JSON.parse(localStorage.getItem('isActive')):false;

let Header= () => {

  const [show,setShow]=useState(false)
  const [showBtn, setShowBtn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    isLogin? setShowBtn(false):setShowBtn(true);
  },[showBtn]);

  const loginBtn = () => navigate('/login');
    const regBtn = () => {
        navigate('/signUp');
        setShowBtn(false);
    }

  const profileBtn =  () => {
      localStorage.setItem("isActive", JSON.stringify(false))
      localStorage.setItem("isAdmin", JSON.stringify(false))
      navigate('/login')
      window.location.reload(true);
  };

  const editProfileBtn = () => navigate('/profile')


  return (
    <>
      <nav className="navbar sticky-top navbar-light px-3 px-md-5">
              <button type="button" className="navbar-toggler" onClick={()=>setShow(!show)}>
                 <span className="navbar-toggler-icon"></span>
              </button>
              <div class="navName">
                  <h4><i><b>U Cookin</b></i></h4>
              </div>
              <div class="navSocialMedia">
                <div><a href="https://www.facebook.com/alex.pacaldo.14/"><i class="bi bi-facebook"></i></a></div>
                <div><a href="https://github.com/AlexPacaldo"><i class="bi bi-instagram"></i></a></div>
                <div><a href="mailto:alexpacaldo1105@gmail.com?subject = Feedback&body = Message"><i class="bi bi-envelope-fill"></i></a></div>
            </div>
          </nav>

          {/* SIDENAV */}
          <div className={show ? 'mainNavMob active': 'mainNavMob'}>
            {
              show?
              <div className='navMob py-5'>
                  <NavList className='d-flex flex-column align-items-center'>
                    <StyledLink to = '/' onClick={()=>setShow(false)}>Home</StyledLink>
                    <StyledLink to = '/recipes' onClick={()=>setShow(false)}>Recipes</StyledLink> 
                    <StyledLink to = '/cart' onClick={()=>setShow(false)}>Cart</StyledLink>   
                    <StyledLink to = '/contactUs' onClick={()=>setShow(false)}>Contact Us</StyledLink>                  
                  </NavList>
                  <br></br><br></br>
                  <div class="navProfile text-center">
                      {showBtn?<input className='btn btn-light mx-2' type="button" value="Login" onClick={()=>{ loginBtn(); setShow(false) }}/>:null}
                      {showBtn?<input className='btn btn-primary'type="button" value="Sign Up" onClick={()=>{ regBtn(); setShow(false) }}/>:null}
                      {!showBtn?<input className='btn btn-light mx-2'type="button" value="Profile" onClick={()=>{ editProfileBtn(); setShow(false) }}/>:null}
                      {!showBtn?<input className='btn btn-primary'type="button" value="Logout" onClick={()=>{ profileBtn(); setShow(false) }}/>:null}
                  </div>
              </div>
              :null
            }
              </div>
     </>
  );
}
export default Header