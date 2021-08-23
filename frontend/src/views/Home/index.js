import Layout from "../../components/Layout";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const data = [
  {
    title: "To-Do List",
    completedTasks: 4,
    incompleteTasks: 2,
    timestamp: new Date(2021, 8, 23, 10, 33, 30, 0),
  },
  {
    title: "To-Do List",
    completedTasks: 4,
    incompleteTasks: 2,
    timestamp: new Date(2021, 8, 23, 10, 33, 30, 0),
  },
];

const CardComponent = ({ data }) => {
  const { title, completedTasks, incompleteTasks, timestamp } = data;
  return (
    <Card className="w-100">
      <Card.Header as="h5" className="text-center">
        {title}
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted text-center">
          {timestamp.toLocaleDateString("en-US")}
        </Card.Subtitle>
        <Card.Text>
          Completed Tasks: {completedTasks}
          <br />
          Incomplete Tasks: {incompleteTasks}
        </Card.Text>
        {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
      </Card.Body>
    </Card>
  );
};

const Home = () => {
  let cards = [];
  data.forEach((item, idx) => {
    cards.push(
      <Col>
        <CardComponent data={item} />
      </Col>
    );

    // force wrap to next row every 42cards
    if ((idx + 1) % 2 === 0) {
      cards.push(<div className="w-100 my-2"></div>);
    }
  });

  return (
    <Layout>
      <Row className="my-4 px-4">{cards}</Row>
      {/* <div className="d-flex flex-column justify-content-center align-items-center my-4 px-4">
        {data.map((card) => (
          <CardComponent data={card} />
        ))}
      </div> */}
    </Layout>
  );
};

export default Home;
