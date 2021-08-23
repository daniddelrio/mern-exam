import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Table from "react-bootstrap/Table";

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

  useEffect(() => {
    setTasks(data.tasks);
  }, []);

  const handleChange = (e, id) => {
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
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr>
              <td>
                <input
                  type="checkbox"
                  checked={task.isComplete}
                  onChange={(e) => handleChange(e, task.id)}
                />
              </td>
              <td>{task.content}</td>
              <td>{task.timestamp.toLocaleDateString("en-US")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
};

export default ListDetail;
