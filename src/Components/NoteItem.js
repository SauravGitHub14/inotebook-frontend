import '../css/noteItem.css';
import React from 'react'
import Card from 'react-bootstrap/Card';
import { BsTrash, BsPencilSquare, BsEye } from "react-icons/bs";
import { useContext } from 'react';
import noteContext from '../Context/notes/noteContext';

function NoteItem(props) {
    const context = useContext(noteContext)
  const  {note, updateNote,viewNote}= props;
  const {deleteNote} = context;


    return (
    <div className="note-container col-lg-4 col-md-6 col-sm-12 mb-4">

        <Card className="card-container">

            <Card.Body>

                <Card.Title className="note-title">
                    {note.title}
                </Card.Title>

                <Card.Text className="note-description">
                    {note.description}
                </Card.Text>

                <div className="tag-section">
                    <span className="tag-badge">
                        #{note.tag}
                    </span>
                </div>

            </Card.Body>

            <div className="note-footer">

                <BsEye
                    className="icon view-icon"
                    onClick={() => viewNote(note)}
                />

                <BsPencilSquare
                    className="icon edit-icon"
                    onClick={() => updateNote(note)}
                />

                <BsTrash
                    className="icon delete-icon"
                    onClick={() => deleteNote(note._id)}
                />

            </div>

        </Card>

    </div>
)



  // return (
  //   <div className="note-container col-lg-4 col-md-6 col-sm-12 mb-4">
  //       <Card className=' card-container'>
  //     <Card.Body className = ''>
  //       <div className='title-icon mx-2 mb-2 mt-1'>
  //       <Card.Title>{note.title}</Card.Title>
  //       </div>
  //       <Card.Text>
  //       {note.description}
  //       </Card.Text>
  //     </Card.Body>
  //     <div className=' mx-3 my-1'>
  //       <BsTrash className=' icon mx-2' onClick={() => {deleteNote(note._id)}}/>
  //       <BsPencilSquare className='icon ' onClick= {()=> {updateNote(note)}}/>
  //       </div>
  //   </Card>
    

  //   </div>
  // )
}

export default NoteItem