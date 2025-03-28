import './App.css';
import './accounts.css';
import React, { useEffect, useRef, createContext, OnSubmit } from "react";
import { useState } from "react";

//import WeatherWidget from './Weather';
import Accounts from './accounts';

import NotesIcon from '@mui/icons-material/Notes';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import PushPinOutlineIcon from '@mui/icons-material/PushPinOutlined';
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


function Profile() {

  return (
    <div className="Dashboard-container">

      <div className="Profile-Item">
        <div className="Profile">
          <div className="Profile-header">

            <div className="header-left">
              <div className="Profile-title">
                <PersonIcon sx={{ fontSize: '40px', display: 'flex', margin: '5px' }} />
                <span>Your Profile  </span>
              </div>
              <div className="Profile-desc">
                <span className="description"> This is your profile. Here you can add a photo,
                  log out, change your password or delete your account. </span>
              </div>
            </div>

            <div className="header-right">
              <div className="Profile-img">
                <img src="/cool_ass_brook.png"
                  alt="profile avatar" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="Profile-Item">
        <div className="Profile-operations">

          <span className="description"> Log out of your account. </span>

          <button className="AccountsButton">
            <p1> Log out </p1>
          </button>

          <span className="description"> Are you sure you want to delete your account? this action cannot be undone. </span>

          <button className="delete-account">
            <p1> Delete Account </p1>
          </button>
        </div>

      </div>

    </div >
  );
}

export default Profile;