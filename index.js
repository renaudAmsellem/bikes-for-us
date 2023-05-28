const express = require("express");
const app = express();
const axios = require("axios");

app.listen(8080, () => {
  console.log("server running on 8080");
});

const bikesCode = {
  vaeMontain: "%7B%22153%22%3A1%7D",
  vaePlain: "%7B%22156%22%3A1%7D",
  classic: "%7B%2285%22%3A1%7D",
};

const isBikeAvailable = (stock) => {
  for (const agency of stock) {
    if (agency.availability !== "UNAVAILABLE") return true;
  }
  return false;
};

app.get("/", (req, res) => {
  axios
    .get(`https://boutique.veloplus-m.fr/pu/sites/stock?offer_quantities=${bikesCode.classic}`)
    .then((bikeRes) => {
      const bikeAvailable = isBikeAvailable(bikeRes.data);
      res.send(bikeAvailable);
    })
    .catch((err) => {
      console.log("Error: ", err.message);
    });
});
