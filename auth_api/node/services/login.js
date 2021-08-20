import { GetUser } from "./database";
import { ComparePasswords } from "./database";
import { sign } from "jsonwebtoken";

/**
 * Returns a JWT if the username and password are correct, otherwise it returns null
 * @param {String} username 
 * @param {String} password 
 * @returns {Promise<String>|Promise<null>}
 */
export const loginFunction = async (username, password) => {
  if(!username || typeof(username) != 'string' || !password || typeof(password) != 'string' ){
    throw new TypeError("Arguments should be a string");
  }

  let isPasswordValid = await ComparePasswords(username, password);

  if(isPasswordValid){
    let {role} = await GetUser(username);
    let jwt = sign({role}, process.env.SECRET, {noTimestamp: true});

    return jwt
  }
  
  return null;
}