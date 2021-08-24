import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import { createList } from "../../services/lists";

const EmptyCard = ({ idx, setLists, setNewCards }) => {
  const [title, setTitle] = useState("");

  const handleRemoveCard = () => {
    setNewCards((prevState) => [
      ...prevState.slice(0, idx),
      ...prevState.slice(idx + 1),
    ]);
  };

  const handleCompleteAdd = () => {
    createList(title, new Date(), (data) => {
      setLists((prevState) => [...prevState, data]);
      handleRemoveCard();
    });
  };

  return (
    <Card className="w-100">
      <Card.Header as="h5" className="text-center">
        Create New List
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <FormControl
            type="text"
            placeholder="Task List Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-2"
          />
          <Button onClick={handleCompleteAdd} className="mx-2">
            Add Task List
          </Button>
          <Button
            onClick={handleRemoveCard}
            variant="secondary"
            className="mx-2"
          >
            Remove Card
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EmptyCard;
