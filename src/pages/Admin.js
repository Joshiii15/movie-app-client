import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Table } from "react-bootstrap";
import EditMovie from "../components/EditMovie";
import DeleteMovie from "../components/DeleteMovie";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        "http://localhost:4000/movies/getMovies"
      );

      console.log(response);

      if (response.data.message === "No movies found") {
        setMovies([]);
      } else {
        setMovies(response.data.movies);
      }
    };
    fetchMovies();
  }, []);

  const handleMovieUpdate = (updatedMovie) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie._id === updatedMovie._id ? updatedMovie : movie
      )
    );
  };

  const handleMovieDelete = (deletedMovieId) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie._id !== deletedMovieId)
    );
  };

  const handleAddMovie = () => {
    navigate("/addMovie");
  };

  return (
    <>
      <Container>
        <div className="d-flex flex-column align-items-center">
          <h1 className="text-white text-center mt-5 mb-3">Admin Dashboard</h1>
          <Button className="btn btn-primary mb-3" onClick={handleAddMovie}>
            Add Movie
          </Button>
        </div>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Director</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td>{movie.director}</td>
                <td>{movie.year}</td>
                <td>{movie.genre}</td>
                <td className="d-flex flex-column">
                  <EditMovie movie={movie} onUpdate={handleMovieUpdate} />
                  <DeleteMovie
                    movie={movie}
                    onMovieDeleted={handleMovieDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default Admin;
