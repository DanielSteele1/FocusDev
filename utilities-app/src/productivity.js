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

function Productivity() {
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

        <div className="Productivity">


            <div className="Productivity-Item" id="Useful-Links"> <span>
                <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px', verticalAlign: 'middle' }}>
                </PushPinIcon>Useful Links</span>

                <div className="Links-Controls">
                    <div className="LinksName">
                        <input
                            maxLength="30"
                            id="LinkNameInput"
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

            <div className="Dashboard-Main">

                <div className="Productivity-Item" id="Calender"> <span>
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

                <div className="Productivity-Item" id="ToDo"> <span>
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
            </div>


        </div>

    );
}

export default Productivity;