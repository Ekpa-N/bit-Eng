require('dotenv').config();

const express = require('express');
const cors = require('cors');


const app = express();
const port = process.env.PORT



app.use(express.static(__dirname + '/dist'))
app.use(express.json())
app.use(cors())


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/dist/index.html')
})

app.listen(port, ()=> {
    console.log("server dey hear")
})