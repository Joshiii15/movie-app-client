import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { Notyf } from "notyf";
import axios from "axios";

const EditMovie = ({ movie, onUpdate }) => {
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
  };

  const editMovie = async (e) => {
    e.preventDefault();

    try {
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
        onUpdate(response.data.updatedMovie);
        closeEdit();
      } else {
        notyf.error("Something went wrong");
        closeEdit();
      }
    } catch (error) {
      console.error(error);
      notyf.error("Something went wrong");
    }
  };
  return (
    <>
      <Button variant="primary" onClick={() => openEdit()} className="mb-2">
        Edit
      </Button>

      {/* Update Modal */}
      <Modal show={showEdit} onHide={closeEdit}>
        <Form onSubmit={editMovie}>
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
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Director</Form.Label>
              <Form.Control
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Control
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
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
