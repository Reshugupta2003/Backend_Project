// Error is build-in class in node.js, we can extend it to create our own custom error class.
class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stack = []
  ){
     super(message)
     this.statusCode = statusCode;
     this.data = null;
     this.message = message;
     this.success = false;
     this.errors = errors

     if(stack){
        this.stack = stack
     }else{
      Error.captureStackTrace(this, this.constructor)
     }
  }
}

export {ApiError}