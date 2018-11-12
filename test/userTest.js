const supertest = require('supertest');
const server = require('../app');
const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
describe('server', () => {
  //PostsController stub
  const posts = {};
  const request = supertest(server);

  describe('POST /fg/api/v0/register.do', () => {
    it('user register and login OK', () =>{
        const userService = require('../users');
        // initialize test
        userService._deleteUser("testuser");

        request.post('/fg/api/v0/register.do').send({
                username:"testuser", 
                nickname:"test",
                phone:"17629006025",
                qq:"348767297",
                weixin:"348767297",
                password:"test123",
                verifyCode:"CXAW",
                encryptCode:"44313b7fdb97dc0040740c4912c6c7174b5e300f3e0ead5ac59c25b2a48c907d",
                platform:"pc",
                channel:"C0001",
                referer:"https://www.naotan020.com/?",
                uuid:"--MacOS-10.13.1-Chrome-69-1680*1050*2-jncmkgpr",
                siteId:"macau"
            })
            .end((err,res)=>{
                console.log(res);
                assert.isTrue(res.statusCode==201);
                expect(res.body.status).equal(0);
            });
        
        request.post("/fg/api/v0/login.do").send({
            username: "testuser",
            password: "",
        })
        .expect((res)=>{
            expect(res.statusCode).equal(200);
        });
    });
  });
});
