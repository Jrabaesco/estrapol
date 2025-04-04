const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: 'username' },
      async (username, password, done) => {
        try {
          const user = await User.findOne({ username });

          if (!user) {
            return done(null, false, { message: '❌ Usuario no registrado' });
          }

          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
            return done(null, false, { message: '❌ Contraseña incorrecta' });
          }

          return done(null, user);
        } catch (err) {
          console.error('❌ Error en autenticación:', err);
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      console.error('❌ Error al deserializar usuario:', err);
      done(err);
    }
  });
};