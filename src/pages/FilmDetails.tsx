import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getFilm } from '../services/StarWarsAPI';
import { Film } from '../types/Films';
import { Container, Spinner, Alert, Card, Button, Col, Row } from 'react-bootstrap';

const FilmDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [film, setFilm] = useState<Film | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const data = await getFilm(id!);
        setFilm(data);
      } catch (error) {
        setError(error instanceof Error ? error : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  return (
    <Container>
      {isLoading && <Spinner animation="border" role="status"><span className="visually-hidden">Loading...</span></Spinner>}
      {error && <Alert variant="danger">{error.message}</Alert>}
      {film && (
        <Card>
          <Card.Img variant="top" id="DetailsIMG" src={film.image_url} alt={film.title} />
          <Card.Body>
            <Card.Title>{film.title}</Card.Title>
            <Card.Text>
            <div id='underText'>
              <strong>Director:</strong> {film.director}<br />
              <strong>Producer:</strong> {film.producer}<br />
              <strong>Release Date:</strong> {film.release_date}<br />
              <strong>Opening Crawl:</strong> {film.opening_crawl}<br />
             </div>

              <Row id="CardText">
              <Col md={2}>
                <strong>Characters:</strong>
                <ul>
                  {film.characters.map((character) => (
                    <li key={character.id}>
                      <Link to={`/people/${character.id}`}>{character.name}</Link>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col md={2}>
                <strong>Planets:</strong>
                <ul>
                  {film.planets.map((planet) => (
                    <li key={planet.id}>
                      <Link to={`/planets/${planet.id}`}>{planet.name}</Link>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col md={2}>
                <strong>Starships:</strong>
                <ul>
                  {film.starships.map((starship) => (
                    <li key={starship.id}>
                      <Link to={`/starships/${starship.id}`}>{starship.name}</Link>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col md={2}>
                <strong>Vehicles:</strong>
                <ul>
                  {film.vehicles.map((vehicle) => (
                    <li key={vehicle.id}>
                      <Link to={`/vehicles/${vehicle.id}`}>{vehicle.name}</Link>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col md={2}>
                <strong>Species:</strong>
                <ul>
                  {film.species.map((species) => (
                    <li key={species.id}>
                      <Link to={`/species/${species.id}`}>{species.name}</Link>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
           </Card.Text>
          </Card.Body>
          <div className="mt-3">
        <Link to="/Films">
          <Button variant="primary">Back</Button>
        </Link>
      </div>
        </Card>
        
      )}
    </Container>
  );
};



export default FilmDetails;