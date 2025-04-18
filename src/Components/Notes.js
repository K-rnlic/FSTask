import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NoteContext from "../Context/notes/noteContext";
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import EditNote from './EditNote'

function Notes(props) {
  const context = useContext(NoteContext);
  const {notes, getNotes} = context;
  const [eNote, setENote] = useState({_id: "", title: "", description: "", tag: "default"});
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem('token') ? getNotes() : navigate('/login')
  }, [])

  const updateNote = (note) => {
    setENote(note);
  }

  return (
    <>
        <AddNote showAlert={props.showAlert}/>
        <EditNote eNote={eNote} showAlert={props.showAlert}/>
        <h2>Your Notes📓</h2>
        <div className="text-center">
          <div className="row my-3">
            {notes.length === 0 ? "No Notes to Display" : notes.map((note) => {
              return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>;
              })}
          </div>
        </div>
    </>
  )
}

export default Notes
