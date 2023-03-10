import './App.css'
import Head from './Head'
import Sidebar from './Sidebar'
import Main from './Main'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const [notes, setNotes] = useState(localStorage.notes ? JSON.parse(localStorage.notes) : []);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
      localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onDeleteNote = (noteId) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      setNotes(notes.filter(({ id }) => id !== noteId));
    }
  }

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => {
    return notes.find(({ id }) => id === activeNote);
  };

  const Default = () => {
    const navigate = useNavigate();
    useEffect(() => {
      navigate(`/notes`);
    }, []);
  }
  
  return (
    <BrowserRouter>
      <div className = "app">
        <Head />
        <div className = "body">
          <Sidebar 
                notes = {notes}
                setNotes = {setNotes}
                activeNote = {activeNote}
                onDeleteNote = {onDeleteNote}
                setActiveNote = {setActiveNote}
                onUpdateNote = {onUpdateNote}
          />

          <Routes>
            <Route path = "/" element = {<Default />}></Route>

            <Route path = "/notes" element = {<Main
              activeNote = {getActiveNote()}
              onDeleteNote = {onDeleteNote}
              onUpdateNote = {onUpdateNote}
            />}></Route>

            <Route path = "/notes/:pageID" element = {<Main
              activeNote = {getActiveNote()}
              onDeleteNote = {onDeleteNote}
              onUpdateNote = {onUpdateNote}
            />}></Route>

            <Route path = "/notes/:pageID/:mode" element = {<Main
              activeNote = {getActiveNote()}
              onDeleteNote = {onDeleteNote}
              onUpdateNote = {onUpdateNote}
            />}></Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;