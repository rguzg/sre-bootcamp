import { loginFunction } from '../services/login';

export const login = async (req, res, next) => {  
  let username = req.body.username;
  let password = req.body.password;

  if(!username || typeof(username) != 'string' || !password || typeof(password) != 'string'){
    return res.status(400).json({status: 400, message: "Bad Request"});
  }

  let jwt = await loginFunction(username, password);
 
  if(jwt){
    let response = {
      "data": jwt
    };

    return res.send(response);
  } else {
    return res.status(403).json({status: 403, message: "Forbidden"});
  }
}
