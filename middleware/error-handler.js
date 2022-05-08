
var getOr =require('lodash/fp')
const jwt =require('jsonwebtoken');
const config = process.env;

const errorhandler  = (err, req, res, next)=>{

  const { status } = err

  const message = getOr(null, 'errors[0].messages[0]', err) || err.message

  const code = status || 500
  if (code !== 500) {
    res.status(code).send(err)
  }

  const customError = {
    status,
    message: 'An Error Occured',
  }
  res.status(code).json(customError)
}



