const chai = require('chai');
const chaiHttp = require('chai-http');
var expect  = require('chai').expect;
const cheerio = require('cheerio')
const server = require('../app');
chai.should();

chai.use(chaiHttp);

describe('Server', function() {

  it('should redirect on youtube trends', (done) => {
    chai.request(server)
      .get('/').redirects(0)
      .end(function(err, res){
        res.should.have.status(302);
        res.should.redirectTo('/youtube?country=US');
        done();
      });
  });

  it('should open /youtube', (done) => {
    chai.request(server)
      .get('/youtube?country=US')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  });

  it('response should be html with correct title', (done) => {
    chai.request(server)
      .get('/youtube')
      .end(function(err, res){
        res.should.have.status(200);
        const $ = cheerio.load(res.text)
        expect($('title').text()).to.equal('Youtube Trends');
        const videoArray = $('#youtube .col-lg-4.col-md-6.col-sm-12');
        console.log(videoArray.length)
        done();
      });
  });
});

