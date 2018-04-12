var express = require('express');
var model = require('../models/contact');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

function getContacts(res){
  console.log("I am in getContacts(res) function")
  model.find()
  .populate('group')
    .exec(function(err, contacts){
      if(err){
        console.log("Error in getContacts")
        return res.status(500).json({
          title: "an error happened",
          error: err
        })
      }
      res.status(200).json({
        contact: "success",
        obj: contacts
      });
    });
}

var saveContact = function (res, contact){
  if(contact.group && contact.group.length > 0){
    for (let groupContact of contact.group) {
      groupContact = groupContact._id;
    }
  }
  console.log("save contact function called");
  contact.save(function(err, result){
    if(err){
      return res.status(500).json({
        title: "an error happened",
        error: err
      })
    }
      getContacts(res);
    });
}

function deleteContact(res, contact){
  var response = res;
  console.log("CONTACT TO DELTE: " + contact);
  contact.remove(function(err, result){
      if(err){
        return res.status(500).json({
          title: "an error happened",
          error: err
      })
    }
    getContacts(response);
    });
}


router.get('/', function(req, res, next){
  getContacts(res);
});

router.post('/', function(req, res, next){
  console.log("REQ BODY NAME: " + req.body.name);
var maxContactId = sequenceGenerator.nextId("contacts");
console.log("MAXCONTACTID: " + Number(maxContactId));
var contact = new model({
  id: maxContactId.toString(),
  name: req.body.name,
  email: req.body.email,
  phone: req.body.phone,
  imageUrl: req.body.imageUrl,
  group: req.body.group
  });
console.log(contact);
saveContact(res, contact);
});

router.patch('/:id', function(req, res, next){
  model.findOne({id: req.params.id}, function (err, contact){
    if( err || !contact){
      return res.status(500).json({
        title: "no contact found",
        error: {contact:"contact not found"}
      });
    }
    contact.name = req.body.name;
    contact.email = req.body.email;
    contact.phone = req.body.phone;
    contact.imageUrl = req.body.imageUrl;
    contact.group = req.body.group;

    saveContact(res, contact);
  });
});

router.delete('/:id', function(req, res, next){
  var query = {id: req.params.id};

  model.findOne(query, function(err, contact){
    if(err){
      return res.status(500).json({
        title: 'No contact found',
        error: err
      });
    }
    if(!contact){
      return res.status(500).json({
        title: 'No contact found',
        error: {contactId: req.params.id}
      });
    }
    deleteContact(res, contact);
  });
});

module.exports = router;
