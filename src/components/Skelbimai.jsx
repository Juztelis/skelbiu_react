import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Skelbimai() {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [text, setText] = useState("");
  const [skelbimai, setSkelbimai] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const LogOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const resetForm = () => {
    setEditId(null);
    setImage("");
    setPrice("");
    setText("");
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setImage(item.image);
    setPrice(item.price);
    setText(item.text);
  };

  const updateBtn = async (token, payload) => {
    try {
      const res = await fetch(`http://localhost:5000/api/skelbimas/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Update failed");

      setSkelbimai((prev) =>
        prev.map((item) =>
          item._id === editId ? { ...item, ...payload } : item,
        ),
      );
      resetForm();
      alert("Updated successfully");
    } catch (err) {
      alert("Couldnt update the post");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    const payload = {
      image,
      price: Number(price),
      text,
    };

    if (!image || !price || !text) {
      alert("Please fill in all fields");
      return;
    }

    if (editId) {
      await updateBtn(token, payload);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/skelbimas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      alert("Added successfully");
    } catch (err) {
      alert("Failed to add");
    }
  };

  const getInfo = async (p) => {
    const token = localStorage.getItem("token");

    try {
      fetch("http://localhost:5000/api/skelbimas", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0 && data !== "") {
            setSkelbimai(data);
          } else {
            alert("No data found");
          }
        });
    } catch (err) {
      alert("Failed to get info");
    }
  };

  const deleteBtn = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/skelbimas/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSkelbimai((prev) => prev.filter((item) => item._id !== id));
      if (editId === id) resetForm();
    } catch (err) {
      alert("Couldnt delete the post");
    }
  };

  return (
    <div>
      <button onClick={LogOut}>Log out</button>
      <h1>Skelbimai</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Ivesk nuotraukos url</label>
        <br></br>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        />
        <br></br>
        <label>Ivesk kaina</label>
        <br></br>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <br></br>
        <label>Ivesk teksta</label>
        <br></br>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
        />
        <br></br>
        <button type="submit" onClick={handleSubmit}>
          {editId ? "Update" : "Add"}
        </button>
        {editId && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>
      <button onClick={getInfo}>Display data</button>
      {skelbimai.map((item, index) => (
        <div key={index}>
          <img style={{ width: "150px" }} src={item.image} alt={item.text} />
          <p>Description: {item.text}</p>
          <p>Price: {item.price} €</p>
          <p>Posted by: {item._id}</p>
          <button type="button" onClick={() => handleEdit(item)}>
            Edit
          </button>
          <button type="button" onClick={() => deleteBtn(item._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Skelbimai;