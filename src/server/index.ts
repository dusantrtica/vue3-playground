import express, {Request, Response} from 'express';
import cors from 'cors';
import bodyParser, { json } from 'body-parser';
import { Post, thisMonth, thisWeek, today } from '../posts';
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';
import { NewUser, User } from '../users';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const allPosts = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

const SECRET = 'my-secret';
const COOKIE = 'vuejs-jwt';

function authenticate(id: string, req: Request, res: Response) {
    // create a token (sign it)
    const token = jsonwebtoken.sign({id}, SECRET, {
        issuer: 'vuejs',
        expiresIn: '30 days'
    });
    
    res.cookie(COOKIE, token, {httpOnly: true});    
}

app.get('/current-user', (req, res) => {
    try {
        const token = req.cookies[COOKIE];
        const result = jsonwebtoken.verify(token, SECRET) as {id: string};
        console.log(result);
        res.json({id: result.id});
        
    } catch(e) {
        res.status(404).end();
    }
});

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
    authenticate(user.id, req, res);
    const { password, ...rest } = user;
    res.json(rest);
});

app.post('/logout', (req, res) => {
    res.cookie(COOKIE, '', {httpOnly: true});
    res.status(200).end();
});

app.post<{}, {}, NewUser>('/login', (req, res) => {
    const targetUser = allUsers.find(x => x.username === req.body.username);
    if (!targetUser || targetUser?.password !== req.body.password) {
        res.status(401).end();
    } else {
        authenticate(targetUser.id, req, res);
        res.status(200).end();
    }
});


app.listen(8000, () => {
    console.log('Listening on port 8000');
});

