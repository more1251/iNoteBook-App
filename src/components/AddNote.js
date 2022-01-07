import React, { useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {

    const context = useContext(noteContext);

    const {addNote} = context;
    
    

    const [note, setNote] = useState({title:"", description:"", tag:""})

    const handleClick =(e)=>{ 
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"", description:"", tag:""});
        props.showAlert("Note Added Successfully","success");
    }


    const onChange =(e)=>{
       setNote({...note, [e.target.name]: e.target.value})
    }
    return (
        <div className="container my-3">
                <h2>Add a Note</h2>
                <form className='my-3'>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name="title" value={note.title} placeholder="Your Title Here" onChange={onChange}/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="Add a Tag" onChange={onChange}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" value={note.description}onChange={onChange} rows="3" ></textarea>
                    </div>

                    <button className="btn btn-primary" type="submit" onClick={handleClick} disabled={note.title.length<5 || note.description.length<5}>Add Note</button>
                </form>   
        </div>
           
    )
}

export default AddNote
