import React, { useEffect, useState } from "react";
import "../css/profile.css";
import { useNavigate } from "react-router-dom";

const Profile = () => {

    const host = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: ""
    });

    useEffect(() => {

        if (!localStorage.getItem("token")) {

            navigate("/login");
            return;
        }

        getUser();

        // eslint-disable-next-line
    }, []);

    const getUser = async () => {

        try {

            const response = await fetch(`${host}/api/auth/getuser`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "jwt-token": localStorage.getItem("token")
                }

            });

            const json = await response.json();

            setUser(json);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="profile-avatar">

                    👤

                </div>

                <h2>{user.name}</h2>

                <p>{user.email}</p>

                <div className="profile-info">

                    <div>

                        <h5>Name</h5>

                        <span>{user.name}</span>

                    </div>

                    <div>

                        <h5>Email</h5>

                        <span>{user.email}</span>

                    </div>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </div>

    );
};

export default Profile;