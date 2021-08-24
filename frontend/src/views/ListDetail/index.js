import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import { useRouteMatch } from "react-router-dom";
import {
  getListById,
  updateTaskInList,
  createTaskInList,
} from "../../services/lists";

const ListDetail = () => {
  const [list, setList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newRows, setNewRows] = useState([]);
  const [message, setMessage] = useState("");
  const match = useRouteMatch();
  const listId = match.params.id;

  useEffect(() => {
    getListById(listId, setList, () => {});
  }, []);

  useEffect(() => {
    if (list) setTasks(list.tasks);
  }, [list]);

  const handleCheck = async (e, id) => {
    const currTaskIdx = tasks.findIndex((task) => task._id == id);
    const newState = e.target.checked;

    await updateTaskInList(
      listId,
      id,
      newState,
      () => {
        setTasks((prevState) => [
          ...prevState.slice(0, currTaskIdx),
          {
            ...prevState[currTaskIdx],
            isComplete: newState,
          },
          ...prevState.slice(currTaskIdx + 1),
        ]);
      },
      () => {
        setMessage("Something went wrong...");
      }
    );
  };

  const handleAddRow = () => {
    setNewRows((prevState) => [
      ...prevState,
      {
        id: null,
        isComplete: false,
        content: "",
      },
    ]);
  };

  const handleAddTask = (idx) => {
    createTaskInList(
      listId,
      { ...newRows[idx], timestamp: new Date() },
      (data) => {
        setNewRows((prevState) => [
          ...prevState.slice(0, idx),
          ...prevState.slice(idx + 1),
        ]);
        setTasks(data.tasks);
      },
      () => {
        setMessage(
          "Something went wrong with adding a task. Please try again!"
        );
      }
    );
  };

  const handleRemoveTask = (idx) => {
    setNewRows((prevState) => [
      ...prevState.slice(0, idx),
      ...prevState.slice(idx + 1),
    ]);
  };

  const handleNewTaskContent = (e, currTaskIdx) => {
    setNewRows((prevState) => [
      ...prevState.slice(0, currTaskIdx),
      {
        ...prevState[currTaskIdx],
        content: e.target.value,
      },
      ...prevState.slice(currTaskIdx + 1),
    ]);
  };

  return (
    <Layout>
      {list ? (
        <React.Fragment>
          <h1 className="text-center">{list.title}</h1>
          <h3 className="text-center mb-4">
            {new Date(list.dateCreated).toLocaleDateString("en-US")}
          </h3>
          {message && (
            <Alert
              onClose={() => setMessage("")}
              variant={"danger"}
              dismissible
            >
              {message}
            </Alert>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Completed</th>
                <th>Task</th>
                <th>Date Created</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      checked={task.isComplete}
                      onChange={(e) => handleCheck(e, task._id)}
                    />
                  </td>
                  <td>{task.content}</td>
                  <td>
                    {new Date(task.timestamp).toLocaleDateString("en-US")}
                  </td>
                </tr>
              ))}
              {newRows.map((task, idx) =>
                task._id ? (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.isComplete}
                        onChange={(e) => handleCheck(e, task._id)}
                      />
                    </td>
                    <td>{task.content}</td>
                    <td>
                      {new Date(task.timestamp).toLocaleDateString("en-US")}
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td></td>
                    <td>
                      <Row>
                        <Col>
                          <FormControl
                            type="text"
                            placeholder="Task Name"
                            value={newRows[idx].content}
                            onChange={(e) => handleNewTaskContent(e, idx)}
                          />
                        </Col>
                        <Col>
                          <Button onClick={() => handleAddTask(idx)}>
                            Done
                          </Button>
                          <Button
                            style={{ marginLeft: "5px" }}
                            variant="secondary"
                            onClick={() => handleRemoveTask(idx)}
                          >
                            Cancel
                          </Button>
                        </Col>
                      </Row>
                    </td>
                    <td></td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
          <Button onClick={handleAddRow}>+ Add Task</Button>
        </React.Fragment>
      ) : (
        <h1>Loading...</h1>
      )}
    </Layout>
  );
};

export default ListDetail;
