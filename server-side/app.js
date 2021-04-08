const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8083;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/', (req, res) => {
    res.send("API is running successfully.")
})

const userRouter = require('./routes/user.router'); 
const postRouter = require('./routes/post.router') ;

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(port, () => {
    console.log(`Server listening on PORT: ${port}`)
});