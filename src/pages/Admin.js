import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import EditMovie from "../components/EditMovie";

const Admin = () => {
  const [movies, setMovies] = useState([]);
  const [moviesArr, setMoviesArr] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await axios.get(
        "http://localhost:4000/movies/getMovies"
      );

      console.log(response);

      if (response.data.message === "No movies found") {
        setMovies([]);
      } else {
        const movies = response.data.movies;
        setMovies(movies);
      }
    };
    fetchMovies();
  }, []);

  useEffect(() => {
    const moviesArr = movies.map((movie) => {
      return (
        <tr key={movie._id}>
          <td>{movie.title}</td>
          <td>{movie.description}</td>
          <td>{movie.director}</td>
          <td>{movie.year}</td>
          <td>{movie.genre}</td>
          <td>
            <EditMovie movie={movie} />
          </td>
        </tr>
      );
    });
    setMoviesArr(moviesArr);
  }, [movies]);

  return (
    <>
      <h1>Admin Dashboard</h1>
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
        <tbody>{moviesArr}</tbody>
      </Table>
    </>
  );
};

export default Admin;
