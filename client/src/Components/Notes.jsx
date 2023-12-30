import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import Loader from "../Components/Loader";
import ViewNote from "../Components/ViewNote";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Notes = () => {
  const colors = [
    "seagreen",
    "skyblue",
    "violet",
    "#20B2AA",
    "#33DAD1",
    "#A6E9B5",
    "#20B2AA",
    "#C8F5F3",
  ];

  const getRandomColor = () =>
    colors[Math.floor(Math.random() * colors.length)];
    const navigate=useNavigate();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [selectedNote, setSelectedNote] = useState(null);
  const token = localStorage.getItem("token");
  const [viewnote, setviewnote] = useState(false);

  const handleClose = () => {
    setShowModal(false);
    setSelectedNote(null); // Reset selected note after closing the modal
  };

  const handleShow = () => setShowModal(true);

  const handleCreateNote = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        console.error("User not authenticated");
        return;
      }
      await axios.post("https://backend-7js1.onrender.com/create", newNote, {
        headers: {
          "Content-Type": "application/json",
          authorization: storedToken,
        },
      });

      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error creating note:", error.message);
    }
  };

  const handleDeleteNote = async (note) => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        console.error("User not authenticated");
        return;
      }

      await axios.delete(
        `https://backend-7js1.onrender.com/notes/${note._id}`,
        {
          headers: {
            authorization: storedToken,
          },
        }
      );

      fetchData();
    } catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  const handleEditNote = async () => {
    if (selectedNote) {
      try {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          console.error("User not authenticated");
          return;
        }

        await axios.put(
          `https://backend-7js1.onrender.com/notes/${selectedNote._id}`,
          newNote,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: storedToken,
            },
          }
        );

        fetchData();
        handleClose();
      } catch (error) {
        console.error("Error editing note:", error.message);
      }
    }
  };

  const fetchData = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        console.error("User not authenticated");
        return;
      }

      const response = await axios.get(
        "https://backend-7js1.onrender.com/notes",
        {
          headers: {
            authorization: storedToken,
          },
        }
      );

      if (response.status === 200) {
        setNotes(response.data);
      } else {
        console.error("Error fetching notes:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [newNote]);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    handleShow();
  };

  const handleViewNote = (note) => {
    setviewnote(true);
    setAllNotes(note);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    
    navigate('/login');
  };
  const handleCancel = () => {
    setviewnote(false);
  };

  return (
    <div
      className="container-fluid"
      style={{ background: "linear-gradient(to right, skyblue, seagreen)",minHeight: "100vh" }}
    >
      <Row className=" mb-4">
        <Col xs={12}>
          <h1 className="text-white">Notes</h1>
          <div className="d-flex justify-content-between align-items-center">
            <Button variant="primary" onClick={handleShow}>
              Create Note
            </Button>
            <Button variant="primary" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </Col>
      </Row>

      <Row>
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <Col key={index} md={2} sm={6} xs={12} className="mb-3" >
              <div
                className="card"
                style={{
                  backgroundColor: getRandomColor(),
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <div className="card-body">
                  <h2>{note.title}</h2>
                  <div className="d-flex justify-content-between mt-2">
                    <Button variant="danger" onClick={() => handleDeleteNote(note)}>
                      Delete
                    </Button>
                    <Button variant="primary" onClick={() => handleNoteClick(note)}>
                      Edit
                    </Button>
                    <Button variant="success" onClick={() => handleViewNote(note)}>
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col xs={12} className="text-center">
            <Loader />
          </Col>
        )}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedNote ? "Edit Note" : "Create Note"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={newNote.title}
                onChange={(e) =>
                  setNewNote({ ...newNote, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newNote.description}
                onChange={(e) =>
                  setNewNote({ ...newNote, description: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={selectedNote ? handleEditNote : handleCreateNote}
          >
            {selectedNote ? "Edit Note" : "Save Note"}
          </Button>
        </Modal.Footer>
      </Modal>

      {viewnote && <ViewNote note={allNotes} onClose={handleCancel} />}
    </div>
  );
};

export default Notes;
