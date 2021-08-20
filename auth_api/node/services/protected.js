import { verify } from "jsonwebtoken";

/**
 * If authorization is valid, returns a string, if not null is returned
 * @param {String} authorization 
 * @returns {String|null}
 */
export const protectFunction = (authorization) => {
  try{
    authorization = authorization.split('Bearer')[1].trim();

    let jwt =  verify(authorization, process.env.SECRET);

    if(jwt){
      return "You are under protected data";
    }
  } catch (_) {
    return null;
  }
}
