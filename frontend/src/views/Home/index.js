import Layout from "../../components/Layout";
import CardComponent from "../../components/CardComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const data = [
  {
    id: 1,
    title: "To-Do List",
    completedTasks: 4,
    incompleteTasks: 2,
    dateCreated: new Date(2021, 8, 23, 10, 33, 30, 0),
  },
  {
    id: 2,
    title: "To-Do List",
    completedTasks: 4,
    incompleteTasks: 2,
    dateCreated: new Date(2021, 8, 23, 10, 33, 30, 0),
  },
];

const Home = () => {
  let cards = [];
  data.forEach((item, idx) => {
    cards.push(
      <Col>
        <CardComponent data={item} />
      </Col>
    );

    if ((idx + 1) % 2 === 0) {
      cards.push(<div className="w-100 my-2"></div>);
    }
  });

  return (
    <Layout>
      <h1 className="text-center">My Lists</h1>
      <Row className="my-4 px-4">{cards}</Row>
    </Layout>
  );
};

export default Home;
