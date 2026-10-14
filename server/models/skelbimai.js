import mongoose from "mongoose";

const skelbimuPost = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    text: {
        type: String,
        required: true
    }
});

// const Loginas = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     }
// })

const Skelbimas = mongoose.model("skelbimai", skelbimuPost);
// const LogIn = mongoose.model("login-register", Loginas)

export default Skelbimas;