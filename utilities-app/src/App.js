
import './App.css';
import React, { useEffect, useState, useRef, createContext, OnSubmit } from "react";

//import WeatherWidget from './Weather';
import Accounts from './accounts';

import { HiLogout } from "react-icons/hi";

import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FilterDramaOutlinedIcon from '@mui/icons-material/FilterDramaOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { MantineProvider, Button, Text } from '@mantine/core';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import 'cal-heatmap/cal-heatmap.css';
import Tooltip from '@mui/material/Tooltip';

import { FaCode } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { BsFillBarChartFill } from "react-icons/bs";
import { LuNotebook } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { BiWorld } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { PiGithubLogo } from "react-icons/pi";
import { HiTrendingUp } from "react-icons/hi";

import Productivity from './productivity';
import Developer from './developer';
import NoteTaking from './noteTaking';
import Profile from './profile';

export const ThemeContext = createContext(null);

function MainWrapper({ children }) {

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
        {activeTab === 'profile' && <Profile />}

      </div>
    </div>

  );
}

function Navigation({ toggleTheme, theme, setLoggedIn }) {

  const [timeText, setTimeText] = useState("");

  useEffect(() => {

    function getTime() {

      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString();
      const formattedDate = currentTime.toLocaleDateString();

      setTimeText(`${formattedDate} ${formattedTime}`);
    }

    getTime();
    const interval = setInterval(getTime, 1000);

    return () => clearInterval(interval);

  }, []);

  const [logoutButton, setLogoutButton] = useState();

  const handleLogoutClick = async (e) => {

    e.preventDefault();

    try {
      const response = await fetch('/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ logout: logoutButton }),
      });
      const result = await response.json();
      setLoggedIn(false);

    } catch (error) {
      console.error('Error Logging user out:', error);
    }

  };

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

      <div className="Navigation-Name"> <span> FocusDev </span> </div>

      <div className="Navigation-Item" id="location">
        <div className="location">

          <input className="LocationInput" contenteditable="true" type="text" placeholder=" Search your location" />

          <button className="LocationSearch">
            <LocationOnIcon
              sx={{ justifyContent: 'center', alignItems: 'center' }}>
            </LocationOnIcon>
          </button>
        </div>

      </div>

      <div className="Nav-Menu">

        <div className="Navigation-Item" id="time">
          <span className="time">
            <AccessTimeIcon
              sx={{ justifyContent: 'center', alignItems: 'center', margin: '10px' }} />
            <span className="timetext">{timeText} </span>
          </span>
        </div>

        <div className="Navigation-Item">
          <div className="darkMode">
            <button className="themeButton" onClick={toggleTheme} >

              {theme === "dark" ? (

                <MdLightMode
                  style={{ justifyContent: 'center', alignItems: 'center', margin: '0px', fontSize: '30px' }}>
                </MdLightMode>

              ) : (

                <MdDarkMode
                  style={{ justifyContent: 'center', alignItems: 'center', margin: '0px', fontSize: '30px' }}>
                </MdDarkMode>

              )}

            </button>
          </div>
        </div>

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
        <LuNotebook style={{ fontSize: '27px', alignItems: 'center' }} />
        <span className="sidebarText">Notepad</span>
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

  // Weather API Frontend

  //   const fetchLocalWeather = async () => {
  //     //const api_url = '/api/';

  //     try {
  //       const response = await fetch(api_url);
  //       const data = await response.json();
  //       console.log(data);

  //       if (data) {
  //         setWeatherData(data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching WeatherAPI:', error);
  //     }
  //   };

  //   fetchLocalWeather();
  // }, []);


  return (
    <div className="Dashboard-container">
      <div className="Welcome">

        <span> <span id="emoji">👋</span>  Welcome back! </span>

        <div id="QOTD"> ~ Quote of the Day ~ </div>

        <div className="QOTD">
          <span>  {QOTDData ? `"${QOTDData.q}" - ${QOTDData.a}` : <Box sx={{ display: 'flex', padding: '10px' }}> <CircularProgress color="inherit" /> </Box>} </span>
        </div>
      </div>

      <div className="github-commit">

        <span> <span id="emoji">👨‍💻</span>  Github commit graph goes here. </span>

      </div>

      <div className="Dashboard">


        <div className="Weather">

          <div className="Item-title">
            <div className="Item-Icon">

              <FilterDramaOutlinedIcon sx={{ justifyContent: 'center', alignItems: 'center', margin: '0px', verticalAlign: 'middle' }}>
              </FilterDramaOutlinedIcon> <span> Weather </span>  </div>

          </div>

          <WeatherWidget />

        </div>
      </div>

      <div className="Dashboard">

        <div className="Dashboard-Item" id="Pinboard">

          <div className="Item-title">
            <div className="Item-Icon">

              <PushPinOutlinedIcon sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '3px', verticalAlign: 'middle', fontSize: '20px' }}>
              </PushPinOutlinedIcon>  <span> Pinboard </span> </div>

          </div>

          <Text className="Note"> Placeholder Text</Text>

        </div>

        <div className="Dashboard-Item" id="Upcoming-Events">

          <div className="Item-title">
            <div className="Item-Icon">


              <CalendarMonthOutlinedIcon sx={{ justifyContent: 'center', alignItems: 'center', margin: '0px', verticalAlign: 'middle' }}>
              </CalendarMonthOutlinedIcon> <span> Upcoming Events </span> </div>
          </div>

          <Text className="Note"> Placeholder Text</Text>
        </div>

      </div>
    </div>
  );
}


