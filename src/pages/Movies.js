import React, { useEffect, useState } from "react";
import { Container, Col, Row, Card } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        "http://localhost:4000/movies/getMovies"
      );

      console.log(response);

      if (response.data.message === "No movies found") {
        setMessage("No movies found.");
        setMovies([]);
      } else {
        const movies = response.data.movies;
        setMovies(movies);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <Container
        className="d-flex flex-column align-items-center"
        style={{ height: "80vh" }}
      >
        <h1 className="text-white my-5">Explore Movies and TV Shows</h1>
        <Row className="d-flex">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <Col className="movie" key={movie._id}>
                <Card
                  className="d-flex flex-column mb-2 align-items-center p-3"
                  style={{ width: "12rem" }}
                >
                  <Card.Body>
                    <Card.Img src="/movie.png" />
                    <Card.Title className="text-center mt-4">
                      {movie.title}
                    </Card.Title>
                  </Card.Body>
                  <Card.Footer>
                    <Link
                      className="btn btn-dark w-100"
                      to={`/getMovie/${movie._id}`}
                    >
                      Details
                    </Link>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          ) : (
            <h5 className="text-center">{message}</h5>
          )}
        </Row>
      </Container>
    </>
  );
};

export default Movies;
