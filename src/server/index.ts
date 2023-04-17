import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Post, thisMonth, thisWeek, today } from '../posts';
import { User } from '../users';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

app.get('/posts', (req, res) => {
    res.json(allPosts);
});

app.post<{}, {}, Post>('/posts', (req, res) => {
    const post = { ...req.body, id: (Math.random() * 10000).toFixed() }
    allPosts.push(post);
    res.json(allPosts);
});

app.post<{}, {}, User>('/users', (req, res) => {
    const user = { ...req.body, id: (Math.random() * 10000).toFixed() }
    allUsers.push(user);
    const { password, ...rest } = user;
    res.json(rest);
});


app.listen(8000, () => {
    console.log('Listening on port 8000');
});

