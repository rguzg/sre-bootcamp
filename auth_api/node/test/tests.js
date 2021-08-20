/* 
  dotenv/config must be imported first so that all other imported modules 
  have access to the environment variables

  For more info check out: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
*/ 

import "dotenv/config";

import chai from 'chai';
// import * as chaiAsPromised from "chai-as-promised"; 
import { loginFunction } from '../services/login'
import { protectFunction } from '../services/protected'
import * as db from '../services/database';

// chai.use(chaiAsPromised);

const expect = chai.expect;

describe('loginFunction()', function () {
  it('Test login with correct credentials', async function () {
    expect("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI").to.be.equal(await loginFunction("admin", "secret"));
  });

  it('Test login with incorrect credentials', async function () {
    expect(await loginFunction("admin", "WRONGPa$$word")).to.be.null;
  });
});

describe('protectFunction()', function () {
  it('Test protected', function () {

    expect("You are under protected data").to.be.equal(protectFunction("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI"));
  });
});

describe('db.GetUser', () => {
  it('Requesting an existing user', async () => {
    let user = await db.GetUser("admin");

    expect({username: "admin", role: 'admin'}).to.eql(user);
  });

  it('Requesting a non-existant user', async () => {
    expect({}).to.eql(await db.GetUser("ThisIsANonExistantUser"));
  });
});

describe('db.ComparePasswords', () => {
  it("Comparing a user's correct password", async () => {
    expect(await db.ComparePasswords('admin', 'secret')).to.be.true;
  });

  it("Comparing a user's incorrect password", async () => {
    expect(await db.ComparePasswords('admin', 'IncorrectPasswordOMG')).to.be.false;
  });

  it("Comparing a non existant user's password", async () => {
    expect(await db.ComparePasswords('UserShouldNotExist', 'IncorrectPasswordOMG')).to.be.false;
  });
})