import express from "express";
import mongoose from "mongoose";
import Products from "./productSchema.js";
import cors from "cors";

// App Config
const app = express();
const port = process.env.PORT || 8000;
const connectionUrl =
    "mongodb+srv://admin:VgSkw0gCTL33Mttc@cluster0.gxtcu.mongodb.net/myShopDB?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(cors());

// DB Config
mongoose.connect(connectionUrl);

// Endpoints
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/products", (req, res) => {
    Products.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.post("/products", (req, res) => {
    const products = req.body;
    // console.log(products);
    Products.create(products, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.get("/product/:productId", (req, res) => {
    Products.find({ _id: req.params.productId }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.get("/products/:category", (req, res) => {
    Products.find({ category: req.params.category }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.get("/cart", (req, res) => {
    // console.log(req.query);
    const cartItemIds = Object.keys(req.query);
    Products.find(
        {
            _id: {
                $in: cartItemIds,
            },
        },
        (err, data) => {
            if (err) {
                res.status(500).send(err);
            } else {
                const prices = data.map(
                    (cartItem) => cartItem.price * req.query[cartItem._id]
                );
                console.log(prices);
                const total = prices.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                );
                console.log(total);

                res.status(200).send({ cart: data, subTotal: total });
            }
        }
    );
});

app.get("/categories", (req, res) => {
    Products.find({}, "category -_id", (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
// VgSkw0gCTL33Mttc;
