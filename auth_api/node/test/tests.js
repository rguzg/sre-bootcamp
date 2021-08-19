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
  it('Test login', function () {

    expect("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYWRtaW4ifQ.StuYX978pQGnCeeaj2E1yBYwQvZIodyDTCJWXdsxBGI").to.be.equal(loginFunction("admin", "secret"));
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

  // it('username argument is not a string', async () => {
  //   (await db.GetUser(5)).should.be.rejected;
  //   // expect(await db.GetUser({})).to.throw();
  //   // expect(await db.GetUser(null)).to.throw();
  // });

  // it('username argument is missing', async () => {
  //   expect(await db.GetUser()).to.throw();
  // });
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

  // it("Comparing an empty user and password", async () => {
  //   expect(await db.ComparePasswords('', '')).to.throw;
  // });
})