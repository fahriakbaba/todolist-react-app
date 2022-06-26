import React from 'react';
import List from './components/List';
//import Alert from './components/Alert';


function App() {
  const [name, setName] = React.useState("");
  const [list, setList] = React.useState([]);
  const [isEditing, setIsEditing] = React.useState(false);
  //const [editID, setEditID] = React.useState(null); 
  //const [alert, setAlert] = React.useState({ show: false, msg: "", type: "" })
 


  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("Please, enter your duty!")
    } else {
      setList(prevState => ([...prevState, { id: Date.now().toString(), name: name }]))
      setName("");
    }
  }
 
  function removeItem(id) {
    setList(list.filter(item => item.id !== id));
  }

  return (
    <div className="App">
      <section className='container'>
        <form className='todolist-form' onSubmit={handleSubmit}>
          {/* <Alert /> */}
          <h3 className="todolist-header">What's the Plan for today?</h3>
          <div className="form-control">
            <input
              type="text"
              placeholder='Enter a duty'
              className='input'
              id='todolist-input'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button type='submit' className='btn'>{isEditing ? "Edit" : "Submit"}</button>
          </div>
        </form>
        <div className="list-container">
          <List list={list} removeItem={removeItem} />
        </div>
      </section>
    </div>
  );
}

export default App;
