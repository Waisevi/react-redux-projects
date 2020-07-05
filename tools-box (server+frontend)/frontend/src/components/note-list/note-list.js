import React from 'react';
import './note-list.css';

const NoteList = ({notes,onItemDel}) => {
    return (
        <ul className="list-group list-group-flush">
            {notes.map(note => (
                <li 
                    className="list-group-item"
                    key={note.id}
                >
                    <div className="note-item">
                        <strong>{note.title}</strong>
                        <button 
                            type="button" 
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => onItemDel(note.id)}
                        >&times;</button>
                    </div>
                    <span className="notes-date">{note.date}</span>
                </li>
            ))}
        </ul>
    );
};

export default NoteList;