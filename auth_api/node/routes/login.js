import { loginFunction } from '../services/login';

export const login = async (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  let jwt = await loginFunction(username, password);
 
  if(jwt){
    let response = {
      "data": jwt
    };

    res.send(response);
    next();
  } else {
    res.status(403).send("Forbidden");
  }

}
