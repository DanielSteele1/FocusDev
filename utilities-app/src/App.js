
import './App.css';
import React, { useEffect, useState, useRef, createContext, OnSubmit } from "react";

//import WeatherWidget from './Weather';
import Accounts from './accounts';

import NotesIcon from '@mui/icons-material/Notes';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import LogoutIcon from '@mui/icons-material/ExitToAppOutlined';
import { HiLogout } from "react-icons/hi";

import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import FilterDramaOutlinedIcon from '@mui/icons-material/FilterDramaOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import NightsStayIcon from '@mui/icons-material/NightsStay';

import { MantineProvider, Button, Text } from '@mantine/core';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';

import Tooltip from '@mui/material/Tooltip';

import { FaCode } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { BsFillBarChartFill } from "react-icons/bs";
import { LuNotebook } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";

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
        <TrendingUpIcon
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' }}>
        </TrendingUpIcon> </div>
      <div className="Navigation-Name"> <span> FocusDev </span> </div>

      <div className="Navigation-Item" id="location">
        <div className="location">

          <input className="LocationInput" contenteditable="true" type="text" placeholder="Enter your location" />

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
            <button className="themeButton" onClick={toggleTheme} checked={theme === "dark"}>
              <NightsStayIcon
                sx={{ justifyContent: 'center', alignItems: 'center', margin: '0px', fontSize: '25px' }}>
              </NightsStayIcon>
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

      <div className="sidebar-item" id="SidebarHide" onClick={ handleCollapse }>
        <HiLogout  style={{ 
          fontSize: '20px', 
          alignItems: 'center',
          marginLeft: '5px',
          transform: isCollapsed ? 'rotate(0deg)' : 'Rotate(-180deg)',
          transition: 'transform 0.5s ease'

         }} />
        <span className="sidebarText"> Hide Sidebar </span>
      </div>

      <div className={`sidebar-item ${activeItem === 'dashboard' ? 'active' : ''}`} id="SidebarHome" onClick={() => handleClick("dashboard")}>
        <IoHome style={{ fontSize: '28px', alignItems: 'center' }} />
        <span className="sidebarText">Home</span>
      </div>

      <div className={`sidebar-item ${activeItem === 'profile' ? 'active' : ''}`} id="SidebarProfile" onClick={() => handleClick("profile")}>
      <CgProfile  style={{ fontSize: '30px', alignItems: 'center' }} />
        <span className="sidebarText">Profile</span>
      </div>

      <div className={`sidebar-item ${activeItem === 'productivity' ? 'active' : ''}`} id="SidebarProductivity" onClick={() => handleClick("productivity")}>
      <BsFillBarChartFill  style={{ fontSize: '28px', alignItems: 'center' }} />
        <span className="sidebarText">Productivity</span>
      </div>

      <div className={`sidebar-item ${activeItem === 'developer' ? 'active' : ''}`} id="SidebarDeveloper" onClick={() => handleClick("developer")}>
        <FaCode  style={{ display: 'flex', fontSize: '30px', alignItems: 'center' }} />
        <span className="sidebarText">Developer</span>
      </div>

      <div className={`sidebar-item ${activeItem === 'noteTaking' ? 'active' : ''}`} id="SidebarNote" onClick={() => handleClick("noteTaking")}>
        <LuNotebook  style={{ fontSize: '30px', alignItems: 'center' }} />
        <span className="sidebarText">Note taking</span>
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

        <div className="Dashboard-Item" id="Pinboard">

          <div className="Item-title">
            <div className="Item-Icon">

              <PushPinOutlinedIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px', verticalAlign: 'middle', fontSize: '20px' }}>
              </PushPinOutlinedIcon> </div> <span> Pinboard </span>

          </div>

          <Text className="Note"> Placeholder Text</Text>

        </div>

        <div className="Dashboard-Item" id="Upcoming-Events">

          <div className="Item-title">
            <div className="Item-Icon">


              <CalendarMonthOutlinedIcon sx={{ justifyContent: 'center', alignItems: 'center', margin: '0px', verticalAlign: 'middle' }}>
              </CalendarMonthOutlinedIcon> </div> <span> Upcoming Events </span>
          </div>

          <Text className="Note"> Placeholder Text</Text>
        </div>

        <div className="Dashboard-Item" id="Weather">

          <div className="Item-title">
            <div className="Item-Icon">

              <FilterDramaOutlinedIcon sx={{ justifyContent: 'center', alignItems: 'center', margin: '0px', verticalAlign: 'middle' }}>
              </FilterDramaOutlinedIcon> </div> <span> Weather </span>

          </div>

          {/* <WeatherWidget /> */}

        </div>
      </div>

      {/* FEATURES TO BE WORKED ON AFTER CORE DEVELOPMENT, AS UPDATES  */}

      {/* <div className="Dashboard-Bottom">
        <div className="Dashboard-Item" id="Habit-Tracker"> <span>
          <CalendarMonthOutlinedIcon
            sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
          </CalendarMonthOutlinedIcon> Habit Tracker </span> </div>

        <div className="Dashboard-Item" id="Calorie-Tracker"> <span>
          <CalendarMonthOutlinedIcon
            sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
          </CalendarMonthOutlinedIcon> Calorie Tracker </span> </div>

      </div> */}

    </div>
  );
}


function Footer() {

  return (
    <div className="Footer">
      <span> Created by Daniel Steele </span>
      <span> Check out my other work </span>

      <span> Buy me a coffee badge </span>

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