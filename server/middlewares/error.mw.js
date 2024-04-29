const errorMiddleWare = (err, req, res, next) => {

   err.message || 'Internal Server Error!'
   err.statuscode ||= 500

  return res.status(err.status).json({success: false, message: err.message,})
}
// I'm not using it ! for now but we can use it if we want ...

module.exports = errorMiddleWare