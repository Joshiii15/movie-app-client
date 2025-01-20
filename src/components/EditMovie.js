import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Notyf } from "notyf";
import axios from "axios";

const EditMovie = ({ movie }) => {
  console.log(movie);
  const notyf = new Notyf();

  const [movieId] = useState(movie._id);
  const [title, setTitle] = useState(movie.title);
  const [description, setDescription] = useState(movie.description);
  const [director, setDirector] = useState(movie.director);
  const [year, setYear] = useState(movie.year);
  const [genre, setGenre] = useState(movie.genre);

  const [showEdit, setShowEdit] = useState(false);

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
    setTitle("");
    setDescription("");
    setDirector("");
    setYear(0);
    setGenre("");
  };

  const editMovie = async (e, movieId) => {
    e.preventDefault();

    const response = await axios.patch(
      `http://localhost:4000/movies/updateMovie/${movieId}`,
      {
        title,
        description,
        director,
        year,
        genre,
      },
      {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    );

    console.log(response);
    if (response.status === 200) {
      notyf.success("Successfully updated");
      closeEdit();
    } else {
      notyf.error("Something went wrong");
      closeEdit();
    }
  };
  return (
    <>
      <Button variant="primary" onClick={() => openEdit()}>
        Edit
      </Button>

      {/* Update Modal */}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={(e) => editMovie(e, movieId)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Movie</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeEdit}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Submit
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditMovie;
