import Layout from "../../components/Layout";
import CardComponent from "../../components/CardComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const data = [
  {
    title: "To-Do List",
    completedTasks: 4,
    incompleteTasks: 2,
    dateCreated: new Date(2021, 8, 23, 10, 33, 30, 0),
  },
  {
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
