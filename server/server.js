const app = require("./app");
const connectDB = require("./config/database");
const port = process.env.PORT || 4000;

connectDB();

app.get("/hello-world/test-api", (req, res) => {
  res.send("hello world")
});

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
