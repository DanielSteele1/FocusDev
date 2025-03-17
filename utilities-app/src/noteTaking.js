import './App.css';
import React, { useEffect, useRef, createContext, OnSubmit } from "react";
import { useState } from "react";

//import WeatherWidget from './Weather';

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
import DescriptionIcon from '@mui/icons-material/ArticleOutlined';

import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

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

function NoteTaking() {

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

    return (
        <div className="NoteTaking-container">
            <div className="NoteTaking">
                <div className="NoteTaking-Item" id="NoteInput">

                    <div className="Item-title">
                        <div className="Item-Icon">
                            <DescriptionIcon sx={{ justifyContent: 'center', alignItems: 'center', margin: '0px', verticalAlign: 'middle' }} /> </div> <span> Note Taking </span>
                    </div>

                    <span> Enter in text below in order to add a note.  (Max 150 characters). </span>
                    <div className="Controls">
                        <div className="Notes-input">
                            <textarea id="Input"
                                contenteditable="true"
                                maxLength="500"
                                type="text"
                                placeholder="Add a note"
                                onChange={handleInputChange}
                                value={inputValue}>
                            </textarea>
                        </div>

                        <div id="Notes-Buttons">
                            <IconButton onClick={handleAddNote}> <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px' }}>  </AddIcon>  </IconButton>
                        </div>
                    </div>

                </div>

                <div className="NoteTaking-Item" id="NoteContainer">

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
            </div>
        </div>
    );

}

export default NoteTaking;