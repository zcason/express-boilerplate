export default function (error, req, res, next) {
    const { code, errors=[], message, meta, name, statusCode, title } = error;
    let responsePayload = {};
  
    switch (name) {
      case 'DatabaseError':
      case 'RouteError':
      case 'UnknownError':
      case 'UnprocessableEntity':
      case 'ValidationError':
        responsePayload = { errors, message };
    }
  
    res.status(statusCode).send(responsePayload);
};