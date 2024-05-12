import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

class AuthController { 

  static signup = async (req, res) => {

    try { 

      const newUser = await User.create({
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        confirmarSenha: req.body.confirmarSenha
      });

      const secretKey = process.env.JWT_KEY;
      const expiresIn = process.env.JWT_EXPIRES_IN;

      const token = jwt.sign({ id: newUser._id }, secretKey, { expiresIn });

      res.status(201).json({
        status: 'success',
        token,
        expiresIn,
        expiresOn: new Date(Date.now() + Number(expiresIn))
      });
      
    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message
      });
    };

  };


  static login = async (req, res) => {

    try {

      const { email, senha } = req.body;

      if(!email || !senha) {
        return res.status(400).json({
          message: 'Por favor, informe email e senha!'
        });
      };

      const user = await User.findOne({ email: email }).select('+senha');

      if (!user || !await user.verificaSenha(senha, user.senha)) {
        return res.status(400).json({
          message: 'Email ou senha incorretos!'
        });
      };

      const secretKey = process.env.JWT_KEY;
      const expiresIn = process.env.JWT_EXPIRES_IN;

      const token = jwt.sign({ id: user._id }, secretKey, { expiresIn });

      // res.cookie('jwt', token, {
      //   expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
      //   httpOnly: true
      // });

      res.status(200).json({
        status: 'success',
        token,
        expiresIn,
        expiresOn: new Date(Date.now() + Number(expiresIn))
      });

    } catch (err) {
      res.status(400).json({
        status: 'error',
        message: err.message
      });
    };

  }

  // MIDDLEWARE PARA PROTEGER AS ROTAS
  static protect = (req, res, next) => {

    let token;
    // if (req.cookies.jwt) {
    //   token = req.cookies.jwt;
    // };
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    };

    if (!token) {
      return next(res.status(401).json({
        message: 'Por favor, entre com sua conta para conseguir o acesso.'
      }));
    };

    try {
      jwt.verify(token, process.env.JWT_KEY);
    } catch {
      return next(res.status(401).json({
        message: 'Token inválido, entre com sua conta novamente para conseguir o acesso.'
      }));
    }

    next();
  };

};

export default AuthController;