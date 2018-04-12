var express = require('express');
var Document = require('../models/document');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');


function getDocuments(res){
  Document.find()
    .exec(function(err, documents){
      if(err){
        return res.status(500).json({
          title: "an error happened",
          error: err
        })
      }
      res.status(200).json({
        document: "success",
        obj: documents
      });
    });
}

var saveDocument = function (res, document){
  var response = res;
  document.save(function(err, result){
    res.setHeader('Content-TYpe', 'application/json');
    if(err){
      return res.status(500).json({
        title: "an error happened",
        error: err
      })
    }
      getDocuments(response);
    })
}

function deleteDocument(res, document){
  console.log(document);
  var response = res;
  document.remove(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: "an error happened",
        error: err
      })
    }
    getDocuments(response);
  })
}

router.get('/', function(req, res, next){
  getDocuments(res);
});

router.post('/', function(req, res, next){

var maxDocumentId = sequenceGenerator.nextId("documents");
// maxDocumentId = maxDocumentId.toString();
console.log(req.body);
var document = new Document({
  id: maxDocumentId,
  name: req.body.name,
  description: req.body.description,
  url: req.body.url
  });
saveDocument(res, document);
});

router.patch('/:id', function(req, res, next){
  Document.findOne({id: req.params.id}, function (err, document){
    if( err || !document){
      return res.status(500).json({
        title: "no document found",
        error: {document:"document not found"}
      });
    }
    document.name = req.body.name;
    document.description = req.body.description;
    document.url = req.body.url;

    saveDocument(res, document);
  });
});

router.delete('/:id', function(req, res, next){
  var query = {id: req.params.id};

  Document.findOne(query, function(err, document){
    if(err){
      return res.status(500).json({
        title: 'No document found',
        error: err
      });
    }
    if(!document){
      return res.status(500).json({
        title: 'No document found',
        error: {documentId: req.params.id}
      });
    }
    deleteDocument(res, document);
  });
});
module.exports = router;
