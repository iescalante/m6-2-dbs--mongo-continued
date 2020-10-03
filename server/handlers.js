"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const numOfRows = 8;
const seatsPerRow = 12;

const getSeats = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();

    const db = client.db("ticket_booker");
    console.log("connected!");

    const data = await db.collection("seats").find().toArray();
    console.log(data);
    // If I use forEach() method
    // const seatData = {};
    // data.forEach((seat) => {
    //   seatData[seat._id] = {
    //     ...seat,
    //   };
    // });

    //when using reduce method
    const seatData = data.reduce((acc, seat) => {
      return {
        ...acc,
        [seat._id]: {
          ...seat,
        },
      };
    }, {});

    res.status(200).json({
      status: 200,
      seats: seatData,
      numOfRows,
      seatsPerRow,
    });
  } catch (err) {
    console.log(err.stack);
    res.status(500).json({ status: 500, data, message: err.message });
  }

  client.close();
  console.log("disconnected!");
};

// getSeats();

module.exports = { getSeats };
