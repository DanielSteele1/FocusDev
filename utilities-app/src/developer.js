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

import { FaCode } from "react-icons/fa6";
import { GrCircleInformation } from "react-icons/gr";

import { LineChart } from '@mui/x-charts/LineChart';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function Developer() {

    const data = [
        // feb 2025
        { "date": "2025-02-01", "count": 5 },
        { "date": "2025-02-02", "count": 12 },
        { "date": "2025-02-03", "count": 8 },
        { "date": "2025-02-04", "count": 14 },
        { "date": "2025-02-05", "count": 3 },
        { "date": "2025-02-06", "count": 9 },
        { "date": "2025-02-07", "count": 2 },
        { "date": "2025-02-08", "count": 16 },
        { "date": "2025-02-09", "count": 7 },
        { "date": "2025-02-10", "count": 11 },
        { "date": "2025-02-11", "count": 4 },
        { "date": "2025-02-12", "count": 18 },
        { "date": "2025-02-13", "count": 1 },
        { "date": "2025-02-14", "count": 20 },
        { "date": "2025-02-15", "count": 6 },
        { "date": "2025-02-16", "count": 9 },
        { "date": "2025-02-17", "count": 3 },
        { "date": "2025-02-18", "count": 13 },
        { "date": "2025-02-19", "count": 15 },
        { "date": "2025-02-20", "count": 2 },
        { "date": "2025-02-21", "count": 17 },
        { "date": "2025-02-22", "count": 10 },
        { "date": "2025-02-23", "count": 8 },
        { "date": "2025-02-24", "count": 14 },
        { "date": "2025-02-25", "count": 5 },
        { "date": "2025-02-26", "count": 11 },
        { "date": "2025-02-27", "count": 7 },
        { "date": "2025-02-28", "count": 19 },
    
        // March 2025
        { "date": "2025-03-01", "count": 4 },
        { "date": "2025-03-02", "count": 8 },
        { "date": "2025-03-03", "count": 12 },
        { "date": "2025-03-04", "count": 6 },
        { "date": "2025-03-05", "count": 15 },
        { "date": "2025-03-06", "count": 3 },
        { "date": "2025-03-07", "count": 18 },
        { "date": "2025-03-08", "count": 9 },
        { "date": "2025-03-09", "count": 7 },
        { "date": "2025-03-10", "count": 14 },
        { "date": "2025-03-11", "count": 5 },
        { "date": "2025-03-12", "count": 20 },
        { "date": "2025-03-13", "count": 8 },
        { "date": "2025-03-14", "count": 13 },
        { "date": "2025-03-15", "count": 2 },
        { "date": "2025-03-16", "count": 11 },
        { "date": "2025-03-17", "count": 6 },
        { "date": "2025-03-18", "count": 16 },
        { "date": "2025-03-19", "count": 3 },
        { "date": "2025-03-20", "count": 9 },
        { "date": "2025-03-21", "count": 4 },
        { "date": "2025-03-22", "count": 17 },
        { "date": "2025-03-23", "count": 12 },
        { "date": "2025-03-24", "count": 7 },
        { "date": "2025-03-25", "count": 19 },
        { "date": "2025-03-26", "count": 5 },
        { "date": "2025-03-27", "count": 10 },
        { "date": "2025-03-28", "count": 8 },
        { "date": "2025-03-29", "count": 13 },
        { "date": "2025-03-30", "count": 6 },
        { "date": "2025-03-31", "count": 15 },
        { "date": "2025-04-01", "count": 3 },
        { "date": "2025-04-02", "count": 7 },
        { "date": "2025-04-03", "count": 12 },
        { "date": "2025-04-04", "count": 0 },
        { "date": "2025-04-05", "count": 5 },
        { "date": "2025-04-06", "count": 8 },
        { "date": "2025-04-07", "count": 15 },
        { "date": "2025-04-08", "count": 4 },
        { "date": "2025-04-09", "count": 2 },
        { "date": "2025-04-10", "count": 9 },
        { "date": "2025-04-11", "count": 0 },
        { "date": "2025-04-12", "count": 18 },
        { "date": "2025-04-13", "count": 6 },
        { "date": "2025-04-14", "count": 13 },
        { "date": "2025-04-15", "count": 20 },
        { "date": "2025-04-16", "count": 0 },
        { "date": "2025-04-17", "count": 11 },
        { "date": "2025-04-18", "count": 3 },
        { "date": "2025-04-19", "count": 9 },
        { "date": "2025-04-20", "count": 14 },
        { "date": "2025-04-21", "count": 1 },
        { "date": "2025-04-22", "count": 7 },
        { "date": "2025-04-23", "count": 16 },
        { "date": "2025-04-24", "count": 12 },
        { "date": "2025-04-25", "count": 4 },
        { "date": "2025-04-26", "count": 19 },
        { "date": "2025-04-27", "count": 2 },
        { "date": "2025-04-28", "count": 10 },
        { "date": "2025-04-29", "count": 6 },
        { "date": "2025-04-30", "count": 22 },

      ];

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

    //dialog box for notes
    const [open, setOpen] = useState(false);

    const handleCloseDialog = () => {
        setOpen(false);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };

    return (
        <div className="Developer-container">
            <div className="Developer">
                <div className="Developer-Item">
                    <div className="Item-title">
                        <div className="Item-Icon">
                            <GithubIcon
                                sx={{ justifyContent: 'center', alignItems: 'center' }}>
                            </GithubIcon>
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
                            <button className="SubmitGithubName"> <GithubIcon sx={{ display: 'flex', marginRight: '5px' }}> </GithubIcon> Connect with Github  </button>
                        </form>
                    </div>

                    <div className="github-stats">
                        <div id="stat">
                            <div id="commitNumber">
                                <span id="statTitle"> <TimelineOutlinedIcon sx={{ display: 'flex', marginRight: '5px' }} /> Contributions in the last Year </span>
                                {<span id="statNumber"> {githubData ? JSON.stringify(githubData.contributions) : "000"} Commits </span>}

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
                                <span id="statNumber">{githubData?.latestProject?.name || "Log in to see Data"} </span>

                            </div>
                        </div>
                    </div>

                    <LineChart
                   
                        xAxis={[{ data: [1, 10, 20, 30, 40, 50, 60, 60, 70, 80, 90, 100] }]}
                        series={[
                            {
                                data: [2, 5.5, 2, 8.5, 1.5, 5, 2, 5.5, 2, 8.5, 1.5, 5],
                                color: '#1DB954',
                            },
                        ]}
                        width={900}
                        height={300}
                    />

                    <CalendarHeatmap
                        startDate={new Date('2025-01-01')}
                        endDate={new Date('2025-12-31')}
                        values={data}
                        classForValue={(value) => {

                            if(!value || value.count === 0) {
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
                            <FaCode style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: '30px',
                                verticalAlign: 'middle'
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