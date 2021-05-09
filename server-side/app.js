const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8083;
const API = 'fynder'

app.use(cors())
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get(`/${API}/`, (req, res) => {
    res.send(`Fynder is running successfully.`)
})

const userRouter = require('./routes/user.router'); 
const followRouter = require('./routes/follow.router'); 
const blockRouter = require('./routes/block.router'); 
const postRouter = require('./routes/post.router');
const likeRouter = require('./routes/like.router');
const dislikeRouter = require('./routes/dislike.router');

app.use(`/${API}/`, userRouter);
app.use(`/${API}/`, followRouter);
app.use(`/${API}/`, blockRouter);
app.use(`/${API}/`, postRouter);
app.use(`/${API}/`, likeRouter);
app.use(`/${API}/`, dislikeRouter);


app.listen(port, () => {
    console.log(`Server listening on PORT: ${port}`)
});

module.exports = app;