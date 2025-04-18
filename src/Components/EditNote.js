import React, { useContext, useState, useEffect, useRef } from 'react'
import NoteContext from "../Context/notes/noteContext";

const EditNote = (props) => {
  const context = useContext(NoteContext);
  const {editNote} = context;
  const [note, setNote] = useState({_id: "", title: "", description: "", tag: "default"});
  const ref = useRef(null)

  useEffect(() => {
    setNote(props.eNote)
  }, [props.eNote])

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note._id, note.title, note.description, note.tag);
    ref.current.click();
    props.showAlert("Note Updated Successfully", "success", true)
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content bg-dark border-primary">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title
                      </label>
                      <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} minLength={3} required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={3} required/>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="tag" className="form-label">
                        Tag
                      </label>
                      <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange}/>
                    </div>
                  </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={ref}>Close</button>
                <button disabled={note.title.length < 3 || note.description.length < 3} type="submit" className="btn btn-primary" onClick={handleClick}>Save changes</button>
              </div>
            </div>
          </div>
    </div>
  )
}

export default EditNote
