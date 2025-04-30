import './App.css';
import './accounts.css';
import React from "react";
import { useState } from "react";

import 'cal-heatmap/cal-heatmap.css';
import { CgProfile } from "react-icons/cg";

import Dialog from '@mui/material/Dialog';

function DeleteAccount({setLoggedIn}) {

  const handleDeleteAccount = async () => {

      const response = await fetch('/delete', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body:
          JSON.stringify({}),

      });

      if(response.ok){
      setLoggedIn(false);
      alert("Account deleted successfully. You will be redirected to the welcome screen.");
      console.log("Account deleted successfully.");

      }
      else {
        const data = await response.json();
        alert(data.message || "Error deleting account. Please try again later.");
      }
  }

  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {

    setOpen(true);
  }

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <div>
      <button className="delete-account" onClick={handleOpenDialog}>
        <p1> Delete Account </p1>
      </button>

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

        <div className="delete-account-dialog">

          <div className="dialog">
            <span className="section-title"> Are you sure you want to delete your account? </span>
            <span className="description"> This action cannot be undone. All data will be lost. </span>

            <div className="delete-account-dialog-buttons" >
              <button className="delete-account-real" onClick={handleDeleteAccount}>
                <p1> Yes, Delete my account </p1>
              </button>

              <button className="Keep-account" onClick={handleCloseDialog}>
                <p1> No, Keep my account </p1>
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

function Profile({ handleLogoutClick, setLoggedIn }) {

  return (
    <div className="Dashboard-container">

      <div className="Profile-Item">
        <div className="Profile">
          <div className="Profile-header">

            <div className="header-left">
              <div className="Item-title">
                <div className="Item-icon">
                </div>
              </div>

              <div className="Item-title">
                <div className="Item-Icon">
                  <CgProfile style={{ fontSize: '40px', display: 'flex', margin: '10px' }} />
                  <span>Your Profile  </span>
                </div>
              </div>
              <div className="Profile-desc">
                <span className="description"> This is your account profile. Here you can add a photo,
                  log out, view your password, or delete your account. </span>
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

          <span className="description"> Log out of your account. You'll be redirected to the welcome screen, where you can re-log into your account. </span>

          <button className="AccountsButton"
            onClick={handleLogoutClick}>
            <span> Log out </span>
          </button>

          <span className="description"> The button below will delete your account and any data tied to it. Make sure you're certain about deleting it before pressing the button. </span>

          <DeleteAccount setLoggedIn={setLoggedIn}/>

        </div>

      </div>

    </div >
  );
}

export default Profile;