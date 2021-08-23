import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const data = {
  title: "To-do list",
  dateCreated: new Date(2021, 8, 23, 10, 33, 30, 0),
  tasks: [
    {
      id: 1,
      isComplete: true,
      content: "This task is incomplete",
      timestamp: new Date(2021, 8, 23, 10, 33, 30, 0),
    },
    {
      id: 2,
      isComplete: true,
      content: "This task is incomplete",
      timestamp: new Date(2021, 8, 23, 10, 33, 30, 0),
    },
  ],
};

const ListDetail = () => {
  const [tasks, setTasks] = useState([]);
  const [newRows, setNewRows] = useState([]);

  useEffect(() => {
    setTasks(data.tasks);
  }, []);

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

  console.log(newRows);

  return (
    <Layout>
      <h1 className="text-center">{data.title}</h1>
      <h3 className="text-center mb-4">
        {data.dateCreated.toLocaleDateString("en-US")}
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
              <td>{task.timestamp.toLocaleDateString("en-US")}</td>
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
                <td>{task.timestamp.toLocaleDateString("en-US")}</td>
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
                      <Button onClick={() => handleAddTask(idx)}>Done</Button>
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
    </Layout>
  );
};

export default ListDetail;
