require('dotenv').config();
const express = require('express');
const app = express();

const dal = require('./dal.js');
const adminDal = require('./adminDal.js');

const PORT = process.env.PORT || '5000';

//enable CORS.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next(); 
});
// body parser middleware setup
app.use(express.json());

app.get('/api/echo', (req, res) => {
    res.send({success: true, message: `echo on port ${PORT}`});
})

app.post('/api/login', (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    dal.signIn(email, password)
    .then(userRes => JSON.stringify(userRes))
    .then(findata => res.send(findata));
})

app.post('/api/createuser', (req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const passwd = req.body.passwd;
    dal.createUser(name, email, passwd)
    .then(response => res.send(response[0]));
})

app.post('/api/edituser', (req,res) => {
    const name = req.body.displayNameE;
    const email = req.body.emailE;
    const uid  = req.body.uEuid;

    adminDal.editUser(name, email, uid)
    .then(response => res.send(user))
    .catch((err) => res.send(err));
})

app.post('/api/deleteuser', (req,res) => {
    const uid = req.body.uid;
    adminDal.deleteUser(uid)
    .then(response => res.send(response))
    .catch(err => res.send(err));
})

app.get('/api/allusers', (req, res) => {
    adminDal.listAllUsers()
    .then(response => res.send(response));
})

app.post('/api/invadd' , (req, res) => {
    const itemName = req.body.itemName;
    const count = req.body.count;
    const desc = req.body.desc;
    const imgUrl = req.body.dlUrl;
    dal.createNewItem(itemName, count, desc, imgUrl)
    .then(response => res.send(response))
    .catch(err => {
        console.log('error from DB: ' + err)
        res.send('error from DB: ' + err)
    })
})

app.get('/api/readinv', (req, res) =>  {
    dal.readInventory()
    .then(response => res.send(response))
    .catch(err => res.send(err));
})

// start server on port 5000
app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));    