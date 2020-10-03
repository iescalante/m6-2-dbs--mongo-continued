const seats = {};
const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
for (let r = 0; r < row.length; r++) {
  for (let s = 1; s < 13; s++) {
    seats[`${row[r]}-${s}`] = {
      _id: `${row[r]}-${s}`,
      price: 225,
      isBooked: false,
    };
  }
}

console.log(seats);
const seatsArray = Object.values(seats);
console.log(seatsArray);

const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const seatImport = async () => {
  const client = await MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("ticket_booker");
    console.log("connected!");

    await db.collection("seats").insertMany(seatsArray);

    console.log("added to the collection!");
  } catch (err) {
    console.log(err.stack);
  }
  client.close();
  console.log("disconnected!");
};

seatImport();
