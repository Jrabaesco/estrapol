const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Ruta de registro
router.post('/register', async (req, res) => {
  const { username, password, name } = req.body;

  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: '❌ Usuario ya existe' });
    }

    user = new User({ username, password, name });
    await user.save();

    res.status(201).json({ msg: '✅ Usuario registrado', userId: user._id });
  } catch (err) {
    console.error('❌ Error en registro:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

// Ruta de login con JWT
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: '❌ Usuario no registrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: '❌ Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ msg: '✅ Login exitoso', token });
  } catch (err) {
    console.error('❌ Error en autenticación:', err.message);
    res.status(500).send('Error en el servidor');
  }
});

module.exports = router;