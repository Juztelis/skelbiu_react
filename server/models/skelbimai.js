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

const Skelbimas = mongoose.model("skelbimai", skelbimuPost);

export default Skelbimas;