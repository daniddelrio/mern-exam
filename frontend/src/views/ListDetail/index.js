import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRouteMatch } from "react-router-dom";
import { getListById } from "../../services/lists";

const ListDetail = () => {
  const [list, setList] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newRows, setNewRows] = useState([]);
  const match = useRouteMatch();
  console.log(list);

  useEffect(() => {
    getListById(match.params.id, setList, () => {});
  }, []);

  useEffect(() => {
    if (list) setTasks(list.tasks);
  }, [list]);

  const handleCheck = (e, id) => {
    const currTaskIdx = tasks.findIndex((task) => task.id == id);
    const newState = !tasks[currTaskIdx].isComplete;
    setTasks((prevState) => [
      ...prevState.slice(0, currTaskIdx),
      {
        ...prevState[currTaskIdx],
        isComplete: newState,
      },
      ...prevState.slice(currTaskIdx + 1),
    ]);
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
    setNewRows((prevState) => [
      ...prevState.slice(0, idx),
      {
        ...prevState[idx],
        id: idx + 1,
        timestamp: new Date(),
      },
      ...prevState.slice(idx + 1),
    ]);
  };

  const handleNewTaskContent = (e, id) => {
    const currTaskIdx = newRows.findIndex((task) => task.id == id);
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
                      onChange={(e) => handleCheck(e, task.id)}
                    />
                  </td>
                  <td>{task.content}</td>
                  <td>
                    {new Date(task.timestamp).toLocaleDateString("en-US")}
                  </td>
                </tr>
              ))}
              {newRows.map((task, idx) =>
                task.id ? (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={task.isComplete}
                        onChange={(e) => handleCheck(e, task.id)}
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
                            onChange={handleNewTaskContent}
                          />
                        </Col>
                        <Col>
                          <Button onClick={() => handleAddTask(idx)}>
                            Done
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
