const { response } = require("express");
const express = require("express");
const port = process.env.PORT || 3200;

const app = express();

app.get("/test", async (req, res) => {
    res.send("hello from server")
})

app.listen(port, (req, res) => {
    console.log(`Server running on port ${port}`);
})