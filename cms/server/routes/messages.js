var express = require('express');
var model = require('../models/message');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');



function getMessages(res){
  model.find()
    .exec(function(err, messages){
      if(err){
        return res.status(500).json({
          title: "an error happened",
          error: err
        })
      }
      res.status(200).json({
        message: "success",
        obj: messages
      });
    });
}

function saveMessage(res,message){
  var response = res;
  message.save(function(err, result){
    if(err){
      return res.status(500).json({
        title: "an error happened",
        error: err
      })
    }
      getMessages(response);
    });
}

function deleteMessage(res, message){
  var response = res;
  message.remove()
    .exec(function(err, result){
      if(err){
        return res.status(500).json({
          title: "an error happened",
          error: err
      })
    }
    getMessages(res);
    });
}

router.get('/', function(req, res, next){
  getMessages(res);
});

router.post('/', function(req, res, next){
  var response = res;
var maxMessageId = sequenceGenerator.nextId("messages");
var message = new model({
  id: maxMessageId,
  subject: req.body.subject,
  msgText: req.body.msgText,
  sender: req.body.sender
  });
saveMessage(response, message);
});

router.patch('/:id', function(req, res, next){
  var response = res;
  model.findOne({id: req.params.id}, function (err, message){
    if( err || !message){
      return res.status(500).json({
        title: "no message found",
        error: {message:"message not found"}
      });
    }
    message.subject = req.body.subject;
    message.msgText = req.body.msgText;
    message.sender = req.body.sender;

    saveMessage(response, message);
  });
});

router.delete('/:id', function(req, res, next){
  var query = {id: req.params.id};

  Message.findOne(query, function(err, message){
    if(err){
      return res.status(500).json({
        title: 'No message found',
        error: err
      });
    }
    if(!message){
      return res.status(500).json({
        title: 'No message found',
        error: {messageId: req.params.id}
      });
    }
    deleteMessage(res, message);
  });
});

module.exports = router;
