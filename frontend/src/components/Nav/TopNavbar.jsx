import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { useNavigate, Link as router_link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

// Components
import Sidebar from "./Sidebar";
import Backdrop from "../Elements/Backdrop";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar() {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    return () => {
      window.removeEventListener("scroll", () => setY(window.scrollY));
    };
  }, [y]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navigateToHome = () => {
    navigate("/");
    toggleSidebar(false);
  };

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      {sidebarOpen && <Backdrop toggleSidebar={toggleSidebar} />}
      <Wrapper className="flexCenter animate whiteBg" style={y > 100 ? { height: "60px" } : { height: "80px" }}>
        <NavInner className="container flexSpaceCenter">
        <router_link className="pointer flexNullCenter" to="/" onClick={navigateToHome}>

            <LogoIcon />
            <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
              IT Consult 
            </h1>
          </router_link>
          <BurderWrapper className="pointer" onClick={() => toggleSidebar(!sidebarOpen)}>
            <BurgerIcon />
          </BurderWrapper>
          <UlWrapper className="flexNullCenter">
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="home" spy={true} smooth={true} offset={-80}>
                Home
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="services" spy={true} smooth={true} offset={-80}>
                Services
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="projects" spy={true} smooth={true} offset={-80}>
                Projects
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="blog" spy={true} smooth={true} offset={-80}>
                Blog
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="pricing" spy={true} smooth={true} offset={-80}>
                Pricing
              </Link>
            </li>
            <li className="semiBold font15 pointer">
              <Link activeClass="active" style={{ padding: "10px 15px" }} to="contact" spy={true} smooth={true} offset={-80}>
                Contact
              </Link>
            </li>
          </UlWrapper>
          <UlWrapperRight className="flexNullCenter">
            {user ? (
              <>
                <li className="semiBold font15 pointer">
                  <span style={{ padding: "10px 30px 10px 0" }}>{user.username}</span>
                </li>
                <li className="semiBold font15 pointer">
                  <button 
                    style={{ padding: "10px 30px 10px 0", background: 'none', border: 'none', cursor: 'pointer', color: '#000' }} 
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </li>
              </>
            ) : (
              <li className="semiBold font15 pointer flexCenter">
                <button 
                  className="radius8 lightBg"
                  style={{ padding: "10px 15px", border: 'none', cursor: 'pointer', color: '#000' }}
                  onClick={() => {
                    toggleSidebar(false);
                    navigate("/login");
                  }}
                >
                  Get Started
                </button>
              </li>
            )}
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  @media (max-width: 760px) {
    display: none;
  }
`;


