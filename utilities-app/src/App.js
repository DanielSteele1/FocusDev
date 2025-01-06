
import './App.css';

import NotesIcon from '@mui/icons-material/Notes';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import PushPinIcon from '@mui/icons-material/PushPin';
import AddLinkIcon from '@mui/icons-material/AddLink';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GithubIcon from '@mui/icons-material/GitHub';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import CloseIcon from '@mui/icons-material/Close';

import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';



function Navigation() {

  return (
    <div className="Navigation">

      <div className="Navigation-Logo"> Logo </div>
      <div className="Navigation-Logo"> <span>Application Name</span> </div>


      <div className="Nav-Menu">

        <div className="Navigation-Item"> <span> <NightsStayIcon> </NightsStayIcon> </span> </div>
        <div className="Navigation-Item"> <span> <AccessTimeIcon> </AccessTimeIcon> Time and Date </span> </div>
      </div> 
    </div>
  );

}


function Dashboard() {

  return (
    <div className="Dashboard-container">

      <div className="Dashboard">

        <div className="Dashboard-Top">
          <div className="Dashboard-Item" id="Useful-Links"> <span> <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </PushPinIcon>Useful Links </span> </div>
          <div className="Dashboard-Item" id="Upcoming-Events"> <span> <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CalendarMonthIcon>Upcoming Events </span> </div>
          <div className="Dashboard-Item" id="Weather"> <span> <CloudQueueIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CloudQueueIcon> Weather </span> </div>
          <div className="Dashboard-Item" id="Pinboard"> <span> <PushPinIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </PushPinIcon> Pinboard </span> </div>

        </div>

        <div className="Dashboard-Mid">
          <div className="Dashboard-Item" id="Notes"> <span> <NotesIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </NotesIcon> Notes </span> </div>
          <div className="Dashboard-Item" id="ToDo"> <span> <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CalendarMonthIcon> To Do </span> </div>
          <div className="Dashboard-Item" id="Calender"> <span> <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CalendarMonthIcon> Calender </span> </div>
        </div>

        <div className="Dashboard-Bottom">
        <div className="Dashboard-Item" id="Habit-Tracker"> <span> <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CalendarMonthIcon> Habit Tracker </span> </div>
          <div className="Dashboard-Item" id="Calorie-Tracker"> <span>  <CalendarMonthIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </CalendarMonthIcon> Calorie Tracker </span> </div>

        <div className="Dashboard-Item" id="Github-Commit-Graph"> <span> <GithubIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '5px' }}> </GithubIcon> Github Commit Graph </span> </div>
        </div>


      </div>
    </div>
  );

}


function Footer() {


  return (
    <div className="Footer">
      < h1> Footer </h1>

    </div>
  );

}


function App() {
  return (
    <div className="App">

      <Navigation />

      <Dashboard />

      <Footer />

    </div>
  );
}

export default App;
