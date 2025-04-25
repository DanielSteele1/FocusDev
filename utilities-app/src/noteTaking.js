import './App.css';
import React, { useEffect, useRef, createContext, OnSubmit } from "react";
import { useState } from "react";

//import WeatherWidget from './Weather';
import PushPinIcon from '@mui/icons-material/PushPin';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'cal-heatmap/cal-heatmap.css';

import { MdContentCopy } from "react-icons/md";
import { BsSticky } from "react-icons/bs";

import { DndContext } from '@dnd-kit/core';
import Draggable from './Draggable.jsx';
import Droppable from './Droppable.jsx';
import { arrayMove } from '@dnd-kit/sortable';

import Tooltip from '@mui/material/Tooltip';
import { CSS } from '@dnd-kit/utilities';

function NoteTaking() {

    const [notes, setNotes] = useState(() => {

        // save notes to localstorage, so they dont disappear when user changes a tab.
        const savedNotes = localStorage.getItem('notes');
        return savedNotes ? JSON.parse(savedNotes) : [];

    });

    const [inputValue, setInputValue] = useState('');

    // update localstorage whenever notes changes
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    }, [notes]);

    //update inputValue whenever input field changes

    const handleInputChange = (event) => {
        setInputValue(event.target.value);

    };

    // if input field isnt empty, add the note
    const handleAddNote = () => {

        if (inputValue.trim() !== '') {

            const newNote = {

                id: Date.now(),
                text: inputValue,
                isPinned: false

            };

            setNotes([...notes, newNote]);
            setInputValue('');

        }
    };

    // handle a pinned note

    const handlePinnedNote = (index) => {

        const updatedNotes = notes.map((note, i) => {
            if (i === index) {
                return {
                    ...note,
                    isPinned: !note.isPinned
                };
            }
            return note;
        });
        setNotes(updatedNotes);
    };

    // handle note deletion

    const handleNoteDelete = (index) => {

        const newNotes = notes.filter((_, i) => i !== index);
        setNotes(newNotes);
    };


    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            const oldIndex = notes.findIndex((note) => note.id === active.id);
            const newIndex = notes.findIndex((note) => note.id === over.id);

            setNotes((prevNotes) => arrayMove(prevNotes, oldIndex, newIndex));
        }
    };



    const handleOneClickCopy = (note) => {

       navigator.clipboard.writeText(note.text).then(() => {

        alert('Copied to Clipoard!');

       }).catch((err) => {
        console.log('Failed to copy', err);
       });
    };

    return (
        <div className="NoteTaking-container">
            <DndContext className="DndContext" onDragEnd={handleDragEnd}>
                <div className="NoteTaking">
                    <div className="NoteTaking-Item" id="NoteInput">
                        <div className="Item-title">
                            <div className="Item-Icon">

                                <BsSticky
                                    style={{ fontSize: '30px', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', marginRight: '10px' }}>
                                </BsSticky>
                                <span> Sticky Notes </span>
                            </div>
                        </div>

                        <span className="description"> Enter in some text in the textbox below to add a note. You can also drag and drop each note for organisation. <br></br>
                            Notes will be saved to your account, and if you choose to pin a note, it will also appear on the homepage. </span>

                        <div className="Controls">
                            <div className="Notes-input">
                                <input id="Input"
                                    contenteditable="true"
                                    type="text"
                                    placeholder="Add a note"
                                    onChange={handleInputChange}
                                    value={inputValue}>
                                </input>
                            </div>

                            <div id="Notes-Buttons">
                                <IconButton onClick={handleAddNote}> <AddIcon sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px' }}>  </AddIcon>  </IconButton>
                            </div>
                        </div>

                    </div>

                    <Droppable  className="Droppable" id="droppable">
                        {notes.map((note, index) => (
                            <div className="NoteTaking-Item" id="NoteContainer">
                                <div className="NotesControls">

                                    <IconButton onClick={() => handlePinnedNote(index)}>
                                        <PushPinIcon sx={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginRight: '0px',
                                            verticalAlign: 'middle',
                                            transform: note.isPinned ? 'rotate(45deg)' : 'rotate(0deg)',
                                            color: note.isPinned ? '#1DB954' : ' #858d85'
                                        }}>
                                        </PushPinIcon>
                                    </IconButton>

                                    <IconButton onClick={() => handleOneClickCopy(note)}>
                                        <MdContentCopy
                                            style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '20px',
                                                verticalAlign: 'middle',
                                                color: '#1DB954'
                                            }} />
                                    </IconButton>

                                    <IconButton onClick={() => handleNoteDelete(index)} sx={{ Size: '14px' }}>
                                        <CloseIcon id="Delete-links-button" sx={{ justifyContent: 'center', alignItems: 'center', marginRight: '0px', fontSize: '14px', verticalAlign: 'middle' }}>
                                        </CloseIcon>
                                    </IconButton>

                                </div>
                                <Draggable className="Draggable" id={note.id} key={note.id}>

                                    <div className="Notes-Content">

                                        <div className="Note">{note.text} </div>

                                    </div>
                                </Draggable>
                            </div>
                        ))}
                    </Droppable>
                </div>
            </DndContext>
        </div>

    );

}

export default NoteTaking;