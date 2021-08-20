import { protectFunction } from '../services/protected';

export const protect = (req, res, next) => {
  let message = protectFunction(req.headers.authorization);
  
  if(message){
    return res.send({"data": message});
  }

  return res.status(403).json({status: 403, message: "Forbidden"});
}
