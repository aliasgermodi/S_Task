const axios = require('axios')
exports.clientVerify = () => {
  return async function (req, res, next) {
    // const authorization = req.headers.authorization;
    axios.post("http://localhost:5001/verify", {}, { headers: req.headers }).then((res) => {
      console.log("user details ==> ", res.data)
      
      console.log("user req body details ==> ", req.body)
      req.body.user_id = res.data.data.id;
      req.body.user_name = res.data.data.name;
      if (res.data.data.role != "client") {
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
