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
import YoutubeIcon from '@mui/icons-material/YouTube';

import FigmaIcon from '@mui/icons-material/DesignServices';

import { SiLeetcode } from "react-icons/si";
import { IoLogoFigma } from "react-icons/io5";
import { BiLogoGmail } from "react-icons/bi";

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';

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

    const [links, setLinks] = useState(() => {

        // save links into users localstorage 
        const savedLinks = localStorage.getItem('links');
        return savedLinks ? JSON.parse(savedLinks) : [];

    });

    const [linkInputValue, setLinkInputValue] = useState('');
    const [linkNameValue, setLinkNameValue] = useState('');

    useEffect(() => {
        localStorage.setItem('links', JSON.stringify(links));
    }, [links]);

    const handleLinkInputChange = (event) => {

        setLinkInputValue(event.target.value);
    };

    const handleLinkNameChange = (event) => {

        setLinkNameValue(event.target.value);
    };


    const handleAddLink = () => {

        if (linkInputValue !== '' && linkNameValue !== '') {

            const newLink = {

                id: Date.now(),
                name: linkNameValue,
                url: linkInputValue,
                isPinned: false

            };

            setLinks([...links, newLink]);
            setLinkInputValue('');
            setLinkNameValue('');
        }
    };

    const handlePinnedLink = (index) => {

        const updatedLinks = links.map((link, i) => {

            if (i === index) {
                return {
                    ...link,
                    isPinned: !link.isPinned
                };
            }
            return link;

        });
        setLinks(updatedLinks);
    }

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

                {/* Hardcoded links - Will always remain for the users convienence */}

                <table className="hardcoded-links">
                    <tr>
                        <td>
                            <div className="Links-Content" id="youtube">
                                <YoutubeIcon sx={{ justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' }} />
                                <Tooltip title="Click here to go to this website!" placement="bottom" >
                                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="Link"> Youtube </a>
                                </Tooltip>
                            </div>
                        </td>

                        <td>
                            <div className="Links-Content" id="github">
                                <GithubIcon sx={{ justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' }} />
                                <Tooltip title="Click here to go to this website!" placement="bottom" >
                                    <a href="https://Github.com" target="_blank" rel="noopener noreferrer" className="Link"> Github </a>
                                </Tooltip>
                            </div>
                        </td>

                        <td>
                            <div className="Links-Content" id="gmail">
                                <BiLogoGmail style={{ justifyContent: 'center', fontSize: '25px', alignItems: 'center', verticalAlign: 'middle' }} />
                                <Tooltip title="Click here to go to this website!" placement="bottom" >
                                    <a href="https://mail.google.com" target="_blank" rel="noopener noreferrer" className="Link"> Gmail </a>
                                </Tooltip>
                            </div>
                        </td>

                        <td>
                            <div className="Links-Content" id="figma">
                                <IoLogoFigma style={{ justifyContent: 'center', fontSize: '20px', alignItems: 'center', verticalAlign: 'middle' }} />
                                <Tooltip title="Click here to go to this website!" placement="bottom" >
                                    <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="Link"> Figma </a>
                                </Tooltip>
                            </div>
                        </td>

                        <td>
                            <div className="Links-Content" id="leetcode">
                                <SiLeetcode style={{ justifyContent: 'center', fontSize: '20px', alignItems: 'center', verticalAlign: 'middle' }} />
                                <Tooltip title="Click here to go to this website!" placement="bottom" >
                                    <a href="https://leetcode.com" target="_blank" rel="noopener noreferrer" className="Link"> Leetcode </a>
                                </Tooltip>
                            </div>
                        </td>
                    </tr>
                </table>

                <table className="dynamic-links">
                    <tr>
                        {/* Links container */}

                        {links
                            .map((link, index) => (
                                <td key={index} className="Links-Content">
                                    <InsertLinkRoundedIcon />

                                    <Tooltip title="Click here to go to this website!" placement="bottom">
                                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="Link">{link.name}</a>
                                    </Tooltip>

                                    <IconButton onClick={() => handlePinnedLink(index)}>

                                        <PushPinIcon sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: '0px',
                                            verticalAlign: 'middle',
                                            transform: link.isPinned ? 'rotate(45deg)' : 'rotate(0deg)',
                                            color: link.isPinned ? '#1DB954' : ' #858d85'

                                        }}>
                                        </PushPinIcon>
                                    </IconButton>



                                    <IconButton onClick={() => handleLinksDelete(index)}>
                                        <CloseIcon id="Delete-links-button" sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px', verticalAlign: 'middle' }} />
                                    </IconButton>
                                </td>
                            ))}
                    </tr>
                </table>
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