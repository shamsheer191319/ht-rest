var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');
module.exports.getHotelsData=(req,res,next)=>{
  var offset = 0;var count = 5;
  console.log(req.query);
  if(req.query && req.query.offset && req.query.count){
    offset = parseInt(req.query.offset,10);
    count = parseInt(req.query.count,10);
  }
  Hotel.
  find()
  .skip(offset).limit(count)
  .exec(function (err,hotels){
    if(err){
      console.log(err);
      res.status(200)
      .json({
        error:err,
        message:'Unable to fetch Records'
      })
    }else{
      console.log(hotels.length);
      res.status(200)
      .json(hotels)
    }
    // db.close();
  }); //exec
}
module.exports.getHotelData=(req,res,next)=>{
  var hotelId = req.params.hotelId;
  console.log(hotelId);
  if (hotelId) {
    Hotel.
    findById(hotelId)
    .exec(function(err,hotel){
      res.status(200)
      .json(hotel);
    });
  }else{
    res.status(200)
    .json({message:"Hotel Id Not Found"});
  }
}
module.exports.addHotelNew=(req,res,next)=>{
  console.log('Add New Hotel');
  // var hotel = req.body;
  if(req.body  && req.body.name && req.body.stars
     && req.body.description){
       var hotel = new Hotel(req.body);
       hotel.save(function(err,response){
         if (err) {
           res.status(500)
           .json({
             message:"Hotel Insertion Failed",
             error:err
           }
           );
         }
         res.status(200)
         .json(response);
       });
     }else{
       console.log('Required Data is Missing');
       res.status(400).json({
         message:'Required Data is Missing'
       })
     }
}
module.exports.getHotelReviews=(req,res,next)=>{
  var hotelId = req.params.hotelId;
  console.log(hotelId);
  if (hotelId) {
    Hotel.
    findById(hotelId)
    .select('reviews')
    .exec(function(err,reviews){
      if (err) {
        res.status(404)
        .json({message:" Reviews are Not Found"});
      }
      res.status(200)
      .json(reviews);
    });
  }else{
    res.status(200)
    .json({message:"Hotel Id Not Found"});
  }
}
module.exports.getHotelOneReview=(req,res,next)=>{
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log(hotelId);
  if (hotelId) {
    Hotel.
    findById(hotelId)
    .select('reviews')
    .exec(function(err,reviewsHotel){
      if (err) {
        res.status(404)
        .json({message:" Reviews are Not Found"});
      }
      var review = reviewsHotel.reviews.id(reviewId)
      res.status(200)
      .json(review);
    });
  }else{
    res.status(200)
    .json({message:"Hotel Id Not Found"});
  }
}
async function getReviews(hotelId){
  if(!hotelId){
    throw new Error ('Hotel Id in not Found');
  }
  var reviews = await Hotel.findById(hotelId).select('reviews');
  return reviews;
}
module.exports.addHotelReview=(req,res,next)=>{
  try {
    var hotelId = req.params.hotelId;
    console.log(hotelId);
    console.log('--------------------------------');
    getReviews(hotelId).then((reviews)=>{
      var newR = reviews.reviews.push(req.body);
      console.log(reviews.reviews);
      var newReview = {$set:{'reviews':reviews.reviews}}
      Hotel.findByIdAndUpdate(hotelId,newReview,function(err,doc){
        if(err){
          res.status(500)
          .json({message:"Review is not Added"});
        }
        res.status(200)
        .json(doc);
      });
    });
  } catch (e) {
    res.status(200)
    .json({message:"Hotel Id Not Found",err:e});
  }

}
