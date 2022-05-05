const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.static("public"));

app.use(express.json());

app.use(cors());

const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
} = require("./controller");

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/blog.html"));
});

app.get("/api/posts", getPosts);
app.delete("/api/posts/:id", deletePost);
app.post("/api/posts", createPost);
app.put("/api/posts/:id", updatePost);

app.listen(4008, () => console.log(`Up on 4008`));
