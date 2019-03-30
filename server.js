var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

const PORT = process.env.PORT;

var artists = [
    {
        id: 1,
        name: 'Metallica'
    },
    {
        id: 2,
        name: 'Iron Maiden'
    },
    {
        id: 3,
        name: 'Deep Purple'
    }
]

app.get('/', (req, res)=>{
    res.send('Hello API');
})

app.get('/artists/', (req, res)=>{
    res.send(artists);
})

app.get('/artists/:id', (req, res)=>{
    const id = Number(req.params.id);
    const artist = artists.find((artist)=>artist.id===id)
    res.send(artist);
})

app.post('/artists', (req,res)=>{
    var lastId = artists[artists.length-1].id
    var artist = {
        id: lastId + 1,
        name: req.body.name
    }
    artists.push(artist);
    res.send(artist)
})

app.put('/artists/:id', (req, res)=>{
    const artist = artists.find((artist)=>artist.id===Number(req.params.id))
    artist.name = req.body.name;
    res.sendStatus(200)
})

app.delete('/artists/:id', (req,res)=>{
    artists = artists.filter((artist)=>artist.id !== Number(req.params.id));
    res.sendStatus(200);
})

app.listen(PORT, ()=>{
    console.log('API app started');
})