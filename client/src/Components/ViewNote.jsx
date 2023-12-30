import React from "react";

const ViewNote = ({ note, onClose }) => {
  const dialogStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    background:
      "radial-gradient(circle, skyblue, seagreen, skyblue, lightgreen)",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
    zIndex: "1000",
    borderRadius: "10px",
    textalign: "center",
    alignItems: "center",
    paddingTop: "5%",
    width: "50%",
    height: "40%",
    overflowY: "auto",
  };

  const backdropStyle = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "999",
  };

  const closeButtonStyle = {
    cursor: "pointer",
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    border: "none",
    background: "none",
    color: "#333",
  };

  return (
    <div>
      <div style={backdropStyle} onClick={onClose}></div>
      <div style={dialogStyle}>
        <button style={closeButtonStyle} onClick={onClose}>
          X
        </button>
        <h1>Title: {note.title}</h1>
        <h1> Description:{note.description}</h1>
      </div>
    </div>
  );
};

export default ViewNote;
