// Notes.js
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import Loader from "../Components/Loader";
import ViewNote from "../Components/ViewNote";
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

  const handleLogout = () => {};
  const handleCancel = () => {
    setviewnote(false);
  };
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, skyblue, seagreen)",
      }}
    >
    <div style={{marginLeft:"30px",display:"flex",justifyContent:"space-between",width: "90%",height: "100px"}}>

    <h1 style={{color:"white",marginTop:"20px"}}>Notes</h1>
    <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "100px",
          width: "80%",
          margin: "auto",
          marginLeft:"80%"
        }}
      >

        <Button variant="primary" onClick={handleShow}>
          Create Note
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Log out
        </Button>
    </div>
      
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "150px",
          width: "90%",
          margin: "auto",
        }}
      >
        {notes && notes.length > 0 ? (
          notes.map((note, index) => (
            <div
              key={index}
              style={{
                backgroundColor: getRandomColor(),
                padding: "10px",
                borderRadius: "5px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "10px",
                marginRight: "10px",
                cursor: "pointer",
                height: "200px",
                width: "300px",
              }}
            >
              <h2 style={{ marginTop: "30px" }}>{note.title}</h2>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "80%",
                  marginTop: "40px",
                }}
              >
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
          ))
        ) : (
          <div
            style={{
              gridColumn: "span 2",
              display: "flex",
              justifyContent: "center",
              margin: "auto",
              height: "100vh",
              width: "160vh",
            }}
          >
            <Loader />
          </div>
        )}
      </div>

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
