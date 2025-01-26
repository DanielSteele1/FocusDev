
import './App.css';

import React, { useEffect, useRef } from "react";
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
import LocationOnIcon from '@mui/icons-material/LocationOn';

import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';

import { MantineProvider, Button, Text } from '@mantine/core';
import { Calendar } from '@mantine/dates';

import EmojiPicker from 'emoji-picker-react';
import { TextField } from '@mui/material';

import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';

import SampleData from './api/sampleData.json';

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

      <div className="Navigation-Logo">
        <TrendingUpIcon
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '40px' }}>
        </TrendingUpIcon> </div>
      <div className="Navigation-Name"> <span> FocusDev </span> </div>

      <div className="Navigation-Item">
        <input className="LocationInput" type="text" placeholder="Enter your location" />
      </div>

      <div className="Navigation-Item">
        <Button className="LocationSearch"> <LocationOnIcon> </LocationOnIcon> </Button>
      </div>

      <div className="Nav-Menu">

        <div className="Navigation-Item"> <span className="darkMode">
          <NightsStayIcon
            sx={{ justifyContent: 'center', alignItems: 'center', margintop: '10px' }}>
          </NightsStayIcon>
        </span>
        </div>

        <div className="Navigation-Item" id="time">
          <span className="time">
            <AccessTimeIcon
              sx={{ justifyContent: 'center', alignItems: 'center', margin: '10px' }} />
            <span className="timetext">{timeText} </span>
          </span>
        </div>

      </div>
    </div>
  );
}

function Dashboard() {


  const calRef = useRef(null);
  useEffect(() => {

    if (!calRef.current) {
      const cal = new CalHeatmap();

      var data = [
        
          { "date": "2025-01-01", "value": 1 },
          { "date": "2025-01-02", "value": 2 },
          { "date": "2025-01-03", "value": 3 },
          { "date": "2025-01-04", "value": 4 },
          { "date": "2025-01-05", "value": 5 },
          { "date": "2025-01-06", "value": 6 },
          { "date": "2025-01-07", "value": 7 },
          { "date": "2025-01-08", "value": 8 },
          { "date": "2025-01-09", "value": 9 },
          { "date": "2025-01-10", "value": 10 },
          { "date": "2025-01-11", "value": 11 },
          { "date": "2025-01-12", "value": 12 },
          { "date": "2025-01-13", "value": 13 },
          { "date": "2025-01-14", "value": 14 },
          { "date": "2025-01-15", "value": 15 },
          { "date": "2025-01-16", "value": 16 },
          { "date": "2025-01-17", "value": 17 },
          { "date": "2025-01-18", "value": 18 },
          { "date": "2025-01-19", "value": 19 },
          { "date": "2025-01-20", "value": 20 },
          { "date": "2025-01-21", "value": 21 },
          { "date": "2025-01-22", "value": 22 },
          { "date": "2025-01-23", "value": 23 },
          { "date": "2025-01-24", "value": 24 },
          { "date": "2025-01-25", "value": 25 },
          { "date": "2025-01-26", "value": 26 },


      ];

      const currentYear = new Date().getFullYear();
      const startDate = new Date(currentYear, 0, 1);
      const endDate = new Date();


      cal.paint({
        itemSelector: "#cal-heatmap",
        domain: {
          type: 'year',
          range: 1,
          padding: [10, 5, 10, 0],
          gutter: 2,
          label: {
            position: 'top',
          },
        },

        range: 1,

        date: {
          start: startDate,
          min: startDate,
          max: endDate,
          highlight: [],
          locale: 'default',
          timezone: 'GMT'
        },

        subDomain: {
          type: 'day',
          width: 20,
          height: 20,
          padding: [0, 0, 0, 0],
          margin: [0, 0, 0, 0],
          gutter: 2
        },

        scale: {
          color: {
            type: 'linear',
            range: ['#e0f7e9', '#1DB954'],
            domain: [0, 100],
            noData: '#000000',
          },
        },

        data: {
          source: data,
          type: 'json',
          x: 'date',
          y: 'value'
        },

        date: { start: new Date('2025-01-01'), timezone: 'GMT' },
        legend: [10, 20, 30, 40, 60, 80, 100],
      });
      calRef.current = cal;
      console.log("Sample Data:", data);

    }

  }, []);

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


        <div className="Dashboard-Item" id="Github-Commit-Graph">

          <span className="github-title">
              <GithubIcon
                sx={{ justifyContent: 'center', alignItems: 'center',  marginRight: '10px' }}>
              </GithubIcon>
              <br></br>
              <span>Github Commit Graph </span>
            </span>

          <div id="cal-heatmap"> </div>
        </div>

        <div className="Dashboard-Top">

          <div className="Dashboard-Item" id="Useful-Links"> <span>
            <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </PushPinIcon>Useful Links </span>

            <div className="Controls">
              <div className="Notes-input">
                <input id="Input" type="text" placeholder="Add a website url">

                </input>
              </div>

              <div id="Notes-Buttons">
                <IconButton > <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px' }}>  </AddIcon>  </IconButton>
              </div>

            </div>

            <Text className="Note"> This is a note This is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a note</Text>
            <Text className="Note"> This is a note </Text>

            <Text className="Note"> This is a note </Text>
            <Text className="Note"> This is a note </Text>
            <Text className="Note"> This is a note </Text>


          </div>

          <div className="Dashboard-Item" id="Pinboard"> <span>
            <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </PushPinIcon> Pinboard </span>

          </div>

          <div className="Dashboard-Item" id="Upcoming-Events"> <span>
            <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </CalendarMonthIcon>Upcoming Events </span> </div>

          <div className="Dashboard-Item" id="Weather"> <span>
            <CloudQueueIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </CloudQueueIcon> Weather </span> </div>

        </div>

        <div className="Dashboard-Mid">
          <div className="Dashboard-Item" id="Notes">
            <span>
              <NotesIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </NotesIcon>
              Notes
            </span>
            <div className="Controls">
              <div className="Notes-input">
                <input id="Input" type="text" placeholder="Add a note">

                </input>
              </div>

              <div id="Notes-Buttons">
                <IconButton > <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px' }}>  </AddIcon>  </IconButton>
              </div>

            </div>

            <div className="Notes-Content">

            </div>
            <Text className="Note"> This is a note This is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a note</Text>
            <Text className="Note"> This is a note </Text>

            <Text className="Note"> This is a note </Text>
            <Text className="Note"> This is a note </Text>
            <Text className="Note"> This is a note </Text>
          </div>

          <div className="Dashboard-Item" id="ToDo"> <span>
            <CalendarMonthIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </CalendarMonthIcon> To Do </span>


            <div className="Controls">
              <div className="Notes-input">
                <input id="Input" type="text" placeholder="Add a goal to track">

                </input>
              </div>

              <div id="Notes-Buttons">
                <IconButton > <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px' }}>  </AddIcon>  </IconButton>
              </div>

            </div>

          </div>

          <div className="Dashboard-Item" id="Calender"> <span>
            <CalendarMonthIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </CalendarMonthIcon> Calendar <Calendar /> </span>

          </div>
        </div>

        <div className="Dashboard-Bottom">
          <div className="Dashboard-Item" id="Habit-Tracker"> <span>
            <CalendarMonthIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </CalendarMonthIcon> Habit Tracker </span> </div>

          <div className="Dashboard-Item" id="Calorie-Tracker"> <span>
            <CalendarMonthIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </CalendarMonthIcon> Calorie Tracker </span> </div>

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
