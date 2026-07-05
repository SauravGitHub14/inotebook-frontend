import React, { useState, useCallback } from "react";
import noteContext from './noteContext'
import toast from "react-hot-toast";

const NoteState = (props) => {
    const host = process.env.REACT_APP_API_URL;

    const notesInitial = []

    //Get All notes
    const getNotes = useCallback(async () => {

        setLoading(true);

        try {

            const response = await fetch(`${host}/api/notes/fetchallnotes`, {

                method: "GET",

                headers: {
                    "Content-Type": "application/json",
                    "jwt-token": localStorage.getItem("token")
                }

            });

            const json = await response.json();

            setNotes(json);

        }

        catch (error) {

            console.error(error);

            // toast.error("Unable to fetch notes. Please try again.");

        }

        finally {

            setLoading(false);

        }

    }, [host]);



    const [notes, setNotes] = useState(notesInitial);
    const [loading, setLoading] = useState(false);

    const addNote = useCallback(async (title, description, tag) => {
        // Api CAll
        try {

            const response = await fetch(`${host}/api/notes/addnote`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "jwt-token": localStorage.getItem("token")
                },

                body: JSON.stringify({ title, description, tag })

            });

            const note = await response.json();

            setNotes(notes.concat(note));

            toast.success("Note Added Successfully");

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to add note.");

        }

    },[host,notes]);




    const deleteNote = useCallback(async (id) => {
        // API call delete Note
        try {
            const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-token': localStorage.getItem('token')
                },
            });
            const json = response.json();
            console.log(json)

            const newNotes = notes.filter((note) => { return note._id !== id })
            setNotes(newNotes)
            toast.success("Note Deleted");
        }
        catch (error) {

            toast.error("Unable to delete note.");

        }
    }, [host,notes]);

    const editNote = useCallback(async (id, title, description, tag) => {
        //API call for editNote

        try {
            const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'jwt-token': localStorage.getItem('token')
                },
                body: JSON.stringify({ title, description, tag })
            });
            const json = await response.json();
            console.log(json)

            let newNotes = JSON.parse(JSON.stringify(notes))

            //logic
            for (let i = 0; i < newNotes.length; i++) {
                // const element = notes[i];
                const element = newNotes[i];
                if (element._id === id) {
                    newNotes[i].title = title;
                    newNotes[i].description = description;
                    newNotes[i].tag = tag;
                    break;
                }

            }
            setNotes(newNotes);
            toast.success("Note updated Successfully");
        } catch (error) {
            toast.error("Unable to update note.");
        }

    },[host,notes]);



    return (
        <noteContext.Provider
            value={{
                notes,
                loading,
                setNotes,
                addNote,
                deleteNote,
                editNote,
                getNotes
            }}
        >
            {props.children}
        </noteContext.Provider>
    )

}

export default NoteState;
