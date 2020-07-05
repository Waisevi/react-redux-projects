import React, {useState, useEffect} from 'react';
import Form from '../components/form';
import NoteList from '../components/note-list';

const Nots = ({loginEmail}) => {
    const [notes, setNotes] = useState([]);
    
    function itemAdd(text) {
        const itemText = text;
        fetch(`http://localhost:3001/notes/add?title=${itemText}&email=${loginEmail}`)
            .then((response) => response.json())
            .then((data) => data.filter((item) => item.email === loginEmail))
            .then((res) => setNotes(res[0].notes));
           
    };

    function itemDel(id) {
        const indexNote = notes.findIndex((search) => search.id === id);
        if(indexNote !== -1){
            fetch(`http://localhost:3001/notes/del?index=${indexNote}&email=${loginEmail}`)
                .then((response) => response.json())
                .then((data) => data.filter((item) => item.email === loginEmail))
                .then((res) => setNotes(res[0].notes));
        }
    };

    useEffect(() => {
        fetch(`http://localhost:3001/request-data`)
            .then((response) => response.json())
            .then((data) => data.filter((item) => item.email === loginEmail))
            .then((res) => setNotes(res[0].notes));
    },[loginEmail]);

    return (
        <div className="jumbotron">
            <div className="container">
                <h1 className="display-4">You Notes</h1>
                <Form onItemAdd={itemAdd}/>
                <hr />
                {notes != null &&
                    <NoteList notes={notes} onItemDel={itemDel}/>
                }
            </div>
        </div>
    );
};

export default Nots;
