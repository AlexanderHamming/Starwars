import { useEffect, useState } from "react";
import { getFilms } from "../../services/StarWarsAPI";
import { Film, FilmResponse } from "../../types/Films";
import { Container, Row, Col, Card, Alert, Spinner } from "react-bootstrap";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/Search_Bar";
import { Link } from "react-router-dom";

const Films = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchFilms = async (page: number, query: string = "") => {
      setIsLoading(true);
      try {
        const data: FilmResponse = await getFilms(page, query);
        setFilms(data.data);
        setTotalPages(data.last_page);
        setHasNextPage(data.next_page_url !== null);
        setHasPreviousPage(data.prev_page_url !== null);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error"));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms(currentPage, searchQuery);
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
      <h1>Films</h1>

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
            {films.map((film) => (
              <Col key={film.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
                <Link to={`/films/${film.id}`}>
                  <Card>
                    <Card.Img
                      variant="top"
                      src={film.image_url}
                      alt={film.title}
                      height={400}
                    />
                    <Card.Body>
                      <Card.Title id="card-title">{film.title}</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>

          {films.length > 0 && (
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

export default Films;
