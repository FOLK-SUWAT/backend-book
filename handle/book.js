var express = require("express");
const res = require("express/lib/response");

module.exports = {
  chackemailscroe: async function (books, body) {
    var scoreObject = JSON.parse(books.score);

    const result = scoreObject.filter((el) => {
      return el['email'] === body.email;
    });

    return result;
  },
};
