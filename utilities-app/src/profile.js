import './App.css';
import './accounts.css';
import React, { useEffect, useRef, createContext, OnSubmit } from "react";
import { useState } from "react";

import 'cal-heatmap/cal-heatmap.css';
import { CgProfile } from "react-icons/cg";


function Profile() {

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
                  log out, view your passoword, or delete your account. </span>
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