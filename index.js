
const express = require('express'), bodyParser = require('body-parser');
const cors = require('cors');


const app = express()


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.json());
const port = 3000


function reverse_str(string) {
    let str = ""
    for (var i = 0; i < string.length ; i++) {
        if (string.charAt(i) == string.charAt(i).toUpperCase()){
            str += string.charAt(i).toLowerCase()
        }
        else{
            str += string.charAt(i).toUpperCase()
        }
      }
    return str
}

function reverse_arr(array) {
    let arr = []
    for (var i = array.length - 1; i > -1 ; i--) {
        arr[array.length - i - 1] = (array[i]);
      }
    return arr
}


app.get('/sum', (req, res) => {
    let sum = parseInt(req.query.a) + parseInt(req.query.b)
    console.log(`req ${sum}`);
    res.status(200).json({sum})
});


app.get('/reversecase', (req, res) => {
    let result = reverse_str(req.query.strin)

    res.status(200).json({result})
});


app.get('/reversecasewow', (req, res) => {

    let result = reverse_arr(req.body.array)

    res.status(200).json({result})
 
});

app.get('/reversearray', (req, res) => {
    let result = reverse_arr(req.body.array)

    res.status(200).json({result})
});

app.get('/get', (req, res) => {
    console.log(`GET REQUEST!!!`);
    res.send(`GET REQUEST!!!`);
});

app.post('/post', (req, res) => {
    console.log(`POST REQUEST!!!`);
    res.send(`POST REQUEST!!!`);
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