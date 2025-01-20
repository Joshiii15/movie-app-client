import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [message, setMessage] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        `http://localhost:4000/movies/getMovie/${movieId}`
      );

      console.log(response);
      if (response.data.message === "Movie not found") {
        setMessage("Movie not found");
        setIsAvailable(false);
      }

      setTitle(response.data.title);
      setYear(response.data.year);
      setGenre(response.data.genre);
      setIsAvailable(true);
    };
    fetchMovie();
  }, [movieId]);

  return (
    <>
      {!isAvailable ? (
        <h1 className="text-center">{message}</h1>
      ) : (
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ height: "80vh" }}
        >
          <Card
            className="d-flex flex-column align-items-center justify-content-center"
            style={{
              border: "none",
              width: "32rem",
              backgroundColor: "rgba(0, 0, 0, 0.0)",
            }}
          >
            <Card.Body className="text-center text-white">
              <Card.Img
                src="/movie.png"
                alt="Movie Thumbnail"
                style={{ maxHeight: "250px", objectFit: "contain" }}
              />
              <Card.Title className="mt-3">{title}</Card.Title>
              <Card.Text>Year: {year}</Card.Text>
              <Card.Text>Genre: {genre}</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      )}
    </>
  );
};

export default MovieDetails;
