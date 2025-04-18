import React, { useContext } from 'react'
import NoteContext from "../Context/notes/noteContext";

function NoteItem(props) {
  const {note, updateNote} = props;
  const context = useContext(NoteContext);
  const {deleteNote} = context;
  return (
    <div className="col-md-3">
        <div className="card my-3 border-primary text-bg-dark">
            <div className="card-body text-success">
                <div className="d-flex align-items-center">
                    <h5 className="card-title flex-grow-1">{note.title}</h5>
                    <i className="fa-regular fa-pen-to-square mx-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => {updateNote(note);}}></i>
                    <i className="fa-solid fa-trash mx-2" onClick={() => {deleteNote(note._id); props.showAlert("Note Deleted Successfully", "success", true)}}></i>
                </div>
                <p className="card-text">{note.description}</p>
            </div>
        </div>
    </div>
  )
}

export default NoteItem
