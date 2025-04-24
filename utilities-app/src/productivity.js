import './App.css';
import { useEffect, useRef, createContext } from "react";
import { useState } from "react";
import 'reactjs-popup/dist/index.css';

import PushPinIcon from '@mui/icons-material/PushPin';
import GithubIcon from '@mui/icons-material/GitHub';
import YoutubeIcon from '@mui/icons-material/YouTube';

import { SiLeetcode } from "react-icons/si";
import { IoLogoFigma } from "react-icons/io5";
import { BiLogoGmail } from "react-icons/bi";

import { GoGoal } from "react-icons/go";
import { SlCalender } from "react-icons/sl";
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { CiLink } from "react-icons/ci";

import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';
import CloseIcon from '@mui/icons-material/Close';

import { MantineProvider, Button, Text } from '@mantine/core';
import { Calendar } from '@mantine/dates';
import { BsCalendar2RangeFill } from "react-icons/bs";

import { DatePicker } from '@mantine/dates';
import { TimeInput } from '@mantine/dates';
//import { DatesProvider } from '@mantine/dates';
import { Checkbox } from '@mantine/core';
import { RingProgress } from '@mantine/core';
import Tooltip from '@mui/material/Tooltip';

import { IoSparkles } from "react-icons/io5";

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

    // default value of the progress bar
    const [value, setValue] = useState(0);

    const [goals, setGoals] = useState(() => {

        // save links into users localstorage 
        const savedGoals = localStorage.getItem('goals');
        return savedGoals ? JSON.parse(savedGoals) : [];

    });

    useEffect(() => {
        localStorage.setItem('goals', JSON.stringify(goals));
    }, [goals]);

    const [goalValue, setGoalValue] = useState('');

    const handleGoalChange = (event) => {
        setGoalValue(event.target.value);
    }

    const handleAddGoals = () => {

        if (goalValue !== '') {

            const newGoal = {

                id: Date.now(),
                text: goalValue,
                isCompleted: false
            };

            setGoals([...goals, newGoal]);
            setGoalValue('');

        }
    };

    // each goal will have a weight attributed to it, 
    // calculated based on the total number of goals. 
    // for example if there are 2 goals, each one should wheigh 50%. 
    // When the user tick a goal off, This will then be added to a global counter, and displayed to the UI.

    const handleGoalComplete = (index) => {


    }

    const handleGoalsDelete = (index) => {

        const newGoals = goals.filter((_, i) => i !== index);
        setGoals(newGoals);

    }

    return (

        <div className="Productivity">

            <div className="Productivity-Item" id="Useful-Links">

                <div className="Item-title">
                    <div className="Item-Icon">
                        <CiLink style={{ justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', fontSize: '30px', marginRight: '10px' }}>
                        </CiLink>

                        <span> Quick Links </span>

                    </div>
                </div>

                <span className="description"> For your convenience, here are some handy links. You can also create your own links if you wish,
                    and you can pin them to the pinned tab in the homepage. </span>

                  <span className="tip-highlight">
                    <IoSparkles
                        style={{
                            fontSize: '20px',
                            marginRight: '10px',
                            color: '#1DB954',
                            verticalAlign: 'middle'

                        }} />

                    Link doesn't work ? make sure you typed in the url correctly, and include ' https:// ' at the start. </span>

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
                        <IconButton onClick={handleAddLink} ><AddIcon sx={{ justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' }}>  </AddIcon>  </IconButton>
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
                                        <CloseIcon id="Delete-links-button" sx={{ justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' }} />
                                    </IconButton>
                                </td>
                            ))}
                    </tr>
                </table>
            </div>

            <div className="Dashboard-Main">

                <div className="Productivity-Item" id="Calender">

                    <div className="Item-title">
                        <div className="Item-Icon">
                            <BsCalendar2RangeFill
                                style={{ fontSize: '30px', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', marginRight: '10px' }}>
                            </BsCalendar2RangeFill>
                            <span> Calendar </span>
                        </div>
                    </div>

                    <span className="description"> This calendar allows you to schedule certain tasks.
                        You can select a date, time & add a note to each event.
                        These will then be displayed on the homepage. </span>

                    <Calendar
                        styles={{
                            calendarBase: {
                                width: '100%',
                                margin: '0 auto',
                            },
                            day: {
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                            },
                        }} />

                    <span className="description">Pick a date, time and note for your event: </span>

                    <div className="Controls">
                        <input id="Events-Input" type="text" placeholder="Add a note to event" /> <br></br>
                    </div>

                    <div className="EventDateTime">

                        <DatePicker sx={{
                            display: 'flex', justifyContent: 'flex-start', alignItem: 'center', verticalAlign: 'middle', margin: '5px'
                        }} />

                        <TimeInput sx={{
                            display: 'flex', justifyContent: 'flex-start', alignItem: 'center', verticalAlign: 'middle', margin: '5px'
                        }} />

                    </div>
                    <button className="calenderButton" type='button'> <AddIcon sx={{ display: 'flex', justifyContent: 'center', alignItem: 'center', verticalAlign: 'middle', marginRight: '5px' }} />Add Event  </button>
                </div>

                <div className="Productivity-Item" id="ToDo">

                    <div className="Item-title">
                        <div className="Item-Icon">
                            <GoGoal
                                style={{ fontSize: '30px', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', marginRight: '10px' }}>
                            </GoGoal>
                            <span> Goal Tracker </span>
                        </div>
                    </div>

                    <span className="description">
                        Enter below a goal to track.
                        The global progress bar will fill up when you tick off items in the list.
                        When you get to 100%, you've accomplished all your goals! </span>

                    <div className="ringProgress">
                        <RingProgress
                            size='200'
                            thickness='15'
                            sections={[{ value, color: '#1DB954' }]}
                            roundCaps
                            animated={true}
                            transitionDuration={200}
                            label={<Text ta="center"
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%',
                                    fontSize: '25px',

                                }}>
                                {value}%</Text>}
                        />
                    </div>

                    <Button onClick={() => setValue(Math.round(Math.random() * 100))} mt="md">
                        Set a random value to test
                    </Button>

                    <div className="Controls">
                        <div className="Notes-input">
                            <input id="Input" type="text" placeholder="Add a goal to track"
                                onChange={handleGoalChange}
                                value={goalValue}
                            >
                            </input>
                        </div>

                        <div id="Notes-Buttons">
                            <IconButton onClick={() => handleAddGoals(goals)}>
                                <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px', verticalAlign: 'middle' }}>
                                </AddIcon>
                            </IconButton>

                        </div>
                    </div>

                    <div className="Goal-Container">
                        <table className="Goals">
                            <tr>
                                {goals
                                    .map((goal, index) => (

                                        <td key={index} className="Goal-Content">

                                            <div className="goalText">
                                                <span>{goal.text}</span>
                                            </div>

                                            <div className="goalControls">

                                                <div className="goalCheck">
                                                    <IconButton>
                                                        <Checkbox onClick={() => handleGoalComplete(index)}
                                                            sx={{
                                                                size: 'medium',
                                                                justifyContent: 'center',
                                                                color: '#1DB954',
                                                                align: 'center',
                                                                cursor: 'pointer',
                                                                margin: '10'

                                                            }}
                                                        />
                                                    </IconButton>
                                                </div>

                                                <div className="delete-goal">
                                                    <IconButton onClick={() => handleGoalsDelete(index)}>
                                                        <CloseIcon id="Delete-links-button" sx={{ justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle' }} />
                                                    </IconButton>
                                                </div>
                                            </div>

                                        </td>
                                    ))}
                            </tr>
                        </table>
                    </div>

                </div>
            </div>


        </div>

    );

}

export default Productivity;