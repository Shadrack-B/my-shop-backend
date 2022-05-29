import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    rating: { rate: Number, count: Number },
});

export default mongoose.model("Product", productSchema);
