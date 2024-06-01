import { useEffect, useState } from "react";
import { getPeople } from "../../services/StarWarsAPI";
import { Person, PeopleResponse } from "../../types/People";
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/Search_Bar";
import { Link } from "react-router-dom";

const People = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchPeople = async (page: number, query: string = "") => {
      setIsLoading(true);
      try {
        const data: PeopleResponse = await getPeople(page, query);
        setPeople(data.data);
        setTotalPages(data.last_page);
        setHasNextPage(data.next_page_url !== null);
        setHasPreviousPage(data.prev_page_url !== null);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error"));
      }
      setIsLoading(false);
    };

    fetchPeople(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (hasPreviousPage) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleSearch = (query: string) => {
    setCurrentPage(1);
    setSearchQuery(query);
    setIsLoading(true);
  };

  return (
    <Container>
      <h1>People</h1>

      <SearchBar onSearch={handleSearch} />

      {isLoading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error.message}</Alert>}

      {!isLoading && (
        <>
          <Row>
            {people.map((person) => (
              <Col
                key={person.id}
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="mb-4"
              >
                <Link to={`/people/${person.id}`}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={person.image_url}
                      alt={person.name}
                      height={400}
                    />
                    <Card.Body>
                      <Card.Title id="card-title">{person.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          {people.length > 0 && (
            <Pagination
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              onNextPage={handleNextPage}
              onPreviousPage={handlePreviousPage}
              currentPage={currentPage}
              totalPages={totalPages}
              isLoading={isLoading}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default People;
