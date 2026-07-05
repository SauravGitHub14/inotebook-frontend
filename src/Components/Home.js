import '../css/home.css';
import React from 'react';
import Login from './Login';
import Notes from './Notes';
// import AddNote from './AddNote';

const Home = () => {

    const token = localStorage.getItem("token");

    return (
        <div className="home-container">

            {token ? (

                // User is logged in
                <div className="notes-container">
                    <Notes />
                </div>

            ) : (

                // User is not logged in
                <div className="content-container">

                    <div className="welcome-content">

                        <h1>Welcome to iNoteBook</h1>

                        <p>
                            Organize your notes securely from anywhere.
                            Create, edit and manage your personal notes with
                            lightning-fast performance and JWT authentication.
                        </p>

                        <ul className="feature-list">
                            <li>Create unlimited notes</li>
                            <li>Edit & Delete anytime</li>
                            <li>Secure JWT Authentication</li>
                            <li>Access anywhere</li>
                        </ul>

                    </div>

                    <div className="login-content">
                        <Login />
                    </div>

                </div>

            )}

        </div>
    );
};

export default Home;