/*
TODO:
* Criar um middleware para verificar se o usuário esta autenticado
* - receber o token bearer via header authorization
* - verificar se o token enviado é válido
* -- sendo válido devolver a resposta da requisição
* -- sendo inválido devolver o erro 401
*/

import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ errors: ["Login required"] });
  }
  const token = authorization.split(" ")[1];
  try {
    const userData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    req.userEmail = userData.email;
    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ errors: ["Invalid credentials"] });
  }
};
