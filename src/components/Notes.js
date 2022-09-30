import React, { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';
import { useNavigate } from 'react-router-dom';
const Notes = (props) => {
    const context = useContext(noteContext);
    let history = useNavigate();
    // destructuring the values from constext object varibale
    const { notes, getNote, editNote } = context;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNote()
        }
        else {
            history("/login");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const ref = useRef(null)
    const refclose = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });

    }

    const handleclick = (e) => {

        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag)
        refclose.current.click();
        props.showAlert("Updated Successfully", "Success");
        //document.getElementById("myForm").reset();
    }
    const onchange = (e) => {
        //  e.preventDefault();
        console.log("working");
        setNote({ ...note, [e.target.name]: e.target.value })

    }
    return (
        <>

            <AddNote showAlert={props.showAlert} />
            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>


            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="myForm">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" onChange={onchange} value={note.etitle} />

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Password</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" onChange={onchange} value={note.edescription} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" onChange={onchange} value={note.etag} />
                                </div>


                            </form>
                        </div>
                        <div class="modal-footer">
                            <button ref={refclose} type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} class="btn btn-primary" onClick={handleclick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='my-3 row'>
                <h2>Your Notes</h2>
                {notes.length === 0 && 'no notes to display'}
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                    //notes array ko note me map kar dia map function jab map ke through ham har element ko use kar sakte hai notes ka
                })}
            </div>
        </>

    );
}

export default Notes;
