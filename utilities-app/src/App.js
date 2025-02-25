
import './App.css';
import React, { useEffect, useRef, createContext, OnSubmit } from "react";
import { useState } from "react";

//import WeatherWidget from './Weather';
import Accounts from './accounts';

import NotesIcon from '@mui/icons-material/Notes';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import PushPinIcon from '@mui/icons-material/PushPin';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GithubIcon from '@mui/icons-material/GitHub';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

import CloseIcon from '@mui/icons-material/Close';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';

import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';

import { MantineProvider, Button, Text } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { DatePicker } from '@mantine/dates';
import { TimeInput } from '@mantine/dates';
//import { DatesProvider } from '@mantine/dates';

import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { RingProgress } from '@mantine/core';

import EmojiPicker from 'emoji-picker-react';
import { TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';

import SampleData from './api/sampleData.json';
import Legend from 'cal-heatmap/plugins/Legend';
import { Notes } from '@mui/icons-material';

import Tooltip from '@mui/material/Tooltip';

export const ThemeContext = createContext(null);

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
                sx={{ justifyContent: 'center', alignItems: 'center', margin: '5px' }}>
              </NightsStayIcon>
            </button>
          </div>
        </div>

        <div className="Navigation-Item">
          <div className="Accounts">
            <button className="AccountsButton"
              value={logoutButton}
              onClick={handleLogoutClick}>

              <LogoutIcon
                sx={{ justifyContent: 'center', alignItems: 'center', margin: '5px' }}>
              </LogoutIcon>
              <span> Log out </span>

            </button>
          </div>
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
          type: 'year',
          padding: [0, 0, 0, 0],
          gutter: 0,
          label: {
            position: 'top',
          },
        },
        range: 1,

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
          width: 15,
          height: 15,
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

  // fetch QOTD data from the server, set it as QOTDData and display data

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

  const [githubData, setGithubData] = useState(null);

  //github API Frontend

  const fetchGithub = async () => {
    const api_url = '/api/githubApiConn';

    try {
      const response = await fetch(api_url);
      const repos = await response.json();
      console.log(repos);

      // works out total forks by iterating over each repo, and adding up the forks_count field to a total sum. 
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
      // sorts data array in descending order based on pushed_at field.
      const latestProject = repos.sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))[0];

      setGithubData({
        repos,
        totalForks,
        latestProject,
      });

    } catch (error) {
      console.error('Error fetching Github Data:', error);
    }
  };

  const handleGithubSubmit = async (e) => {
    e.preventDefault();
    await fetchUsername();
    await fetchGithub();
  }

  const handleUsername = async (e) => {
    await setUsernameInput(e.target.value);
  }

  const [usernameInput, setUsernameInput] = useState('');

  const fetchUsername = async () => {

    try {
      const response = await fetch('/api/githubUsername', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput }),
      });
      const result = await response.json();
      console.log(result);
    }
    catch (error) {
      console.error('Error fetching Github Data:', error);
    }
  };

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
  const [linkNameValue, setLinkNameValue] = useState('');


  const handleLinkInputChange = (event) => {

    setLinkInputValue(event.target.value);
  };

  const handleLinkNameChange = (event) => {

    setLinkNameValue(event.target.value);
  };

  const handleAddLink = () => {

    if (linkInputValue !== '' && linkNameValue !== '') {

      setLinks([...links, { name: linkNameValue, url: linkInputValue }]);
      setLinkInputValue('');
      setLinkNameValue('');
    }
  };

  const handleLinksDelete = (index) => {

    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);

  };

  const [value, setValue] = useState(80);

  return (
    <div className="Dashboard-container">
      <div className="Dashboard">
        <div className="Welcome">

          <span> <span id="emoji">👋</span>  Welcome back! </span>

          <div id="QOTD"> ~ Quote of the Day ~ </div>

          <div className="QOTD">
            <span>  {QOTDData ? `"${QOTDData.q}" - ${QOTDData.a}` : <Box sx={{ display: 'flex', padding: '10px' }}> <CircularProgress color="inherit" /> </Box>} </span>
          </div>
        </div>

        <div className="Dashboard-Item">

          <div className="Github-Stats-Input">
            <form onSubmit={handleGithubSubmit}>
              <span> Please enter your github account name in order to track these stats. </span>

              <input type="text"
                placeholder="Enter your account name"
                value={usernameInput}
                onChange={handleUsername}
                required
              />

              <button className="SubmitGithubName">  Connect to Github </button>

            </form>
          </div>

          <div className="github-stats">
            <div id="stat">
              <div id="commitNumber">

                <span id="statTitle"> <TimelineOutlinedIcon /> Contributions in the last Year </span>
                {/* <span id="statNumber"> {githubData ? JSON.stringify(githubDa) : "000"} Commits </span> */}

              </div>
            </div>

            <div id="stat">
              <div id="fork">

                <span id="statTitle"> <CallSplitIcon /> Total Forks </span>
                <span id="statNumber"> {githubData ? JSON.stringify(githubData.totalForks) : "000"} Forks</span>

              </div>
            </div>

            <div id="stat">
              <div id="LastEditedProject">

                <span id="statTitle"> <EqualizerOutlinedIcon /> Latest edited project </span>
                <span id="statNumber">{githubData?.latestProject?.name || "Loading..."} </span>

              </div>
            </div>
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
            <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
            </PushPinIcon>Useful Links</span>

            <div className="Controls">
              <div className="LinksName">
                <input
                  maxLength="30"
                  id="Input"
                  type="text"
                  placeholder="Enter the site's name:"
                  onChange={handleLinkNameChange}
                  value={linkNameValue}>
                </input>

                <div className="LinksInput">
                  <input
                    maxLength="2000"
                    minLength="5"
                    id="URLInput"
                    type="text"
                    placeholder="Add a website url"
                    onChange={handleLinkInputChange}
                    value={linkInputValue}>
                  </input>
                </div>
              </div>

              <div id="Notes-Buttons">
                <IconButton onClick={handleAddLink} > <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px', verticalAlign: 'middle' }}>  </AddIcon>  </IconButton>
              </div>

            </div>

            {/* Links container */}

            <div className="Notes-Container">
              {links.map((link, index) => (
                <div key={index} className="Notes-Content">
                  <Tooltip title="Click here to go to this website!" placement="bottom" >
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="Note">{link.name}</a>
                  </Tooltip>
                  <IconButton onClick={() => handleLinksDelete(index)}>
                    <CloseIcon id="Delete-links-button" sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px', verticalAlign: 'middle' }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>

          <div className="Dashboard-Item" id="Pinboard">
            <span>
              <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
              </PushPinIcon> Pinboard </span>
            <Text className="Note"> Placeholder Text</Text>

          </div>

          <div className="Dashboard-Item" id="Upcoming-Events">
            <span>
              <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
              </CalendarMonthIcon>Upcoming Events </span>

            <Text className="Note"> Placeholder Text</Text>
          </div>

          <div className="Dashboard-Item" id="Weather">
            <span>
              <CloudQueueIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
              </CloudQueueIcon> Weather </span>

            {/* <WeatherWidget /> */}

          </div>
        </div>

        <div className="Dashboard-Mid">
          <div className="Dashboard-Item" id="Notes">
            <span>
              <NotesIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}> </NotesIcon>
              Notes
            </span>
            <span> Add a note (Max 150 characters) </span> <br></br>
            <div className="Controls">
              <div className="Notes-input">
                <input id="Input"
                  maxLength="500"
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

            {notes.map((note, index) => (
              <div key={index} className="Notes-Content">
                <div className="Note">{note}</div>

                <IconButton>
                  <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px', verticalAlign: 'middle', color: '#1DB954', 'rotate(0deg)': 'rotate(90deg)' }}>
                  </PushPinIcon>
                </IconButton>

                <IconButton onClick={() => handleNoteDelete(index)} sx={{ Size: '14px' }}>
                  <CloseIcon id="Delete-links-button" sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px', fontSize: '14px', verticalAlign: 'middle' }}>
                  </CloseIcon>
                </IconButton>

              </div>
            ))}

          </div>

          <div className="Dashboard-Item" id="ToDo"> <span>
            <NotesIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
            </NotesIcon> Goal Tracker </span>
            <span className="GoalText">
              Enter below a goal to track.
              The global progress bar will fill up when you tick off items in the list.
              When you get to 100%, you've accomplished all your goals! </span>

            <div className="ringProgress">
              <RingProgress
                size='250'
                thickness='15'
                sections={[{ value, color: '#1DB954' }]}
                transitionDuration={250}
                label={<Text ta="center"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: '30px',
                  }}>
                  {value}%</Text>}

              />
            </div>

            <div className="Controls">
              <div className="Notes-input">
                <input id="Input" type="text" placeholder="Add a goal to track">

                </input>
              </div>

              <div id="Notes-Buttons">
                <IconButton > <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px', verticalAlign: 'middle' }}>  </AddIcon>  </IconButton>

              </div>
            </div>
          </div>

          <div className="Dashboard-Item" id="Calender"> <span>
            <CalendarMonthIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
            </CalendarMonthIcon> Calendar <Calendar
              styles={{
                calendarBase: {
                  width: '100%',
                  maxWidth: '600px',
                  margin: '0 auto',
                  padding: '10px'
                },
                day: {
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                },
              }} />

            <div className="Controls">
              <input id="Events-Input" type="text" placeholder="Add a note to event" /> <br></br>
            </div>

            <span> Pick a Date </span>
            <DatePicker />
            <span> Choose a Time </span> </span>
            <TimeInput styles={{
              maxWidth: '500px'
            }} />
            <button className="calenderButton" type='button'> Add Event To Calender <ArrowRightAltRoundedIcon sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center', verticalAlign: 'middle' }} /> </button>

          </div>
        </div>

        <div className="Dashboard-Bottom">
          <div className="Dashboard-Item" id="Habit-Tracker"> <span>
            <CalendarMonthIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
            </CalendarMonthIcon> Habit Tracker </span> </div>

          <div className="Dashboard-Item" id="Calorie-Tracker"> <span>
            <CalendarMonthIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
            </CalendarMonthIcon> Calorie Tracker </span> </div>

        </div>

      </div>
    </div >
  );
}

function Footer() {

  return (
    <div className="Footer">
      <span> Created by Daniel Steele </span>
      <span> Check out my other work </span>

      <span> Buy me a coffee </span>


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
              <Dashboard setLoggedIn={setLoggedIn} />
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
