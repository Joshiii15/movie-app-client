import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { Notyf } from "notyf";
import axios from "axios";

const AddMovie = () => {
  const notyf = new Notyf();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState(0);
  const [genre, setGenre] = useState("");

  const createMovie = async (e) => {
    e.preventDefault();

    let token = localStorage.getItem("access");

    const response = await axios.post(
      "http://localhost:4000/movies/addMovie",
      {
        title,
        description,
        director,
        year,
        genre,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    if (response.data) {
      setTitle("");
      setDescription("");
      setDirector("");
      setYear(0);
      setGenre("");

      notyf.success("Movie Added");
      navigate("/admin");
    } else {
      console.error(response.error);
      notyf.error("Something went wrong");
    }
  };
  return (
    <>
      <Container className="d-flex flex-column align-items-center text-white">
        <h1 className="text-white mt-3">Add Product</h1>
        <Form
          onSubmit={(e) => createMovie(e)}
          style={{ width: "50%" }}
          className="mx-auto"
        >
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Director</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter director"
              required
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter year"
              required
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter genre"
              required
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex flex-column align-items-center">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddMovie;
