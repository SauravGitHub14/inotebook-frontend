import React, { useContext, useEffect } from "react";
import "../css/dashboard.css";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const context = useContext(noteContext);

    const { notes, getNotes } = context;

    useEffect(() => {
        if (localStorage.getItem("token")) {
            getNotes();
        } else {
            navigate("/login");
        }
        
    }, [getNotes, navigate]);

    const totalTags = new Set(notes.map(note => note.tag)).size;

    const today = new Date();

    const currentHour = today.getHours();

    let greeting = "Good Evening 🌙";

    if (currentHour < 12) {

        greeting = "Good Morning ☀";

    } else if (currentHour < 18) {

        greeting = "Good Afternoon 🌤";

    }

    return (

        <div className="dashboard-container">

            <div className="dashboard-header">

                <h1>{greeting}</h1>

                <p>Welcome to your iNotebook Dashboard</p>

            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <h2>📝</h2>

                    <h3>{notes.length}</h3>

                    <p>Total Notes</p>

                </div>

                <div className="dashboard-card">

                    <h2>🏷️</h2>

                    <h3>{totalTags}</h3>

                    <p>Total Tags</p>

                </div>

                <div
                    className="dashboard-card clickable"
                    onClick={() => navigate("/notes")}
                >

                    <h2>📒</h2>

                    <h3>Manage</h3>

                    <p>Go To Notes</p>

                </div>

                <div
                    className="dashboard-card clickable"
                    onClick={() => navigate("/profile")}
                >

                    <h2>👤</h2>

                    <h3>Profile</h3>

                    <p>View Profile</p>

                </div>

            </div>

            <div className="recent-notes">

                <h2>Recent Notes</h2>

                {

                    notes.length === 0 ?

                        <p>No Notes Available</p>

                        :

                        notes.slice(0, 5).map(note => (

                            <div
                                key={note._id}
                                className="recent-note"
                            >

                                <strong>{note.title}</strong>

                                <span>{note.tag}</span>

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default Dashboard;