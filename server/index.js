const express = require('express')
const app = express()
const port = 5000
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin:"*",
}));

// To fetch all the characters.
app.get('/homePage/:pg', async (req, res) => {
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/character/?page=${req.params.pg}`)
    
        const json = await data.json();
        res.send(json.results)
    } catch (error) {
        console.log(error)
    }

})

// To fetch the details of a single character with given id.
app.get('/character/:id', async (req, res) => {
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/character/${req.params.id}`)
        const json = await data.json()
    
        res.send(json)
        
    } catch (error) {
        console.log(error)
    }
})

// To search by name
app.get('/search/:name', async (req, res) => {
    try {
        const data = await fetch(`https://rickandmortyapi.com/api/character/?name=${req.params.name}`)
        const json = await data.json()
    
        res.send(json)
        
    } catch (error) {
        console.log(error)
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})