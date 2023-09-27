const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  address: {
    building: {
      type: String
    },
    coord: {
      type: [Number]
    },
    street: {
      type: String
    },
    zipcode: {
      type: String
    }
  },
  borough: {
    type: String
  },
  cuisine: {
    type: String
  },
  grades: [
    {
      date: {
        type: Date
      },
      score: {
        type: Number
      }
    }
  ],
  comments: [
    {
      date: {
        type: Date
      },
      comment: {
        type: String
      }
    }
  ],
  name: {
    type: String
  },
  restaurant_id: {
    type: String
  }
});

restaurantSchema.index({ 'address.coord': '2dsphere' });
module.exports = mongoose.model("Restaurant", restaurantSchema);


