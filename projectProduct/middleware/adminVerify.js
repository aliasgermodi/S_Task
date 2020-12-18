const axios = require('axios')
exports.adminVerify = () => {
  return async function (req, res, next) {
    // const authorization = req.headers.authorization;
    axios.post("http://localhost:5001/verify", {}, { headers: req.headers }).then((res) => {
      console.log("user details ==> ", res.data.data.role)
      if (res.data.data.role != "admin") {
        const err = new Error("Operation not allowed");
        err.status = 402;
        next(err);
        return
      }
      next();
    }).catch((error) => {
      const err = new Error("Authorization Failed");
      err.status = 402;
      next(err);
    })
  };
};
