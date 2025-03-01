import './App.css';
import { useEffect, useRef, createContext } from "react";
import { useState } from "react";
import 'reactjs-popup/dist/index.css';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ArrowRightAltRoundedIcon from '@mui/icons-material/ArrowRightAltRounded';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
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
import CodeIcon from '@mui/icons-material/Code';
import DescriptionIcon from '@mui/icons-material/Description';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import CloseIcon from '@mui/icons-material/Close';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import { MantineProvider, Button, Text } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { DatePicker } from '@mantine/dates';
import { TimeInput } from '@mantine/dates';
//import { DatesProvider } from '@mantine/dates';
import CircularProgress from '@mui/material/CircularProgress';
import { RingProgress } from '@mantine/core';
import Tooltip from '@mui/material/Tooltip';
import EmojiPicker from 'emoji-picker-react';
import PersonIcon from '@mui/icons-material/Person';

import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import SampleData from './api/sampleData.json';
import Legend from 'cal-heatmap/plugins/Legend';

function Developer() {

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
  
    return (
      <div className="Developer">
        <div className="Dashboard-Item">
  
          <span className="github-title">
            <GithubIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
            </GithubIcon>
            <br></br>
            <span>Github Commit Graph </span>
          </span>
  
          <div className="Github-Stats-Input">
            <form onSubmit={handleGithubSubmit}>
              <span> Please enter your github account name in order to track these stats. </span>
  
              <input type="text"
                placeholder="Enter your account name"
                value={usernameInput}
                onChange={handleUsername}
                required
              />
  
              <button className="SubmitGithubName"> <GithubIcon> </GithubIcon> Login with Github  </button>
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
  
          <span className="github-title">
            <GithubIcon
              sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '10px' }}>
            </GithubIcon>
            <br></br>
            <span>Github Commit Graph </span>
          </span>
  
          <div id="cal-heatmap"> </div>
  
        </div>
      </div>
    );
  
  }

export default Developer;