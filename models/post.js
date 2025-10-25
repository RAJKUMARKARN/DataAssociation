const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testingdatabase');

//  this is the post schema
const postSchema = mongoose.Schema(
    {
      postdata: String,
      user: { type: mongoose.Schema.Types.ObjectId,
              ref:'User'},
 
      date:{
        type: Date,
        default:Date.now,
      }


    }
)

module.exports= mongoose.model('Post', postSchema);