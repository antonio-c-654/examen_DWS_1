const express = require('express');
const router = express.Router();

const fs = require('fs');

const usuarios_json = fs.readFileSync('./usuarios.json', 'utf-8')
const usuarios = JSON.parse(usuarios_json)
// console.log(usuarios)

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('empecemos');
});
router.post('/', (req, res, next) => {
  res.render('login');
});


router.get('/login', (req, res, next) => {
  res.render('login');
});
router.post('/login', (req, res, next) => {
  // const {email, password} = req.body
  const datos_user = req.body
  const newUsuarios = []
  newUsuarios.push(usuarios)
  const encontrado = newUsuarios.find(u => u.email == datos_user.email && u.password == datos_user.password)
  console.log(encontrado)
  if (encontrado) {
    res.render('bienvenido');
  } else {
    res.redirect('login')
  }
});

router.get('/register', (req, res, next) => {
  res.render('register');
});
router.post('/register', (req, res, next) => {
  const datos_user = req.body
  const newUsuarios = []
  newUsuarios.push(usuarios)
  const existe_correo = newUsuarios.find(u => u.email == datos_user.email)
  if (existe_correo) {
    res.render('login');
  } else {
    // si no hay correo lo registro y modifico el json
    const newUserObj = {...req.body}
    newUsuarios.push(newUserObj)
    try {
      fs.writeFileSync('./usuarios.json', JSON.stringify(newUsuarios), 'utf-8')
    } catch (error) {
      console.log('error: ', error)
    }
    res.render('bienvenido');
  }
});

router.get('/bienvenido', (req, res, next) => {
  const user_prueba = {email: 'paco@gmail.com', password: 'pacooo'}
  res.render('bienvenido', user_prueba);
});

router.get('/recuperar', (req, res, next) => {
  res.render('recuperar');
});




module.exports = router;