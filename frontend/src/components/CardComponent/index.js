import Card from "react-bootstrap/Card";
import Link from "../Link";

const CardComponent = ({ data }) => {
  const { title, completedTasks, incompleteTasks, dateCreated } = data;
  return (
    <Link to={`/list/${data.id}`}>
      <Card className="w-100">
        <Card.Header as="h5" className="text-center">
          {title}
        </Card.Header>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted text-center">
            Date Created: {new Date(dateCreated).toLocaleDateString("en-US")}
          </Card.Subtitle>
          <Card.Text>
            Completed Tasks: {completedTasks}
            <br />
            Incomplete Tasks: {incompleteTasks}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default CardComponent;