function WeatherWidget() {

  return (

    <div className="Weather-Container">
      <div className="today-summary">
        <span className="weather-heading"> Current Forecast: </span>

        <div className="Forecast">
          <span> Rain </span>

        </div>

        <div className="Temp">

          <span className="weather-title"> 11:00 AM </span>
          <span className="weather-text" > 17°C </span>

        </div>

      </div>

      <div className="Next-4-hours">
        <div className="hour1">

          <span className="weather-title"> 11:00 AM </span>
          <span className="weather-text" > 17°C </span>

        </div>

        <div className="hour2">

          <span className="weather-title"> 11:00 AM </span>
          <span className="weather-text" > 17°C </span>

        </div>

        <div className="hour3">

          <span className="weather-title"> 11:00 AM </span>
          <span className="weather-text" > 17°C </span>

        </div>
        <div className="hour4">

          <span className="weather-title"> 11:00 AM </span>
          <span className="weather-text" > 17°C </span>

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
          <span> Website created by Daniel Steele </span>
          <span> Daniel Steele ©2025. All rights reserved. </span>
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
                Click here to check out my other work! </BiWorld>
            </a>
          </div>
        </Tooltip>

        <Tooltip title="LinkedIn">
          <div className="icon">
            <a href="https://www.linkedin.com/in/daniel-steele1/">
              <PiGithubLogo
                style={{

                  fontSize: '30px'

                }}>
                Click here to check out my other work! </PiGithubLogo>
            </a>
          </div>

        </Tooltip>

        <Tooltip title="My Github">
          <div className="icon">
            <a href="https://github.com/DanielSteele1">
              <FaLinkedin
                style={{

                  fontSize: '30px'

                }}>
                Click here to check out my other work! </FaLinkedin>
            </a>
          </div>
        </Tooltip>

      </div>

      <div className="Footer-3"> <a href="https://dashboard.simpleanalytics.com/?utm_source=danielsteele.dev&utm_content=badge&affiliate=catur"
        referrerpolicy="origin"
        target="_blank"> <picture><source srcset="https://simpleanalyticsbadges.com/danielsteele.dev?mode=dark" media="(prefers-color-scheme: dark)" /><img src="https://simpleanalyticsbadges.com/danielsteele.dev?mode=light"
          loading="lazy"
          referrerpolicy="no-referrer"
          crossorigin="anonymous" /></picture></a> </div>

    </div>
  );

}

function App() {

  const [theme, setTheme] = useState("dark");
  const [loggedIn, setLoggedIn] = useState(false);


  const toggleTheme = () => {

    setTheme((curr) => (curr === "light" ? "dark" : "light"));
    console.log("Theme:", theme);

  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: theme }}>
        <div className={`App ${theme}`}>
          {loggedIn ? (

            <>

              <Navigation theme={theme} toggleTheme={toggleTheme} setLoggedIn={setLoggedIn} />
              <MainWrapper>

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