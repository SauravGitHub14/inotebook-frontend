// src/About.js
import React from 'react';
import '../css/About.css'; // Make sure to create and link the About.css file

function About() {
  return (
    <div className="about-container">
      <h1 className="animated-title">About This App</h1>
      <p className="animated-paragraph">
        Welcome to the Note Taking Application! This app allows you to create, view, edit, and delete your notes effortlessly. Whether you need to jot down quick reminders, detailed plans, or random thoughts, this app is here to help you stay organized.
      </p>
      <h2 className="animated-subtitle">Features</h2>
      <ul className="animated-list">
        <li>Create new notes with ease</li>
        <li>Edit existing notes to keep them up to date</li>
        <li>Delete notes you no longer need</li>
        <li>Search through your notes for quick access</li>
        <li>Responsive design for use on any device</li>
      </ul>
      <h2 className="animated-subtitle">Technologies Used</h2>
      <p className="animated-paragraph">This application is built using the following technologies:</p>
      <ul className="animated-list">
        <li>React - A JavaScript library for building user interfaces</li>
        <li>React Router - For handling navigation</li>
        <li>CSS - For styling the application</li>
        <li>Local Storage - For persisting notes data</li>
      </ul>
    </div>
  );
};

export default About;
