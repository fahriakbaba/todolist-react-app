import React from 'react';
import List from './components/List';
import Button from './components/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';


function getDataFromLS() {
  let list = localStorage.getItem("list");
  if (list) {
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
      toast.info('Please, enter a duty!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    } else if (name && isEditing) {
      toast.warn('A duty is edited!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      const checkList = list.map(item => item.id === editID ? { ...item, title: name } : item);
      setList(checkList);
      setEditID(null);
      setIsEditing(false);
      setName("");
    } else {
      toast.success('A duty is added!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      setList(prevState => ([...prevState, { id: Date.now().toString(), title: name }]));
      setName("");
    }
  }

  function removeItem(id) {
    toast.error('A duty is deleted.', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
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
    toast.error('All duties are removed!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    setList([]);
  }



  return (
    <div className="App">
      <ToastContainer />
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
          {list.length > 0 && <Button clearAll={clearAll} />}
        </div>
      </section>
    </div>
  );
}

export default App;
