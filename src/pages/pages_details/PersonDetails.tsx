import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPerson } from "../../services/StarWarsAPI";
import { Person } from "../../types/People";
import {
  Container,
  Spinner,
  Alert,
  Card,
  Button,
  Col,
  Row,
} from "react-bootstrap";

const PersonDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [person, setPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const data = await getPerson(id!);
        setPerson(data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  return (
    <Container id="center-container">
      {isLoading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error.message}</Alert>}

      {person && (
        <Card>
          <Card.Img
            variant="top"
            id="DetailsIMG"
            src={person.image_url}
            alt={person.name}
          />
          <Card.Body id="card-body">
            <Card.Title>{person.name}</Card.Title>
            <Card.Text>
              <strong>Birth Year:</strong> {person.birth_year}
              <br />
              <strong>Eye Color:</strong> {person.eye_color}
              <br />
              <strong>Hair Color:</strong> {person.hair_color}
              <br />
              <strong>Height:</strong> {person.height}
              <br />
              <strong>Mass:</strong> {person.mass}
              <br />
              <strong>Skin Color:</strong> {person.skin_color}
              <br />
              <strong>Homeworld:</strong> {person.homeworld.name}
              <br />
            </Card.Text>
            <div id="underText">
              <Row id="CardText_person">
                {person.affiliations.length > 0 && (
                  <Col md={2}>
                    <strong>Affiliations:</strong>
                    <ul>
                      {person.affiliations.map((affiliation, index) => (
                        <li key={index}>{affiliation}</li>
                      ))}
                    </ul>
                  </Col>
                )}
                {person.films.length > 0 && (
                  <Col md={2}>
                    <strong>Films:</strong>
                    <ul>
                      {person.films.map((film) => (
                        <li key={film.id}>
                          <Link to={`/films/${film.id}`}>{film.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </Col>
                )}
              </Row>
            </div>
          </Card.Body>
          <div className="mt-4">
            <Link to="/people">
              <Button variant="primary" id="details-button">
                People
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </Container>
  );
};

export default PersonDetails;
