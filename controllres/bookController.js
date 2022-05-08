const modules = require("../models/index");
const bcrypt = require("bcrypt");
var serialize = require("serialize-javascript");
var pick = require("lodash/pick");
const jwt = require("jsonwebtoken");
const { isNil, isNull, isEmpty } = require("lodash");
require("dotenv").config();

//handle

const chack = require("../handle/book");
const book = require("../handle/book");

const saltRounds = 10;

//ลงทะเบียนหนังสือ รับค่ารายละเอียดหนังสือและemail
exports.registerbook = async (req, res, next) => {
  const body = req.body;
  const book = await modules.books.create({
    productname: body.productname,
    dtail: body.dtail,
    price: body.price,
    discount: body.discount,
    productowner: body.email,
    status: body.status,
    score: body.score,
  });

  res.status(202).send("Successfully");
};

//query หนังสือเฉพาะที่มีการเปิดมองเห็น คือ status = 0 และคำนวนscore โดยเอาคะแนนรวมกันทั้งหมดแล้ว / ด้วยจำนวนคนที่ลงคะแนน
exports.index = async (req, res) => {
  const bookslist = await modules.books.findAll({where:{status:0}});
  const books = [];
  for (const value of bookslist) {
      var scoreObject = JSON.parse(value.score);
      var sumscore = "0";
      const emailnum = scoreObject.length;
      for (const value2 of Object.values(scoreObject)) {
        sumscore = Number(value2.scores) + Number(sumscore);
  
        //console.log(value2.scores)
      }
      const newscore = Number(sumscore) / Number(emailnum);
  
      const book = {
        productname: value.productname,
        dtail: value.dtail,
        price: value.price,
        discount: value.discount,
        productowner: value.productowner,
        status: value.status,
        score: newscore,
      };
  
      books.push(book);
    
  }

  // console.log(books);
  //res.status(202).send("Successfully");
  // res.status(200).send(books)
  return res.send(books);
  /*res.status(200).json({
    data : books,
})*/
};



//อัพเดตข้อมูลสินค้าอัพเดตได้เฉพาะ ชื่อสินค้า รายละเอียดสินค้า ราคาขาย 
exports.update = async (req, res) => {
  const body = req.body;
  const books = await modules.books.findOne({
    where: {
      productowner: body.email,
      id: body.id,
    },
  });

  try {
    if (!isNull(books)) {
      const result = await modules.books.update(
        {
          productname: body.productname,
          dtail: body.dtail,
          price: body.price,
          discount: body.discount,
        },
        {
          where: {
            id: body.id,
          },
        }
      );
      res.status(200).json({
        data: 1,
      });
    } else {
      res.status(202).send("Fail");
    }
  } catch (error) {
    res.status(202).send("error");
  }
};

//ลบหนังสือ เช็คจาก id index หนังสือและemailผู้กดลบว่าตรงกันหรือไม่
exports.delete = async (req, res, next) => {
  const body = req.body;
  const books = await modules.books.destroy({
    where: {
      productowner: body.email,
      id: body.id,
    },
  });
  res.status(202).send(`Delete ${body.productname}`);
};

//ให้คะแนนหนังสือใช้วิธีเก็บtext json ลง Field
exports.updatescore = async (req, res) => {
  const body = req.body;
  var newscore = [];
  var books = await modules.books.findOne({
    where: {
      id: body.id,
    },
  });
  if (books.productowner != body.email) {
    const chackemailscroe = await chack.chackemailscroe(books, body);

    if (!isEmpty(chackemailscroe)) {
      res.status(202).send("user is already score");
    } else {
      var scoreObject = JSON.parse(books.score);
      for (oldscoreObject of scoreObject) {
        const oldscore = {
          email: oldscoreObject.email,
          scores: oldscoreObject.scores,
        };

        newscore.push(oldscore);
      }
      newscore.push({ email: body.email, scores: body.score });
      // console.log(newscore);

      const score = JSON.stringify(newscore);

      const result = await modules.books.update(
        {
          score: score,
        },
        {
          where: {
            id: body.id,
          },
        }
      );
      res.status(202).send(`user vote`);
    }
  } else {
    res.status(202).send("Fail");
  }
};

//เปิดปิดการมองเห็นหนังสือ
exports.updatestatus = async (req, res) => {
  const body = req.body;
  const books = await modules.books.findOne({
    where: {
      productowner: body.email,
      id: body.id,
    },
  });

  try {
    if (!isNull(books)) {
      const result = await modules.books.update(
        {
          status: body.status,
        },
        {
          where: {
            id: body.id,
          },
        }
      );
      res.status(200).json({
        data: 1,
      });
    } else {
      res.status(202).send("Fail");
    }
  } catch (error) {
    res.status(202).send("error");
  }
};
