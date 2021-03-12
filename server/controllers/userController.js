const { Todo, User } = require('../models/index');
const { comparePassword } = require('../helpers/passwordHelper');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static register(req, res, next) {
    const newAccount = {
      email: req.body.email,
      password: req.body.password
    }

    User.create(newAccount)
      .then(() => {
        res.status(201).json({ message: `user ${req.body.email} created` });
      })
      .catch(next);
  }

  static login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ where: { email } })
      .then(user => {
        if (user) {
          const comparedPassword = comparePassword(password, user.password);
          if (comparedPassword) {
            const name = email.split('@')[0];
            const payload = {
              id: user.id,
              email: user.email,
              name
            }
            const token = generateToken(payload);
            res.status(200).json({ token, name });
          } else {
            next({
              code: 401,
              message: 'Invalid Email or Password'
            })
          }
        } else {
          next({
            code: 401,
            message: 'Invalid Email or Password'
          })
        }
      })
      .catch(next)
  }

  static loginGoogle(req, res, next) {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    async function verify() {
      const ticket = await client.verifyIdToken({
          idToken: req.body.token,
          audience: process.env.GOOGLE_CLIENT_ID, 
      });
      const googleUserParams = ticket.getPayload();

      // lanjut proses login web
      User.findOrCreate({
        where: {
          email: googleUserParams.email
        },
        defaults: {
          password: (new Date()).toDateString() + googleUserParams.email
        }
      })
        .then(user => {
          const payload = {
            id: user[0].id,
            email: user[0].email,
            name: googleUserParams.given_name
          }
          const token = generateToken(payload);
          res.status(200).json({
            token,
            name: googleUserParams.given_name
          })
        })
    }
    verify().catch(console.error);
  }
}

module.exports = UserController;