/*import React, { useState } from 'react';
import axios from 'axios';

function Test() {
  const [name, setNombre] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8888/api/', { name: name })
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" value={name} onChange={(e) => setNombre(e.target.value)} />
      </div>
      
      <button type="submit">Enviar</button>
    </form>
  );
}

export default Test;*/

import React,{useState, useEffect} from 'react';
import Axios from 'axios'
import '../App.css'

function Test() {

const [userName,setUserName] = useState("");
const [title,setTitle] = useState("");
const [text,setText] = useState("");

const submitPost = () => {
Axios.post('http://localhost:3002/api/create', {name: userName, title: title, text:text})
}

    return (
        <div className="CreatePost">
            <div className="uploadPost">
                <label>Username: </label>
                <input type="text" onChange={(e)=> {
                    setUserName(e.target.value)
                }}/>
                <label>Title: </label>
                <input type="text" onChange={(e)=>{
                    setTitle(e.target.value)
                }}/>
                <label>Post Text</label>
                <textarea 
                onChange={(e)=>{
                    setText(e.target.value)
                }}
                ></textarea>
<button onClick={submitPost}>Submit Post</button>
            </div>
        </div>
    )
}

export default Test