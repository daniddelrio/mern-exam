import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import CardComponent from "../../components/CardComponent";
import EmptyCard from "../../components/EmptyCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { getLists } from "../../services/lists";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [newCards, setNewCards] = useState([]);

  const handleAddCard = () => {
    setNewCards((prevState) => [...prevState, null]);
  };

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
    newCards.forEach((item, idx) => {
      tempCards.push(
        <Col>
          <EmptyCard idx={idx} setLists={setLists} setNewCards={setNewCards} />
        </Col>
      );

      if ((idx + 1 + lists.length) % 2 === 0) {
        tempCards.push(<div className="w-100 my-2"></div>);
      }
    });
    tempCards.push(
      <Col className="d-flex align-items-center justify-content-center">
        <Button variant="outline-primary" onClick={handleAddCard}>
          + Add New List
        </Button>
      </Col>
    );
    setCards(tempCards);
  }, [lists, newCards]);

  return (
    <Layout>
      <h1 className="text-center">My Lists</h1>
      <Row className="my-4 px-4 g-4">{cards}</Row>
    </Layout>
  );
};

export default Home;
