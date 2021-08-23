import Card from "react-bootstrap/Card";

const CardComponent = ({ data }) => {
  const { title, completedTasks, incompleteTasks, dateCreated } = data;
  return (
    <Card className="w-100">
      <Card.Header as="h5" className="text-center">
        {title}
      </Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted text-center">
          Date Created: {dateCreated.toLocaleDateString("en-US")}
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

export default CardComponent;
