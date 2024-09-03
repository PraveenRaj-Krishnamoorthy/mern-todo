// Express
const express = require("express");

// create and instance of express
const app = express();

// port
const PORT = 8081;

const cors = require("cors")

app.use(express.json());
app.use(cors());

let todos = [];
// connecting mongodb
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/mern-app")
    .then((response) => console.log("DB Connected")
    ).catch((err) => {
        console.log(err);
    })

// creating schema
const todoSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    description: String
})

// creating model
const todoModel = mongoose.model("Todo", todoSchema);


// routing
app.get("/", (req, res) => {
    res.send("Hello")
})

// get all data
app.get("/todos", async (req, res) => {
    try {
        const todos = await todoModel.find();
        res.json(todos)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
    res.json(todos)
})

// post new data
app.post("/todos", async (req, res) => {
    try {
        const { title, description } = req.body
        const newTodo = new todoModel({ title, description });
        await newTodo.save()
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

app.put("/todos/:id", async (req, res) => {
    try {
        const { title, description } = req.body;
        const id = req.params.id;
        const updatedTodo = await todoModel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        )
        if (!updatedTodo) {
            // 404 when no data is found
            return res.status(404).json({ message: "Todo Not Found" })
        } else {
            res.json(updatedTodo)
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

app.delete("/todos/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await todoModel.findByIdAndDelete(id)
        res.status(204).end()
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
})

app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server Running at: ${PORT}`);
    } else {
        console.log(err);
    }
})