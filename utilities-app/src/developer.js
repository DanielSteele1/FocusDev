import './App.css';
import './graphs.css';
import { useEffect, useRef, createContext } from "react";
import { useState } from "react";
import 'reactjs-popup/dist/index.css';

import GithubIcon from '@mui/icons-material/GitHub';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';

import Dialog from '@mui/material/Dialog';

import { HiOutlineCode } from "react-icons/hi";
import { GrCircleInformation } from "react-icons/gr";

import { LineChart } from '@mui/x-charts/LineChart';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { PiGithubLogo } from "react-icons/pi";

function Developer() {

    const data = [
        // feb 2025
        { "date": "2025-02-01", "count": 0 },
    ];

    //github API Frontend

    // retrieve github data from localStorage
    const [githubData, setGithubData] = useState(() => {

        const savedGithubData = localStorage.getItem('githubData');
        return savedGithubData ? JSON.parse(savedGithubData) : null;

    });

    const [contributionData, setContributionData] = useState(() => {

        const savedContributionData = localStorage.getItem('contributionData');
        return savedContributionData ? JSON.parse(savedContributionData) : null;

    });

    useEffect(() => {

        //save github data into localStorage
        localStorage.setItem('githubData', JSON.stringify(githubData));
        localStorage.setItem('contributionData', JSON.stringify(contributionData));

    }, [githubData, contributionData]);


    // this will fetch the users yearly contribution data

    const fetchContributionData = async () => {
        const api_url = `/api/githubContributions?username=${usernameInput}`;

        try {
            const response = await fetch(api_url, {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: usernameInput }), // sends the username to server endpoint

            });

            const contributionData = await response.json();
            const totalContributions = contributionData.totalContributions;
            const weeks = contributionData.weeks;

            setContributionData({
                totalContributions,
                weeks,
            });

            console.log('total contributions:', contributionData.totalContributions);
            console.log('Raw commits', contributionData.weeks);

        } catch (error) {
            console.error('Error fetching Github Data:', error);
        }
    };

    // this function is required in order to transform the data retreived by fetchContributionData. 
    // It will extract the contributionDays for each week retrieved,
    // then it will map each day into {day, count} - which is the format required by the heatmap calendar im using to display this data.
    // finally it will "flatten" the resulting arrays (getting rid of anything nested) into one single array.

    // we can then display this onto our calendar. 
    const transformContributionData = (weeks) => {
        if (!weeks) return [];

        return weeks.flatMap((week) =>
            week.contributionDays.map((day) => ({

                date: day.date,  // we want every date
                count: day.contributionCount, // and we want a single number for each day

            }))
        );
    };

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
        await fetchContributionData();
    }

    const handleUsername = async (e) => {
        await setUsernameInput(e.target.value);
    }

    const [usernameInput, setUsernameInput] = useState('');

    // send username to the server
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

    //dialog box for notes
    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    // timings for the calendar to update, so it shows only one year at any given time.
    const today = new Date(); //today
    const oneYearAgo = new Date(); //one year ago

    oneYearAgo.setFullYear(today.getFullYear() - 1); //subtract a year from today

    return (
        <div className="Developer-container">
            <div className="Developer">
                <div className="Developer-Item">
                    <div className="Item-title">
                        <div className="Item-Icon">
                            <PiGithubLogo
                                style={{ justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', fontSize: '30px', marginRight: '10px', color: '#4ade80' }}>
                            </PiGithubLogo>
                            <span> Your Github Stats </span>
                        </div>
                    </div>

                    <div className="github-login">
                        <span className="tip-highlight">
                            <GrCircleInformation
                                style={{
                                    fontSize: '20px',
                                    marginRight: '10px',
                                    color: '#1DB954',
                                    verticalAlign: 'middle'

                                }} /> Please enter your github account name below in order to track these stats. </span>
                        <form className="Github-Stats-Input" onSubmit={handleGithubSubmit}>

                            <input type="text"
                                placeholder="Enter your account name"
                                value={usernameInput}
                                onChange={handleUsername}
                                required
                            />
                            <button className="SubmitGithubName"> <GithubIcon sx={{
                                display: 'flex', marginRight: '5px'
                            }}> </GithubIcon> Retrieve Github Data  </button>
                        </form>
                    </div>

                    <div className="github-stats">
                        <div id="stat">
                            <div id="commitNumber">
                                <span id="statTitle"> <TimelineOutlinedIcon sx={{ display: 'flex', marginRight: '5px' }} /> Total Contributions </span>
                                {<span id="statNumber"> {contributionData ? JSON.stringify(contributionData.totalContributions) : "000"} Commits </span>}

                            </div>
                        </div>

                        <div id="stat">
                            <div id="fork">

                                <span id="statTitle"> <CallSplitIcon sx={{ display: 'flex', marginRight: '5px' }} /> Total Forks </span>
                                <span id="statNumber"> {githubData ? JSON.stringify(githubData.totalForks) : "000"} Forks</span>

                            </div>
                        </div>

                        <div id="stat">
                            <div id="LastEditedProject">

                                <span id="statTitle"> <EqualizerOutlinedIcon sx={{ display: 'flex', marginRight: '5px' }} /> Latest edited project </span>
                                <span id="statNumber">{githubData?.latestProject?.name || "Enter account to see data"} </span>

                            </div>
                        </div>
                    </div>

                    <CalendarHeatmap
                        startDate={oneYearAgo}
                        endDate={today}
                        values={contributionData ? transformContributionData(contributionData.weeks) : data}
                        classForValue={(value) => {

                            if (!value || value.count === 0) {
                                return 'color-empty';
                            }
                            if (value.count <= 2) {
                                return 'color-scale-1';
                            }
                            if (value.count <= 4) {
                                return 'color-scale-2';
                            }
                            if (value.count <= 6) {
                                return 'color-scale-3';
                            }
                            return 'color-scale-4';

                        }}
                        gutterSize={0}

                    />

                </div>

                <div className="Developer-Item" id="developer-notepad">

                    {/* This area is designated for the reusable code snippet feature. 
                       A better name is needed but the idea is that users can save common bits of code here to use later. 
                       Labels and a Title can be added to each entry in order to clearly see what each one is for, 
                       and crucially, a one click copy button is needed. There should be a generous cap on how many a user can have saved at once, 
                       but generally, around 10 is pretty good. All this should be a popout window, as there's not enough room on the dashboard itself. 
                       
                    */ }
                    <div className="Item-title">
                        <div className="Item-Icon">
                            <HiOutlineCode style={{
                                justifyContent: 'center',
                                fontSize: '30px',
                                alignItems: 'center',
                                verticalAlign: 'middle',
                                marginRight: '10px',
                                color: '#4ade80'

                            }} />
                            <span> Reusable Code Snippets </span>
                        </div>
                    </div>

                    <div className="Dialog-button" onClick={handleOpenDialog}> <span> Add a code snippet </span> </div>

                    <Dialog
                        PaperProps={{
                            style: {
                                backgroundColor: "transparent",
                                boxShadow: "none"
                            },
                        }}
                        open={open}
                        onClose={handleCloseDialog}
                    >
                        <div className="code-snippet-dialog">

                            <div className="section-title"> Snippet Clipboard - Create a Code Snippet </div>
                            <div className="description" id="dialog-text"> Add a title, tag & enter the code snippet, then click save. You can add up to 10 snippets at once. </div>

                            <div className="section-title"> <span> Title: </span>  </div>
                            <input className="dialog-input" id="snippet-title" />

                            <div className="section-title"> <span> Tag: </span> </div>
                            <input className="dialog-input" id="snippet-tag" />

                            <div className="section-title"> <span> Code Snippet: </span> </div>
                            <code className="dialog-input" id="snippet-code" />

                            <button className="Dialog-button"> <span> Save Snippet </span> </button>

                        </div>
                    </Dialog>

                    <span className="description"> Use the same boilerplate code snippets over and over?
                        Here, you can save your snippets into one location for ease of access!
                    </span>

                    <span className="description">
                        You can give each snippet a title and label, and there's a one click copy button, so you can just copy/paste in and out of this widget.
                    </span>


                    <span className="description">
                        Currently this feature is WIP but the idea is to have one central area
                    </span>

                </div>
            </div>
        </div>
    );
}

export default Developer;