import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Notyf } from "notyf";
import axios from "axios";

const DeleteMovie = ({ movie, onMovieDeleted }) => {
  const notyf = new Notyf();

  const [showDelete, setShowDelete] = useState(false);

  const openDelete = () => {
    setShowDelete(true);
  };

  const closeDelete = () => {
    setShowDelete(false);
  };

  const deleteMovie = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/movies/deleteMovie/${movie._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      if (response.status === 200) {
        notyf.success("Movie deleted successfully");
        onMovieDeleted(movie._id); // Notify parent component about the deletion
      } else {
        notyf.error("Failed to delete the movie");
      }
    } catch (error) {
      console.error("Error deleting the movie:", error);
      notyf.error("An error occurred while deleting the movie");
    } finally {
      closeDelete();
    }
  };

  return (
    <>
      <Button variant="danger" onClick={openDelete}>
        Delete
      </Button>

      {/* Delete Confirmation Modal */}
      <Modal show={showDelete} onHide={closeDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the movie{" "}
          <strong>{movie.title}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteMovie}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteMovie;
