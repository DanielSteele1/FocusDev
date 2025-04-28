import './App.css';
import './accounts.css';
import React from "react";
import { useState } from "react";

import 'cal-heatmap/cal-heatmap.css';
import { CgProfile } from "react-icons/cg";

import Dialog from '@mui/material/Dialog';


function DeleteAccount() {

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
            <span className="description"> This action cannot be undone. </span>

            <button className="delete-account-real">
              <p1> Yes, Delete my account </p1>
            </button>

          </div>
        </div>
      </Dialog>
    </div>
  );
}


function Profile({ handleLogoutClick }) {

  return (
    <div className="Dashboard-container">

      <div className="Profile-Item">
        <div className="Profile">
          <div className="Profile-header">

            <div className="header-left">
              <div className="Profile-title">
                <CgProfile style={{ fontSize: '40px', display: 'flex', margin: '10px' }} />
                <span>Your Profile  </span>
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

          <DeleteAccount />

        </div>

      </div>

    </div >
  );
}

export default Profile;