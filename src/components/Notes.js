/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {

    const context = useContext(noteContext);

    const { notes,getNotes,editNote } = context;

    let navigate = useNavigate();

    useEffect(() => {

        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
    }, [])



    const ref = useRef(null)
    const refClose = useRef(null)

    const [note, setNote] = useState({id:"", title1:"", description1:"", tag1:""})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id,title1: currentNote.title, description1: currentNote.description, tag1: currentNote.tag});    
    }

    
    const handleClick =(e)=>{ 
        editNote(note.id,note.title1,note.description1,note.tag1)
        refClose.current.click();
        props.showAlert("Updated Successfully","success");
    }


    const onChange =(e)=>{
       setNote({...note, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <AddNote showAlert={props.showAlert}/>

            {/* Button trigger modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Launch static backdrop modal
            </button>

            {/* Modal */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">

                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Your Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title1" name="title1" value={note.title1} placeholder="Your Title Here" onChange={onChange}/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag1" name="tag1" value={note.tag1}  placeholder="Add a Tag" onChange={onChange}/>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description1" name="description1" value={note.description1}  onChange={onChange} rows="3"></textarea>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-success" onClick={handleClick} disabled={note.title1.length<5 || note.description1.length<5 || note.tag1.length===0} >Save Changes</button>
                        </div>

                    </div>
                </div>
            </div>






            <div className="row my-3">
                <h2>Your Notes</h2>

                <div className="container mx-1">
                    {notes.length===0 && "You Have No Notes to Display 🙈"}
                </div>
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} note={note} showAlert={props.showAlert} updateNote={updateNote} />;
                    })
                }
            </div>
        </div>
    )
}

export default Notes
