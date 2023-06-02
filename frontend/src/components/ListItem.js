import { useState } from "react";
import TickIcon from "./TickIcon";
import Modal from "./Modal";
import ProgressBar from "./ProgressBar";
import { useCookies } from "react-cookie";
import axiosConfig from "../axios/axiosConfig";

const ListItem = ({ task, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [showModal, setShowModal] = useState(false);
  const authToken = cookies.AuthToken;

  const deleteItem = async () => {
    try {
      const response = await axiosConfig.delete(`/todos/delete/${task.id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      getData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>

      <div className="button-container">
        <button className="edit" onClick={() => setShowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && (
        <Modal
          mode={"edit"}
          setShowModal={setShowModal}
          getData={getData}
          task={task}
        />
      )}
    </li>
  );
};

export default ListItem;
