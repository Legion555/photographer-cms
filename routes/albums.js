const router = require('express').Router();
const User = require('../models/User');

//create album
router.put('/createAlbum', async (req,res) => {
    User.updateOne(
        { _id: req.body.userId },
        { $push: {
            albums: {
                _id: req.body.albumId,
                name: req.body.albumName
                }
            }
        },
        (err, result) => {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        }
    );
})
//Delete album
router.put('/deleteAlbum', async (req,res) => {
    User.updateOne(
      { _id: req.body.userId },
      { $pull: { albums: {_id: req.body.albumId}}}, 
          {multi: true},
      function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
})

module.exports = router