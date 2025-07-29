
import './App.css';
import React, { useEffect, useState, createContext } from "react";

import Accounts from './accounts.js';
import MainClock from './ClockComponent.jsx';
import { HiLogout } from "react-icons/hi";

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import { MantineProvider, Button, Text } from '@mantine/core';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { BsCalendar2RangeFill } from "react-icons/bs";
import 'cal-heatmap/cal-heatmap.css';
import Tooltip from '@mui/material/Tooltip';

import { FaCode } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { BsFillBarChartFill } from "react-icons/bs";
import { BsSticky } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { BiWorld } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { PiGithubLogo } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";

import Productivity from './productivity.js';
import Developer from './developer.js';
import NoteTaking from './noteTaking.js';
import Profile from './profile.js';

import { Analytics } from "@vercel/analytics/react";

export const ThemeContext = createContext(null);

function MainWrapper({ children, handleLogoutClick, setLoggedIn }) {

  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="MainWrapper">
      {children}
      <Sidebar onTabChange={setActiveTab} />
      <div className="MainContent">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'productivity' && <Productivity />}
        {activeTab === 'developer' && <Developer />}
        {activeTab === 'noteTaking' && <NoteTaking />}
        {activeTab === 'profile' && <Profile setLoggedIn={setLoggedIn} handleLogoutClick={handleLogoutClick} />}

      </div>
    </div>

  );
}

