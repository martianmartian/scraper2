var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/scrape', function(req,res){
 url='http://www.imdb.com/title/tt1229340/';
 request(url,function(error,response,html){
   if(!error){
    var $ = cheerio.load(html);
    var title,release,rating;
    var json = {title:"",release:"",rating:""};
    $('.header').filter(function(){
      var data=$(this);
      title=data.children().first().text();
      release=data.children().last().text()
      json.title=title;
    })
    $('.start-box-giga-star').filter(function(){
      var data=$(this);
      rating=data.text();
      json.rating = rating;
    })
    fs.writeFile('output.json',JSON.stringify(json,null,4),function(err){
      console.log("output success!")
    })
    res.send("yo what's up")
   }
 })

})

app.listen('8081')

console.log("Magic");
exports= module.exports = app;
