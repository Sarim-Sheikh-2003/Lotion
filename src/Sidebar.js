import './Sidebar.css'
import { useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from 'uuid';

const Sidebar = ({ notes, setNotes, activeNote, setActiveNote }) => {
    const navigate = useNavigate();

    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

    const formatDate = (when) => {
        if (when === null) {
            return "";
        }
        const formatted = new Date(when).toLocaleString("en-US", {year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric"});
        return formatted;
    };

    const onAddNote = () => {
        const newNote = {
            id: uuidv1(),
            title: "Untitled",
            body: "",
            lastModified: null,
        };
        setNotes([newNote, ...notes]);
        setActiveNote(newNote.id);
        navigate(`/notes/${newNote.id}/edit`)
    }

    const onNoteClick = (id) => {
        setActiveNote(id)
        navigate(`/notes/${id}`);
    }

    return (
        <div className = "sidebar" id = "Sidebar">
            <div className = "sidebar-header">
                <h1>Notes</h1>
                <button type = "button" className = "button1 button1-hover" onClick={onAddNote}>+</button>
            </div>
            <div className = "sidebar-body" data-placeholder = "No Note Yet">
                {sortedNotes.map(({ id, title, body, lastModified }) => (
                    <div key = {id} className = {`sidebar-note ${id === activeNote && "active-note"}`} onClick = {() => onNoteClick(id)}>
                        <div className = "note-title">
                            <strong>{title}</strong>
                        </div>
                        <small>
                            {formatDate(lastModified)}
                        </small>
                        <p>{body.substr(0, 50).replace(/<[^>]+>/g, '') + "..."}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Sidebar