function Navigation({ handleLogoutClick, logoutButton }) {

  return (
    <div className="Navigation">

      <div className="Navigation-Logo">

        <HiTrendingUp style={{
          display: 'flex',
          color: '#1DB954',
          fontSize: '35px',
          margin: '20px'
        }} />

      </div>

      <div className="Navigation-Name"> <span>FocusDev</span> </div>

      <div className="Nav-Menu">

        <div className="Navigation-Item">
          <div className="Accounts">
            <button className="AccountsButton"
              value={logoutButton}
              onClick={handleLogoutClick}>
              <span> Log out </span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

function Sidebar({ onTabChange }) {

  const [activeItem, setActiveItem] = useState('dashboard');

  const handleClick = (tabName) => {

    setActiveItem(tabName);
    onTabChange(tabName);

  }

  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleCollapse = () => {

    setIsCollapsed(!isCollapsed);

  };

  return (

    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      <div className={`sidebar-item ${activeItem === 'dashboard' ? 'active' : ''}`} id="SidebarHome" onClick={() => handleClick("dashboard")}>
        <IoHome style={{ fontSize: '27px', alignItems: 'center' }} />
        <span className="sidebarText">Home</span>
      </div>

      <div className={`sidebar-item ${activeItem === 'profile' ? 'active' : ''}`} id="SidebarProfile" onClick={() => handleClick("profile")}>
        <CgProfile style={{ fontSize: '27px', alignItems: 'center' }} />
        <span className="sidebarText">Profile</span>
      </div>

      <div className={`sidebar-item ${activeItem === 'productivity' ? 'active' : ''}`} id="SidebarProductivity" onClick={() => handleClick("productivity")}>
        <BsFillBarChartFill style={{ fontSize: '27px', alignItems: 'center' }} />
        <span className="sidebarText">Productivity</span>
      </div>

      <div className={`sidebar-item ${activeItem === 'developer' ? 'active' : ''}`} id="SidebarDeveloper" onClick={() => handleClick("developer")}>
        <FaCode style={{ display: 'flex', fontSize: '27px', alignItems: 'center' }} />
        <span className="sidebarText">Developer</span>
      </div>

      <div className={`sidebar-item ${activeItem === 'noteTaking' ? 'active' : ''}`} id="SidebarNote" onClick={() => handleClick("noteTaking")}>
        <BsSticky style={{ fontSize: '27px', alignItems: 'center' }} />
        <span className="sidebarText"> Sticky Notes </span>
      </div>

      <div className="sidebar-item" id="SidebarHide" onClick={handleCollapse}>
        <HiLogout style={{
          fontSize: '20px',
          alignItems: 'center',
          marginLeft: '5px',
          transform: isCollapsed ? 'rotate(0deg)' : 'Rotate(-180deg)',
          transition: 'transform 0.5s ease'

        }} />
        <span className="sidebarText"> Hide Sidebar </span>
      </div>
    </div>
  );

}

function Dashboard() {

  // fetch QOTD data from the server, sort data, set it as QOTDData and display data
  const [QOTDData, setQOTDData] = useState(null);

  useEffect(() => {
    const fetchQOTD = async () => {
      const api_url = '/api/qotd';

      try {
        const response = await fetch(api_url);
        const data = await response.json();
        console.log(data);

        if (data && data[0] && data[0].q && data[0].a) {
          setQOTDData({ q: data[0].q, a: data[0].a });
        }
      } catch (error) {
        console.error('Error fetching QOTD:', error);
      }
    };

    fetchQOTD();
  }, []);

  return (
    <div className="Dashboard-container">
      <div className="Welcome">

        <MainClock />

        <div id="QOTD"> ~ Quote of the Day ~ </div>

        <div className="QOTD">
          <span>  {QOTDData ? `"${QOTDData.q}" - ${QOTDData.a}` : <Box sx={{ display: 'flex', padding: '10px' }}> <CircularProgress color="inherit" /> </Box>} </span>
        </div>

      </div>

      <div className="github-commit">

        <span className="description"> Todays Main Goal:  no goal set ~ add one? </span>
        <div className="button"> <Button> Add a main goal for today </Button> </div>

      </div>

      <div className="Dashboard">

        <div className="Dashboard-Item" id="Pinboard">

          <div className="Item-title">
            <div className="Item-Icon">

              <PushPinOutlinedIcon sx={{ justifyContent: 'center', color: '#4ade80', alignItems: 'center', verticalAlign: 'middle', fontSize: '30px', marginRight: '10px' }}>
              </PushPinOutlinedIcon>  <span> Pinboard </span> </div>

          </div>

          <Text className="Note"> Placeholder Text</Text>

        </div>

        <div className="Dashboard-Item" id="Upcoming-Events">

          <div className="Item-title">
            <div className="Item-Icon">

              <BsCalendar2RangeFill style={{ justifyContent: 'center', color: '#4ade80', alignItems: 'center', verticalAlign: 'middle', fontSize: '30px', marginRight: '10px' }}>
              </BsCalendar2RangeFill> <span> Upcoming Events </span> </div>
          </div>

          <Text className="Note"> Placeholder Text</Text>
        </div>

      </div>
    </div>
  );
}

function Footer() {

  return (
    <div className="Footer">

      <div className="Footer-1">
        <div className="footer-content">
          <span> FocusDev ©2025. All rights reserved. </span>
        </div>
      </div>

      <div className="Footer-2">

        <Tooltip title="My Website">
          <div className="icon">
            <a href="https://danielsteele.dev">
              <BiWorld
                style={{
                  fontSize: '30px'

                }}>
              </BiWorld>
            </a>
          </div>
        </Tooltip>

        <Tooltip title="My Github">
          <div className="icon">
            <a href="https://github.com/DanielSteele1">
              <PiGithubLogo
                style={{

                  fontSize: '30px'

                }}>
              </PiGithubLogo>
            </a>
          </div>

        </Tooltip>

        <Tooltip title="LinkedIn">
          <div className="icon">
            <a href="https://www.linkedin.com/in/daniel-steele1">
              <FaLinkedin
                style={{

                  fontSize: '30px'

                }}>
              </FaLinkedin>
            </a>
          </div>
        </Tooltip>

      </div>

      <div className="Footer-3"> <a href="https://dashboard.simpleanalytics.com/?utm_source=danielsteele.dev&utm_content=badge&affiliate=catur"
        referrerpolicy="origin"
        target="_blank" rel="noreferrer noopener"> <picture><source srcset="https://simpleanalyticsbadges.com/danielsteele.dev?logo=c4cad3&text=c4cad3&background=none" media="(prefers-color-scheme: dark)" /><img alt="Simple Analytics Link" src="https://simpleanalyticsbadges.com/danielsteele.dev?mode=dark"
          loading="lazy"
          referrerpolicy="no-referrer"
          crossorigin="anonymous" /></picture></a> </div>
    </div>
  );
}

function App() {

  const [theme, setTheme] = useState("dark");
  const [loggedIn, setLoggedIn] = useState(false);
  const [logoutButton] = useState();


  const handleLogoutClick = async (e) => {

    e.preventDefault();

    try {
      await fetch('${process.env.NEXT_PUBLIC_BACKEND_URL}/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ logout: logoutButton }),
      });
      setLoggedIn(false);

    } catch (error) {
      console.error('Error Logging user out:', error);
    }

  };

  return (
    <ThemeContext.Provider>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: theme }}>
        <div className={`App ${theme}`}>
          {loggedIn ? (

            <>

              <Navigation theme={theme} setLoggedIn={setLoggedIn} handleLogoutClick={handleLogoutClick} />
              <MainWrapper handleLogoutClick={handleLogoutClick} setLoggedIn={setLoggedIn}>
                <Analytics />
              </MainWrapper>
              <Footer />

            </>

          ) : (
            <Accounts setLoggedIn={setLoggedIn} />
          )}
        </div>
      </MantineProvider>
    </ThemeContext.Provider>
  );
}

export default App;