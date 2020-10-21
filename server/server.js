const express = require('express');
const cors = require('cors');
const app = express();

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const port = 4000;

const ObjectId = require('mongoose').Types.ObjectId; 

mongoose.connect('mongodb://localhost/todo', {
  useUnifiedTopology: true,   
  useNewUrlParser: true
});

app.use(cors());
app.use(express.json());

 
const userSchema = new Schema({
    username: String,
    password: String
})

const User = mongoose.model('User',userSchema);
 
const todosSchema = new Schema({
  userId: mongoose.Schema.ObjectId,
    todos: [
      {
        checked: Boolean,
        text: String,
        id: String
      }
    ],
})

const Todos = mongoose.model('Todos',todosSchema);

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (user) {
      res.status(500);
      res.json({
        message: "user already exists",
      });
      return;
    }
    await User.create({ username, password });
    res.json({
      message: "success",
    });
  });

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();
    if (!user || user.password !== password) {
      res.status(401);
      res.json({
        message: "invalid login",
      });
      return;
    }
    res.json({
      message: "success",
    });
  });
  
  app.post("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const todos = await Todos.findOne({ userId: new ObjectId(user._id) }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});


  app.get("/todos", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [username, password] = token.split(":");
  const user = await User.findOne({ username }).exec();
  if (!user || user.password !== password) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const {todos} = await Todos.findOne({ userId: new ObjectId(user._id) }).exec();
  res.json(todos);
});

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", function () {
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  });
