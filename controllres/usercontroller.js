const modules = require("../models/index");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var pick = require("lodash/pick");
const jwt = require("jsonwebtoken");
const { isNil, isNull } = require("lodash");
require("dotenv").config();

// register ข้อมุ, Users
exports.register = async (req, res, next) => {
  const body = req.body;
  //const result = await modules.users.create(body)
  const emailcheck = await modules.users.findOne({
    where: { email: body.email },
  });
  console.log(emailcheck);
  if (`${emailcheck}` != "null") {
    res.status(202).send("Fail");
  } else {
    const users = await modules.users.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phonenumber: body.phonenumber,
      password: await bcrypt.hash(body.password, saltRounds),
      token: (token = jwt.sign(
        {
          users_email: body.email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      )),
    });

    res.status(202).send("Successfully");
  }
  /* res.status(200).json({
       data : emailcheck,
   })*/
};

//Login User และ update Token โดยเก็บtokenไว้2ชัวโมง
exports.login = async (req, res) => {
  const body = req.body;
  const passwordform = body.password;

  const {email,phonenumber,firstName,lastName,password} = await modules.users.findOne({
    where: { email: body.email },
  });
  const updatetoken = await modules.users.update(
    {
      token: (token = jwt.sign(
        {
          users_email: body.email,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      )),
    },
    {
      where: {
        email: body.email,
      },
    }
  );

  bcrypt.compare(passwordform, password, function (err, results) {
    if (err) {
      throw new Error(err);
    }
    if (results) {
      res.status(200).json({
        token: token,
        Users:email,phonenumber,firstName,lastName
      });
    } else {
      res.status(202).send("Fail");
    }
  });
};

//update ข้อมูล User
exports.update = async (req, res) => {
  const body = req.body;
  const email = await modules.users.findOne({
    where: {
      email: body.email,
    },
  });

  try {
    if (!isNull(email)) {
      const result = await modules.users.update(
        {
          lastName: body.lastName,
        },
        {
          where: {
            email: body.email,
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

//ลบ user
exports.delete = async (req, res, next) => {
  const body = req.body;
  const email = await modules.users.destroy({ where: { email: body.email } });
  res.status(202).send("delete");
};
