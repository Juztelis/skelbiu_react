import React from 'react'
import { useState, useEffect } from 'react'

function Skelbimai() {
const [image, setImage] = useState("");
const [price, setPrice] = useState("");
const [text, setText] = useState("");
const [skelbimai, setSkelbimai] = useState([])
// const [change, setChange] = useState({
//     image: "",
//     price: "",
//     text: "",
// });

const handleSubmit = async (e) => {
  e.preventDefault()

  const payload = {
    image,
    price: Number(price),
    text
  }

  if (!image || !price || !text) {
    alert("Please fill in all fields");
    return;
  }

  try {
      const res = await fetch("http://localhost:5000/api/skelbimas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await res.json();
      alert("Added successfully");
    } catch (err) {
      alert("Failed to add");
    }
};

const getInfo = async (p) => {
  try {
    fetch("http://localhost:5000/api/skelbimas")
     .then((res) => res.json())
     .then((data) => {
      if(data.length>0 && data !== ""){
        setSkelbimai(data)
      } else {
        alert("No data found")
      }
     })
  } catch (err) {
    alert("Failed to get info")
  }
}

const deleteBtn = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/skelbimas/${id}`, {
        method: "DELETE"
    });
    const data = await res.json();
    setSkelbimai((prev) => prev.filter((item) => item._id !== id));
  } catch (err) {
    alert("Couldnt delete the post")
  }
}

// const updateBtn = async (id) => {

//   try {
//     const res = await fetch(`http://localhost:5000/api/skelbimas/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify()
//     });
//     const data = await res.json();
//     setSkelbimai(data)
//   } catch (err) {
//     alert("couldnt update the post")
//   }
// }

  return (
    <div>
      <h1>Skelbimai</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Ivesk nuotraukos url</label><br></br>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder="Image URL"
        /><br></br>
        <label>Ivesk kaina</label><br></br>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        /><br></br>
        <label>Ivesk teksta</label><br></br>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
        /><br></br>
        <button type="submit" onClick={handleSubmit}>Add</button>
      </form>
      <button onClick={getInfo}>Display data</button>
      {skelbimai.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={item.text} />
          <p>{item.text}</p>
          <p>{item.price} €</p>
          <button type="button" onClick={() => deleteBtn(item._id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default Skelbimai