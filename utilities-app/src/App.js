
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

import Legend from 'cal-heatmap/plugins/Legend';

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
        <button className="LocationSearch">
          <LocationOnIcon
            sx={{ justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
          </LocationOnIcon> </button>
      </div>

      <div className="Nav-Menu">

        <div className="Navigation-Item">
          <div className="darkMode">
            <button className="themeButton">
              <NightsStayIcon
                sx={{ justifyContent: 'center', alignItems: 'center', margin: '10px' }}>
              </NightsStayIcon>
            </button>
          </div>
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

        { "date": "2025-01-01", "value": 30 },
        { "date": "2025-01-02", "value": 2 },
        { "date": "2025-01-03", "value": 10 },
        { "date": "2025-01-04", "value": 10 },
        { "date": "2025-01-05", "value": 1 },
        { "date": "2025-01-06", "value": 10 },
        { "date": "2025-01-07", "value": 7 },
        { "date": "2025-01-08", "value": 25 },
        { "date": "2025-01-09", "value": 4 },
        { "date": "2025-01-10", "value": 11 },
        { "date": "2025-01-11", "value": 1 },
        { "date": "2025-01-12", "value": 5 },
        { "date": "2025-01-13", "value": 5 },
        { "date": "2025-01-14", "value": 1 },
        { "date": "2025-01-15", "value": 30 },
        { "date": "2025-01-16", "value": 16 },
        { "date": "2025-01-17", "value": 10 },
        { "date": "2025-01-18", "value": 1 },
        { "date": "2025-01-19", "value": 12 },
        { "date": "2025-01-20", "value": 1 },
        { "date": "2025-01-21", "value": 15 },
        { "date": "2025-01-22", "value": 14 },
        { "date": "2025-01-23", "value": 11 },
        { "date": "2025-01-24", "value": 12 },
        { "date": "2025-01-25", "value": 1 },
        { "date": "2025-01-26", "value": 30 },

        { "date": "2025-01-27", "value": 26 },
        { "date": "2025-01-28", "value": 26 },

      ];

      // graph updates

      const endDate = new Date();
      const startDate = new Date(endDate.getFullYear(), 0, 1);

      startDate.setFullYear(endDate.getFullYear());
      startDate.setDate(startDate.getDate());

      console.log(startDate);

      cal.paint({
        itemSelector: "#cal-heatmap",
        domain: {
          type: 'month',
          padding: [0, 0, 0, 0],
          gutter: 2,
          label: {
            position: 'top',
          },
        },
        range: 12,

        date: {
          start: startDate,
          min: startDate,
          max: endDate,
          //  start: startYear,
          //  min: startYear,
          //  max: endYear,

          timezone: 'GMT'
        },

        subDomain: {
          type: 'day',
          width: 18,
          height: 18,
          padding: [0, 0, 0, 0],
          margin: [5, 5, 5, 5],
          gutter: 3,
          radius: 3.5,

        },

        scale: {
          color: {
            range: ['#302f2f', '#0BDA51'],
            type: 'linear',
            domain: [0, 5, 10, 20, 30],

          },
        },

        data: {
          source: data,
          type: 'json',
          x: 'date',
          y: 'value'
        },

      });

      calRef.current = cal;
      console.log("Sample Data:", data);

      cal.paint({}, [[

        Legend,
        {
          label: 'Commit Frequency: 0 - 30+, grey squares indicate 0 commits, white squares indicate ',
          width: '600',
          height: '60',

        },

      ]]);
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

  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');

  //update inputValue whenever input field changes

  const handleInputChange = (event) => {
    setInputValue(event.target.value);

  };

  // if input field isnt empty, add the note
  const handleAddNote = () => {

    if (inputValue !== '') {

      setNotes([...notes, inputValue]);
      setInputValue('');
    }
  };

  // handle note deletion

  const handleNoteDelete = (index) => {

    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);

  };

  const [links, setLinks] = useState([]);
  const [linkInputValue, setLinkInputValue] = useState('');

  const handleLinkInputChange = (event) => {
 
    setLinkInputValue(event.target.value);
  };

  const handleAddLink = () => {  

    if (linkInputValue !== '') {

      setLinks([...links, linkInputValue]);
      setLinkInputValue('');
    }

  };

  const handleLinksDelete = (index) => {

    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);

   };

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
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
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
                <input
                  id="Input"
                  type="text"
                  placeholder="Add a website url"
                  onChange={handleLinkInputChange}
                  value={linkInputValue}>

                </input>
              </div>

              <div id="Notes-Buttons">
                <IconButton onClick={handleAddLink} > <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px' }}>  </AddIcon>  </IconButton>
              </div>

            </div>

            {/* Links container */}

            <div className="Notes-Container">
              {links.map((link, index) => (
                <div key={index} className="Notes-Content">
                  <div className="Note">{link}</div>
                  <IconButton onClick={() => handleLinksDelete(index)}>
                    <CloseIcon id="Delete-links-button" sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px' }} />
                  </IconButton>
                </div>
              ))}
            </div>

          </div>

          <div className="Dashboard-Item" id="Pinboard"> <span>
            <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </PushPinIcon> Pinboard </span>

            <Text className="Note"> This is a note This is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a noteThis is a note</Text>
            <Text className="Note"> This is a note </Text>

          </div>

          <div className="Dashboard-Item" id="Upcoming-Events"> <span>
            <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </CalendarMonthIcon>Upcoming Events </span>

            <Text className="Note"> Placeholder Text</Text>
            <Text className="Note"> Placeholder Text </Text>
            <Text className="Note"> Placeholder Text </Text>
            <Text className="Note"> Placeholder Text </Text>
          </div>

          <div className="Dashboard-Item" id="Weather"> <span>
            <CloudQueueIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}>
            </CloudQueueIcon> Weather </span>

            <Text className="Note"> Placeholder Text </Text>


          </div>
        </div>

        <div className="Dashboard-Mid">
          <div className="Dashboard-Item" id="Notes">
            <span>
              <NotesIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </NotesIcon>
              Notes
            </span>
            <div className="Controls">
              <div className="Notes-input">
                <input id="Input"
                  type="text"
                  placeholder="Add a note"
                  onChange={handleInputChange}
                  value={inputValue}>

                </input>
              </div>

              <div id="Notes-Buttons">
                <IconButton onClick={handleAddNote}> <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px' }}>  </AddIcon>  </IconButton>
              </div>
            </div>


            {/* Notes container */}

            <div className="Notes-Container">
              {notes.map((note, index) => (
                <div key={index} className="Notes-Content">
                  <div className="Note">{note}</div>
                  <IconButton onClick={() => handleNoteDelete(index)}>
                    <CloseIcon id="Delete-links-button" sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px' }} />
                  </IconButton>
                </div>
              ))}
            </div>

            <div className="Notes-Content">

            </div>
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
