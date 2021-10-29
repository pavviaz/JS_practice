
const express = require('express');
const http = require('http');
const cors = require('cors');
const apiTodosRouter = require('./controllers/api-todos.controller');
const testRouter = require('./controllers/test.controller');
const { notFound, errorHandler, asyncHandler } = require('./middlewares/middlewares');
const { initDB } = require('./dataBase');

//Init zone
const app = express();

//InitDB
initDB();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// const LocalStorage = require('node-localstorage').LocalStorage,
// localStorage = new LocalStorage('./scratch.txt');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.json());
app.use(express.json());
const port = 3000


app.use((req, res, next) => {
  console.log('URL = ', req.url);
  console.log('Original_URL = ', req.originalUrl);
  console.log('METHOD = ', req.method);
  console.log('HOST = ', req.headers.host);
  console.log('IsSecure = ', req.secure);
  console.log('BODY', req.body);
  console.log('QUERY', req.query);

  next();
});

app.use('/api/todos', apiTodosRouter);
app.use('/test', testRouter);

app.use(notFound);
app.use(errorHandler);

//Create server
http.createServer(app).listen(3000, () => {
  console.log('Server is working on port 3000');
});




// let stack = []
// load()

// function reverse_str(string) {
//     let str = ""
//     for (var i = 0; i < string.length ; i++) {
//         if (string.charAt(i) == string.charAt(i).toUpperCase()){
//             str += string.charAt(i).toLowerCase()
//         }
//         else{
//             str += string.charAt(i).toUpperCase()
//         }
//       }
//     return str
// }

// function reverse_arr(array) {
//     let arr = []
//     for (var i = array.length - 1; i > -1 ; i--) {
//         arr[array.length - i - 1] = (array[i]);
//       }
//     return arr
// }

// function save(param)
// {
//     localStorage.setItem("param", param)
// }

// function load()
// {
//     if (!localStorage.getItem("param")){
//         return
//     }
//     let k = localStorage.getItem("param").split(",")
//     for(var l in k) {
//         stack.push(k[l])
//     }
// }

// async function bebra(){
//     try 
//     {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } 
//     catch (error) 
//     {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// bebra()

// const ToDo = sequelize.define('User', {
//     // Model attributes are defined here
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: DataTypes.STRING
//       // allowNull defaults to true
//     }
//   }, {
//     // Other model options go here
//   });


// app.post('/strings', (req, res) => {

//     for(var k in req.body) {
//         stack.push(req.body[k])
//     }

//     save(stack)

//     res.send(`strings sent`);

// });


// app.get('/strs', (req, res) => {
//     res.status(200).json({stack})
// });


// app.delete('/strings', (req, res) => {
//     let index = req.query.param
//     if (index == undefined) {
//         stack = []
//       }
//     else if (index >= 0 && index <= stack.length - 1)
//     {
//         stack.splice(index, 1);
//     }
//     else{
//         res.send(`error!!!`);
//     }

//     save(stack)

//     res.status(200).json({stack})
// });


// app.get('/sum', (req, res) => {
//     let sum = parseInt(req.query.a) + parseInt(req.query.b)
//     console.log(`req ${sum}`);
//     res.status(200).json({sum})
// });


// app.get('/reversecase', (req, res) => {
//     let result = reverse_str(req.query.strin)

//     res.status(200).json({result})
// });


// app.get('/reversearray', (req, res) => {
//     let result = reverse_arr(req.body.array)

//     res.status(200).json({result})
// });


// app.get('/get', (req, res) => {
//     console.log(`GET REQUEST!!!`);
//     res.send(`GET REQUEST!!!`);
// });


// app.post('/post', (req, res) => {
//     console.log(`POST REQUEST!!!`);
//     res.send(`POST REQUEST!!!`);
// })


// app.put('/put', (req, res) => {
//     console.log('PUT REQUEST!!!')
//     res.send('PUT REQUEST!!!')
// })


// app.patch('/patch', (req, res) => {
//     console.log('PATCH REQUEST!!!')
//     res.send('PATCH REQUEST!!!')
// })


// app.delete('/delete', (req, res) => {
//     console.log('DELETE REQUEST!!!')
//     res.send('DELETE REQUEST!!!')
// })


// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })