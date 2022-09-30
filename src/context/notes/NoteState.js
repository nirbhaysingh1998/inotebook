import React from "react";
import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const notesInitial = []
    // istes notes varibale me notesinitaial ka data hai jo sample api se aaya hai
    const [notes, setNotes] = useState(notesInitial);
    const getNote = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },


        });
        const json = await response.json()
        console.log(json);
        setNotes(json)

    }
    // const s1={
    //     "name":"nirbhay",
    //     "class":10
    // }
    // const [state, setstate] = useState(s1);

    // this function can also be send in any component just to change the state
    //   const  update =()=>{
    //             setTimeout(()=>{
    //             setstate({
    //                 "name":"jack",
    //                 "class":11
    //             })
    //             }
    //             ,1000)
    //     }
    // Add note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag })
        });




        const note = {
            "_id": "6334478667d4197407cef53a",
            "user": "632f5fc5efe1b555f65e9023",
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-09-28T13:09:26.704Z",
            "__v": 0
        };
        setNotes(notes.concat(note))



    }

    // delete note 
    const deleteNote = async (id) => {
        console.log("deleting the note" + id)
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
        // response fetch karega api ko server se as per the id
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            // we have to pass header for authentication
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },


        });

        // json me store ho raha hai reponse.json ka
        const json = await response.json()
        console.log(json);
        // window.alert(json);
        //setNotes(json) will print jo api retun karga
    }

    // edit note

    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',

            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },

            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json)



        // Api call to update in DB
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes.tag = tag;
                break;
            }

        }
        setNotes(newNotes);
    }

    return (

        // eslint-disable-next-line react/jsx-pascal-case
        // notes aur setnotes ka value export hogga hai component me so that i can use it in any componnet
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNote }}>

            {props.children}
        </NoteContext.Provider>
    )

}


export default NoteState;




