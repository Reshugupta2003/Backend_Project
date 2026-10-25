// method 1 : using promise
// wraps an async function and catches any errors that occur during its execution, 
// passing them to the next middleware for error handling.

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next))
    .catch((err) => next(err));
 }
}

export {asyncHandler};



// const asyncHandler = (fn) => () => {};
// const asyncHandler = (fn) => {return async () => {}};
// const asyncHandler = () => {};


/* method 2 : using try catch block
const asyncHandler = (fn) =>  async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
       res.status(err.code || 500).json({
          status: "error",
            message: err.message || "Internal Server Error"
       })
    }
};
*/