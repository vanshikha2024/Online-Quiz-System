const express = require("express");
const cors = require("cors");
const connection = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Quiz Server Running");
});

// Get Quiz Questions API
app.get("/questions", (req, res) => {

    const sql = "SELECT * FROM questions";

    connection.query(sql, (err, result) => {

        if (err) {
            res.status(500).send(err);
        }
        else {
            res.json(result);
        }

    });

});
// Add Question API
app.post("/add-question", (req, res) => {

    const {
        question,
        option1,
        option2,
        option3,
        option4,
        correctAnswer,
        category
    } = req.body;

    const sql = `
        INSERT INTO questions
        (question, option1, option2,
        option3, option4,
        correctAnswer, category)

        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(
        sql,
        [
            question,
            option1,
            option2,
            option3,
            option4,
            correctAnswer,
            category
        ],
        (err, result) => {

            if (err) {
                res.status(500).send(err);
            }
            else {
                res.send("Question Added");
            }

        }
    );

});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});