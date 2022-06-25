import React from 'react';
import './App.css';


function App() {
  const [name, setName] = React.useState("");
  const [list, setList] = React.useState([]);

{/*
  const [editID, setEditID] = React.useState(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [alert, setAlert] = React.useState({ show: false, msg: "", type: "" })
*/}


  function handleSubmit(e) {
    e.preventDefault();
    if(!name) {
      alert("Please, enter your duty!")
    } else {
      setList(prevState => ([...prevState, {id: Date.now().toString(), name:name}]))
    }
  }

  console.log(list)

  return (
    <div className="App">
      <section className='container'>
        <form className='todolist-form' onSubmit={handleSubmit}>
          <label htmlFor="todolist-input">to do list</label>
          <input 
            type="text" 
            placeholder='Enter a duty' 
            className='todolist-input' 
            id='todolist-input' 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type='submit' className='todolist-btn'>submit</button>
        </form>
        <div className="list-container">
          list container
        </div>
  
      </section>
    </div>
  );
}

export default App;
