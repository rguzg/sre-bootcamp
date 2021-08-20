import { protectFunction } from '../services/protected';

export const protect = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(403).json({status: 403, message: "Forbidden"});
  }

  let authorization = req.headers.authorization.split('Bearer')[1];

  if(authorization){
    let message = protectFunction(authorization.trim());
  
    if(message){
      return res.send({"data": message});
    }
  }

  return res.status(403).json({status: 403, message: "Forbidden"});
}
