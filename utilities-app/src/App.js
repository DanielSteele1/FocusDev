
import './App.css';

import React, { useEffect } from "react";
import { useState } from "react";

import NotesIcon from '@mui/icons-material/Notes';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import PushPinIcon from '@mui/icons-material/PushPin';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GithubIcon from '@mui/icons-material/GitHub';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';

import { MantineProvider, Button, Text } from '@mantine/core';
import { Calendar } from '@mantine/dates';

import EmojiPicker from 'emoji-picker-react';
import { TextField } from '@mui/material';

function Navigation() {

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

  return (
    <div className="Navigation">

      <div className="Navigation-Logo"> <TrendingUpIcon sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' }}>  </TrendingUpIcon> </div>
      <div className="Navigation-Name"> <span> FocusDev </span> </div>

      <div className="Nav-Menu">

        <div className="Navigation-Item"> <span className="darkMode"> <NightsStayIcon sx={{ justifyContent: 'center', alignItems: 'center', margintop: '10px' }}>  </NightsStayIcon> </span> </div>
        <div className="Navigation-Item" id="time">
          <span className="time">
            <AccessTimeIcon sx={{ justifyContent: 'center', alignItems: 'center', margin: '10px' }} />
            <span className="timetext">{timeText}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function Dashboard() {

  const [QOTDData, setQOTDData] = useState(null);

  useEffect(() => {
    const fetchQOTD = async () => {
      const api_url = 'https://zenquotes.io/api/quotes/';

      try {
        const response = await fetch(api_url);
        const data = await response.json();
        console.log(data);

        if (data && data.length > 0) {
          setQOTDData(data[0].q);
        }
      } catch (error) {
        console.error('Error fetching QOTD:', error);
      }
    };

    fetchQOTD();
  }, []);


  return (
    <div className="Dashboard-container">

      <div className="Dashboard">
        <div className="Welcome"> <span> <span id="emoji">👋</span>  Welcome back, Daniel </span>
          <div className="QOTD">
            <div id="QOTD"> Quote of the Day ~ </div>
            <span>  {QOTDData ? { QOTDData } : 'Loading . . .'} </span>
          </div>
        </div>

        <div className="Dashboard-Top">

          <div className="Dashboard-Item" id="Useful-Links"> <span> <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </PushPinIcon>Useful Links </span> </div>
          <div className="Dashboard-Item" id="Pinboard"> <span> <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </PushPinIcon> Pinboard </span> </div>
          <div className="Dashboard-Item" id="Upcoming-Events"> <span> <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CalendarMonthIcon>Upcoming Events </span> </div>

          <div className="Dashboard-Item" id="Weather"> <span> <CloudQueueIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CloudQueueIcon> Weather </span> </div>

        </div>

        <div className="Dashboard-Mid">
          <div className="Dashboard-Item" id="Notes">
            <span>
              <NotesIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </NotesIcon>
              Notes
            </span>
            <div className="Notes-Controls">
              <div className="Notes-input">
                <input id="NotesInput" type="text" placeholder="Add a note">

                </input>
                <div id="Notes-Buttons">
                  <IconButton color="green"> <AddIcon color="green">  </AddIcon>  </IconButton>
                  <IconButton color="green"> <CloseIcon> </CloseIcon> </IconButton>
                </div>

              </div>
            </div>
            <div className="Notes-Content">
            </div>
            <Text className="Note"> This is a note </Text>
            <Text className="Note"> This is a note </Text>
            <Text className="Note"> This is a note </Text>
            <Text className="Note"> This is a note </Text>
            <Text className="Note"> This is a note </Text>
          </div>
          <div className="Dashboard-Item" id="ToDo"> <span> <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CalendarMonthIcon> To Do </span> </div>
          <div className="Dashboard-Item" id="Calender"> <span> <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
          </CalendarMonthIcon> Calendar <Calendar /> </span>

          </div>
        </div>

        <div className="Dashboard-Bottom">
          <div className="Dashboard-Item" id="Habit-Tracker"> <span> <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CalendarMonthIcon> Habit Tracker </span> </div>
          <div className="Dashboard-Item" id="Calorie-Tracker"> <span>  <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CalendarMonthIcon> Calorie Tracker </span> </div>
          <div className="Dashboard-Item" id="Github-Commit-Graph"> <span> <GithubIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </GithubIcon> Github Commit Graph </span> </div>

        </div>

      </div>
    </div>
  );
}

function Footer() {

  return (
    <div className="Footer">
      < h1> Footer </h1>

    </div>
  );

}

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme: 'dark' }}>
      <div className="App">
        <Navigation />
        <Dashboard />
        <Footer />
      </div>
    </MantineProvider>
  );
}

export default App;
