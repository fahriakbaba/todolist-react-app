import { AiFillEdit, AiFillDelete } from "react-icons/ai";

function List({ list, removeItem }) {
  return (
    <ul className="list">
      {list.map((item) => {
        return (
          <li key={item.id} className="list-item">
            {item.name}
            <div className="buttons">
              <AiFillEdit className="edit-btn" />
              <AiFillDelete className="delete-btn" onClick={() => removeItem(item.id)} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default List;
