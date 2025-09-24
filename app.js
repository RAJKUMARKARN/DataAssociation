const express = require('express');
const app = express();
const userModel = require('./models/usermodel');
const postModel = require('./models/post');

app.get('/', (req, res) => {
  res.send('Hello World');
});

// ✅ Create user
app.get('/create', async (req, res) => {
  try {
    let user = await userModel.create({
      name: "Raj",        // fixed field
      age: 21,
      email: "rajkumarkarn002@gmail.com"
    });
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to create user" });
  }
});

// ✅ Create post and link to user
app.get('/post/create', async (req, res) => {
  try {
    // 1. Create a post
    const post = await postModel.create({
      postdata: "Hello Saare log Kaise Ho",
      user: "68d4002d129bcd5d94ae8730" // user ID
    });

    // 2. Find the user
    const user = await userModel.findById("68d4002d129bcd5d94ae8730");
    if (!user) return res.status(404).send({ error: "User not found" });

    // 3. Add post reference to user
    user.posts.push(post._id);

    // 4. Save updated user
    await user.save();

    res.send({ post, user });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to create post" });
  }
});

// ✅ Fetch user with populated posts
app.get('/user/:id', async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate('posts');
    if (!user) return res.status(404).send({ error: "User not found" });
    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Failed to fetch user" });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
