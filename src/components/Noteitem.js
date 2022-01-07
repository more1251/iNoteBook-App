import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {

    const context = useContext(noteContext);

    const {deleteNote} = context;

    const {note,updateNote} = props;

    return (
        <div className="col-md-3">
    
            <div className="card my-3">

                <div className="card-header"><b>Title:</b> {note.title}</div>

                <div className="card-body">
                    <p className="card-text">{note.description}</p>
                    <i className="fas fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);  props.showAlert("Note has been Deleted","danger");}}></i>
                    <i className="fas fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>

                <div className="card-footer"><b>Tag:</b> {note.tag}</div>
            </div>


        </div>
    )
}

export default Noteitem
