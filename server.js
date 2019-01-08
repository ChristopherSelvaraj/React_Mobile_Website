var express = require('express');
var winston = require('winston');
var expressWinston = require('express-winston');
var expressjwt = require('express-jwt');
var path = require('path');

var session = require('./models/session.js');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./online-academy');

var app = express();
var port = 8080;
app.use(express.static(__dirname + '/_public'));

// authentication middleware
app.use(expressjwt({
    secret: session.jwtSecret
}).unless(function (req) {
    return (
        (req.originalUrl === '/' && req.method === 'POST') ||
        (req.originalUrl.match('/otp/*') && (req.method === 'POST' || req.method === 'GET') ||
        (req.originalUrl.match('/test/*'))) || /*short-circuited with true until JWT security is working*/true
    );
}));


// express-winston logger makes sense BEFORE the router.
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: true,
            colorize: true
        })
    ],
    msg: "HTTP {{req.method}} {{req.url}}",
}));

app.get("/api/v1/settings", (req, res) => {
  let sqlStr = 'SELECT * FROM Settings';
  db.all(sqlStr, [], (err, settings) => {
    if(err)
      res.status(500).send(JSON.stringify(err));
    else{
      res.status(200).send(JSON.stringify(settings));
    }
  });
})

app.get("/api/v1/headers", (req, res) => {
  let topicSQL = 'SELECT * FROM Topics';
  let headersSQL = 'SELECT * FROM Headers';
  db.all(headersSQL, [], (err, headers) => {
    if(err)
      res.status(500).send(JSON.stringify(err));
    else{
      db.all(topicSQL, [], (err, topics) => {
        if(err)
          res.status(500).send(JSON.stringify(err));
        else{
          var options = topics.map((topic, index) => {
            return {
              label : topic.label,
              URL : 'Topic/'+topic.id
            };
          });
          var result = headers.map((header, index) => {
            if(header.type == 'url')
              return header;
            else {
              header.options = options;
              return header;
            }
          })
          res.status(200).send(JSON.stringify(result));
        }
      })
    }
  });
});

app.get("/api/v1/topic/:topicId", (req, res) => {
  var topicId = req.params.topicId;
    let topicQuery = 'SELECT * FROM TOPICS WHERE Id = ' + topicId;
    console.log('first query: ' + topicQuery);
    db.all(topicQuery, [], (err, topic) => {
      if(err)
        res.status(500).send(JSON.stringify(err));
      else{
        if(topic.length != 1)
          res.status(500).send('wrong number of input for topic');
        console.log(JSON.stringify(topic));
        var videoIds = topic[0].videos;
        let videoQuery = 'SELECT * FROM Videos WHERE ID IN (' + videoIds + ')';
        console.log('second Query: ' + videoQuery);
        db.all(videoQuery, [], (erro, videos) => {
          if(err)
            res.status(500).send(JSON.stringify(err));
          else{
            videos.map(video => {
              video.content = JSON.parse(video.content);
              return video;
            })
            var result = {
              id : topicId,
              label: topic[0].Label,
              videos: videos
            }
            res.status(200).send(result);
          }
        })
      }
    });
  });

app.get("/api/v1/topics", (req, res) => {
  let topicsQuery = 'SELECT * FROM topics';
  db.all(topicsQuery, [], (err, topics) => {
    if(err)
      res.status(500).send(JSON.stringify(err));
    else{
      topics.map(topic => {
        return {id: topic.id, label: topic.label};
      });
      res.status(200).send(topics);
    }
  })
})

app.get("/api/v1/video", (req,res) => {
  var input = req.query;
  if(!input || !input.label || !input.url){
    res.status(404).send({status: "wrong input"});
    return;
  }
  var content =[
      {
        type : "heading",
        body : input.subheading
      },
      {
        type : "text",
        body : input.content
      }
  ]
  let insertQuery = 'INSERT INTO VIDEOS(url, content, label, courses, videoLabel) VALUES(?, ?, ?, ?, ?)';
  let data = [input.url, JSON.stringify(content), input.label, '', input.videoLabel];

  db.run(insertQuery, data, function(err){
    if(err){
      res.status(500).send(err);
    }else{
      var videoId = this.lastID;
      var selectTopic = 'SELECT videos FROM Topics WHERE Id = ?';
      db.all(selectTopic, [input.topicId], function(err, topics){
        if(err)
          res.status(500).send(err);
        else{
          var updateVideo = 'UPDATE TOPICS SET videos = ? WHERE Id = ?';
          console.log('topics>>>>>>>>>>>>>>>>>' + JSON.stringify(topics));
          db.run(updateVideo, [topics[0].videos + ',' + videoId, input.topicId], function(err){
            if(err)
              res.status(500).send(err);
            else{
              res.status(200).send({
                message: 'OK'
              })
            }
          })
        }
      })
    }
  });
});

app.get("/api/v1/reviews", (req, res) => {
  let selectReviews = "SELECT * FROM reviews";
  db.all(selectReviews, [], (err, reviews) => {
    if(err)
      res.status(500).send(err);
    else{
      res.status(200).send(reviews);
    }
  })
});

app.get("/api/v1/courses", (req, res) => {
  let coursesQuery = "SELECT * FROM courses";
  let courses = [];
  db.all(coursesQuery, [], (err, courses) => {
    if(err)
      res.status(500).send(err);
    else{
      let topicsQuery = 'SELECT Id, label FROM topics WHERE Id in ( ';
      courses.forEach(course => {
        topicsQuery = topicsQuery + course.topics + ',';
      })
      topicsQuery = topicsQuery.slice(0, -1);
      topicsQuery += ')';
      let topics = [];
      db.all(topicsQuery, [], (err, topics) => {
        if(err)
          res.status(500).send(err);
        else {
          courses = courses.map(course => {
            let topicIds = course.topics.split(',');
            course.topics = topics.filter((topic) => {
              let result = topicIds.includes(''+topic.id);
              //console.log('tpics: ' + JSON.stringify(topicIds) + ', contains: ' + topic.id + ', result=' + result);
              return result;
            })
            return course;
          });
          res.status(200).send(courses);
        }
      })
    }
  })
});


app.get("/topic/*", (req, res) => {
  res.sendFile(path.join(__dirname, '/_public', 'index.html'));
})

app.listen(port);
console.log("App listening on port " + port);
