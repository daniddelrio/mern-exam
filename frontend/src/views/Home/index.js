import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import CardComponent from "../../components/CardComponent";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { getLists } from "../../services/lists";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getLists(setLists, () => {});
  }, []);

  useEffect(() => {
    let tempCards = [];
    lists.forEach((item, idx) => {
      tempCards.push(
        <Col>
          <CardComponent data={item} />
        </Col>
      );

      if ((idx + 1) % 2 === 0) {
        tempCards.push(<div className="w-100 my-2"></div>);
      }
    });
    setCards(tempCards);
  }, [lists]);

  return (
    <Layout>
      <h1 className="text-center">My Lists</h1>
      <Row className="my-4 px-4">{cards}</Row>
    </Layout>
  );
};

export default Home;
