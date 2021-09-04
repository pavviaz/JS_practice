const express = require('express')
const app = express()
const port = 3000
// app.use(
//     express.urlen coded({
//       extended: true
//     })
//   )
  
// app.use(express.json())



app.get('/get', (req, res) => {
    console.log(req.query);
    res.send(`GET REQUEST!!!`);
});

app.post('/post', (req, res) => {
    console.log(`GET REQUEST!!!`);
    res.send(`GET REQUEST!!!`);
})

app.put('/put', (req, res) => {
    console.log('PUT REQUEST!!!')
    res.send('PUT REQUEST!!!')
})

app.patch('/patch', (req, res) => {
    console.log('PATCH REQUEST!!!')
    res.send('PATCH REQUEST!!!')
})

app.delete('/delete', (req, res) => {
    console.log('DELETE REQUEST!!!')
    res.send('DELETE REQUEST!!!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})