import React from 'react';
import List from './components/List';
import Button from './components/Button';

function getDataFromLS() {
  let list = localStorage.getItem("list");
  if(list) {
    list = JSON.parse(localStorage.getItem("list"));
  } else {
    list = []
  }
  return list;
}

function App() {
  const [name, setName] = React.useState("");
  const [list, setList] = React.useState(() => getDataFromLS());
  const [isEditing, setIsEditing] = React.useState(false);
  const [editID, setEditID] = React.useState(null); 
  const inputRef = React.useRef();

  React.useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
  }, [list]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      alert("Please, enter a name!")
      return;
    } else if(name && isEditing) {
      const checkList = list.map(item => item.id === editID ? {...item, title:name } : item);
      setList(checkList);
      setEditID(null);
      setIsEditing(false);
      setName("");
    } else {
      setList(prevState => ([...prevState, { id: Date.now().toString(), title: name }]));
      setName("");
    }
  }
 
  function removeItem(id) {
    setList(list.filter(item => item.id !== id));
  }

  function changeItem(id) {
    const selectedItem = list.find(item => item.id === id);
    setEditID(selectedItem.id);
    setIsEditing(true);
    setName(selectedItem.title);
    inputRef.current.focus();
  }
  function clearAll() {
    setList([]);
  }



  return (
    <div className="App">
      <section className='container'>
        <form className='todolist-form' onSubmit={handleSubmit}>
          <h3 className="todolist-header">What's the Plan for today?</h3>
          <div className="form-control">
            <input
              type="text"
              placeholder='Enter a duty'
              className='input'
              id='todolist-input'
              value={name}
              onChange={(e) => setName(e.target.value)}
              ref={inputRef}
            />
            <button type='submit' className='btn'>{isEditing ? "Edit" : "Submit"}</button>
          </div>
        </form>
        <hr />
        <div className="list-container">
          <List list={list} removeItem={removeItem} changeItem={changeItem} />
          { list.length>0 && <Button clearAll={clearAll} />}
        </div>
      </section>
    </div>
  );
}

export default App;
