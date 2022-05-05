let globalId = 3;

let posts = [
  {
    id: 1,
    title: "Who's gonna win the cup this year?",
    body: "I'm not sure, but it seems like the Hurricanes have a solid chance.",
  },
  {
    id: 2,
    title: "The Sharks didn't do too well this season.",
    body: "I'm hoping for a better season next year. They've got some promising young talent that I'm excited to see.",
  },
];

module.exports = {
  getPosts: (req, res) => {
    res.status(200).send(posts);
  },

  deletePost: (req, res) => {
    let split = req.params.id.split("-");
    let index = posts.findIndex((item) => +item.id === +split[1]);
    posts.splice(index, 1);
    res.status(200).send(posts);
  },

  createPost: (req, res) => {
    let { title, body } = req.body;
    let newPost = {
      id: globalId,
      title,
      body,
    };
    posts.push(newPost);
    res.status(200).send(posts);
    globalId++;
  },

  updatePost: (req, res) => {
    console.log("hit");
    const { title, body } = req.body;
    let index = posts.findIndex((item) => +item.id === +req.params.id);

    if (index !== -1) {
      posts[index].title = title ? title : posts[index].title;
      posts[index].body = body ? body : posts[index].body;
      return res.status(200).send(posts);
    } else {
      res.status(400).send("Failed to edit post");
    }
  },
};
