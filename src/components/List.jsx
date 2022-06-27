import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function List({ list, removeItem, changeItem }) {
  return (
    <ul className="list">
      {list.map((item) => {
        return (
          <li key={item.id} className="list-item">
            {item.title}
            <div className="buttons">
              <AiFillEdit className="edit-btn" onClick={() => changeItem(item.id)} />
              <AiFillDelete className="delete-btn" onClick={() => removeItem(item.id)} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
