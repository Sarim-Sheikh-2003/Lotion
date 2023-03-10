import './Main.css'
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

const Main = ({ activeNote, onDeleteNote, onUpdateNote, setPageID }) => {
    var tzoffset =(new Date()).getTimezoneOffset() * 60000;
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [date, setDate] = useState(new Date(Date.now() - tzoffset).toISOString().slice(0, 16));
    const {pageID, mode} = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (activeNote) {
            setTitle(activeNote.title);
            setBody(activeNote.body);
            if (activeNote.lastModified !== null) {
                setDate(new Date(activeNote.lastModified).toISOString().slice(0, 16));
            } else {
                setDate(new Date(Date.now() - tzoffset).toISOString().slice(0, 16));
            }
        }
        else {
            navigate(`/notes`)
        }
    }, [activeNote]);

    const onSave = () => {
        if (date === "") {
            onUpdateNote({
                ...activeNote,
                title: title,
                body: body,
                lastModified: date,
            });
            setBody("")
            navigate(`/notes/${activeNote.id}`);
        }
        else {
            onUpdateNote({
                ...activeNote,
                title: title,
                body: body,
                lastModified: date,
            });
            setBody("")
            navigate(`/notes/${activeNote.id}`);
        }
    };

    const onEdit = () => {
		navigate(`/notes/${activeNote.id}/edit`);
	}

    const setDateTime = (e) => {
        setDate(new Date(e.target.value).toISOString().slice(0,16));
    }

    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"});
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };

    if (!activeNote) {
        return (<div className = "no-active-note">Select a note, or create a new one.</div>)
    }

    
    if (mode) {
        return (
            <div className = "main">
                <div className = "main-header">
                    <div className = "header-left">
                        <input
                            type = "text"  
                            id = "title"  
                            value = {title}
                            onChange = {(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                        <input 
                            type = "datetime-local"
                            id = "date"
                            value = {date}
                            onChange = {setDateTime}
                        />
                    </div>
                    <div className = "header-right">
                        <button type = "button" className = "button2 button2-hover" onClick={() => onSave()}>Save</button>
                        <button type = "button" className = "button2 button2-hover" onClick={() => onDeleteNote(activeNote.id)}>Delete</button>
                    </div>
                </div>
                <div className = "edit-main-body">
                    <ReactQuill
                        id = "body"
                        theme = "snow"
                        placeholder = "Your Note Here"
                        value = {body}
                        onChange = {setBody}
                    />
                </div>
            </div>
        )
    }
    else {
        return (
            <div className = "main">
                <div className = "main-header">
                    <div className = "header-left">
                        <div className = "title" dangerouslySetInnerHTML = {{__html: activeNote.title}}></div>
                        <small>
                            {formatDate(activeNote.lastModified)}
                        </small>
                    </div>
                    <div className = "header-right">
                        <button type = "button" className = "button2 button2-hover" onClick={onEdit}>Edit</button>
                        <button type = "button" className = "button2 button2-hover" onClick={() => onDeleteNote(activeNote.id)}>Delete</button>
                    </div>
                </div>
                <div className = "view-main-body">
                    <div dangerouslySetInnerHTML = {{__html: activeNote.body}}></div>
                </div>
            </div>
        )
    }
}

export default Main