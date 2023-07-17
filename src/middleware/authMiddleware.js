const jwt = require("jsonwebtoken")

const middleWare = async function (req, res, next) {

    let token = req.headers['x-api-key']
    if (!token) 
    {
        return res.send({ status: false, Message: 'No token found' })
    }
    else 
    {
        let decodedtoken = jwt.verify(token, 'Group2')
        if (decodedtoken.length != 0) {
            // req.decodedtoken = decodedtoken;
            req.authorId = decodedtoken
            next();
        } else {
            res.status(404).send({ Message: "Not valid Token" })
        }
    }
    
}
module.exports.middleWare = middleWare;

// Middleware for validating mandatory fields and empty values
exports.validateFields = (fields) => {
    return (req, res, next) => {
      const missingFields = fields.filter(field => !(field in req.body));
  
      if (missingFields.length > 0) {
        return res.status(400).json({ error: `Missing fields: ${missingFields.join(', ')}` });
      }
  
      const emptyFields = fields.filter(field => req.body[field] === '');
  
      if (emptyFields.length > 0) {
        return res.status(400).json({ error: `Empty fields: ${emptyFields.join(', ')}` });
      }
      next();
    };
  };

// const jwt = require('jsonwebtoken')

// const middleWare = async (req, res, next) => {
//     try {
//         const token = req.header('x-api-key')
//         if (!token) {
//             res.status(403).send({ status: false, message: `Missing authentication token in request` })
//             return;
//         }
//         const decoded = jwt.verify(token, 'Group2')

//         if (!decoded) {
//             res.status(403).send({ status: false, message: `Invalid authentication token in request` })
//             return;
//         }
//         req.userId = decoded.userId;
//         next()
//     } catch (error) {

//         res.status(500).send({ status: false, message: error.message })
//     }
// }
// module.exports = middleWare