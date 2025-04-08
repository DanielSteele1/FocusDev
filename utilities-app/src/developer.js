import './App.css';
import { useEffect, useRef, createContext } from "react";
import { useState } from "react";
import 'reactjs-popup/dist/index.css';

import GithubIcon from '@mui/icons-material/GitHub';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import CalHeatmap from 'cal-heatmap';
import 'cal-heatmap/cal-heatmap.css';
import Legend from 'cal-heatmap/plugins/Legend';
import Dialog from '@mui/material/Dialog';

import { FaCode } from "react-icons/fa6";
import { GrCircleInformation } from "react-icons/gr";

import { LineChart } from '@mui/x-charts/LineChart';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

function Developer() {

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

    const calRef = useRef(null);
    useEffect(() => {

        if (!calRef.current) {
            const cal = new CalHeatmap();

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
                    width: 13,
                    height: 13,
                    padding: [0, 0, 0, 0],
                    margin: [3, 3, 3, 3],
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
                    label: 'Commit Frequency: 0 - 30+, grey squares indicate 0 commits, white squares indicate 0 commits or data thats yet to be recorded.',
                    width: '600',
                    height: '0',

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

                                }} /> Please enter your github account name in order to track these stats. </span>
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

                        
                    />


                    <div id="cal-heatmap"> </div>

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