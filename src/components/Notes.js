import '../css/notes.css';
import React, { useContext, useState, useEffect } from 'react';
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ClipLoader } from "react-spinners";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dashboard from "./Dashboard";

const Notes = () => {

  const context = useContext(noteContext);
  const {
    notes,
    loading,
    getNotes,
    editNote
  } = context;

  const navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem("token")) {
      getNotes();
    }
    else {
      navigate("/login");
    }

    // eslint-disable-next-line
  }, []);

  // Search
  const [search, setSearch] = useState("");

  // Edit Modal
  const [show, setShow] = useState(false);

  // View Modal
  const [showView, setShowView] = useState(false);

  // Edit Note State
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: ""
  });

  // Selected Note (View Modal)
  const [selectedNote, setSelectedNote] = useState({
    title: "",
    description: "",
    tag: ""
  });

  // const ref = useRef(null);

  // ============================
  // Open Edit Modal
  // ============================

  const updateNote = (currentNote) => {

    setShow(true);

    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag
    });

  };

  // ============================
  // Open View Modal
  // ============================

  const viewNote = (currentNote) => {

    setSelectedNote(currentNote);

    setShowView(true);

  };

  // ============================
  // Edit Inputs
  // ============================

  const onChange = (e) => {

    setNote({
      ...note,
      [e.target.name]: e.target.value
    });

  };

  // ============================
  // Update Note
  // ============================

  const handleUpdate = () => {

    editNote(
      note.id,
      note.etitle,
      note.edescription,
      note.etag
    );

    toast.success("Note Updated Successfully");

    setShow(false);

  };

  // ============================
  // Search Filter
  // ============================

  const filteredNotes = notes.filter((note) => {
    return (
      (note.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (note.description || "").toLowerCase().includes(search.toLowerCase()) ||
      (note.tag || "").toLowerCase().includes(search.toLowerCase())
    );
  });

  return (

    <div className="container my-4">

      <AddNote />
      <Dashboard notes={notes} filteredNotes={filteredNotes} />

      {/* ================= HEADER ================= */}

      <div className="notes-header">

        <h1>Your Notes</h1>

        <input
          type="text"
          className="search-box"
          placeholder="🔍 Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* ================= NOTES ================= */}



      {
        loading ? (

          <div className="loader-container">

            <ClipLoader
              color="#38bdf8"
              size={60}
            />

            <h4>Loading your notes...</h4>

          </div>

        ) : (

          <div className="row">

            {filteredNotes.length === 0 ? (

              <div className="empty-state">

                <div className="empty-icon">
                  📝
                </div>

                <h2>No Notes Yet</h2>

                <p>

                  Click "Add Note" to create your first note.

                </p>

              </div>

            ) : (

              filteredNotes.map((note) => (

                <NoteItem
                  key={note._id}
                  note={note}
                  updateNote={updateNote}
                  viewNote={viewNote}
                />

              ))

            )}

          </div>

        )
      }
      {/* ================= UPDATE MODAL ================= */}

      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
      >

        <Modal.Header closeButton>

          <Modal.Title>

            Update Note

          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <Form>

            <Form.Group className="mb-3">

              <Form.Label>

                Title

              </Form.Label>

              <Form.Control
                type="text"
                name="etitle"
                value={note.etitle}
                onChange={onChange}
                minLength={5}
                required
              />

            </Form.Group>

            <Form.Group className="mb-3">

              <Form.Label>

                Description

              </Form.Label>

              <Form.Control
                as="textarea"
                rows={6}
                name="edescription"
                value={note.edescription}
                onChange={onChange}
                minLength={5}
                required
              />

            </Form.Group>

            <Form.Group>

              <Form.Label>

                Tag

              </Form.Label>

              <Form.Control
                type="text"
                name="etag"
                value={note.etag}
                onChange={onChange}
              />

            </Form.Group>

          </Form>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={() => setShow(false)}
          >
            Close
          </Button>

          <Button
            variant="primary"
            onClick={handleUpdate}
            disabled={
              note.etitle.length < 5 ||
              note.edescription.length < 5
            }
          >
            Update Note
          </Button>

        </Modal.Footer>

      </Modal>

      {/* ================= VIEW MODAL ================= */}

      <Modal
        show={showView}
        onHide={() => setShowView(false)}
        centered
        size="lg"
      >

        <Modal.Header closeButton>

          <Modal.Title>

            {selectedNote.title}

          </Modal.Title>

        </Modal.Header>

        <Modal.Body>

          <p
            style={{
              whiteSpace: "pre-wrap",
              lineHeight: "1.8"
            }}
          >

            {selectedNote.description}

          </p>

          <hr />

          <h6>

            Tag :
            <span className="tag-badge ms-2">

              #{selectedNote.tag}

            </span>

          </h6>

        </Modal.Body>

        <Modal.Footer>

          <Button
            variant="secondary"
            onClick={() => setShowView(false)}
          >
            Close
          </Button>

        </Modal.Footer>

      </Modal>

    </div>

  );

};

export default Notes;