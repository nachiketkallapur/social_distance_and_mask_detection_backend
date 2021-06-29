var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
var path = require("path");

/* GET home page. */
router.post('/', function (req, res, next) {
  const { subject, message, location, latitude, longitude, toEmail, allowedCapacity, observedCapacity,time } = req.body;
  console.log(req.body)
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nachiketgk.cs18@rvce.edu.in",
      pass: process.env.password,
    },
  });


  const handlebarOptions = {
    viewEngine: {
      extName: ".handlebars",
      partialsDir: path.resolve(__dirname, "templateViews"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "templateViews"),
    extName: ".handlebars",
  };

  transporter.use(
    "compile",
    hbs(handlebarOptions),
  );


  var mailOptions = {
    from: "nachiketgk.cs18@rvce.edu.in",
    to: toEmail,
    subject,
    template: "main",
    context: {
      message,
      location,
      latitude,
      longitude,
      time: new Date(parseInt(time)),
      allowedCapacity,
      observedCapacity
    }
  };



  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.send({ message: error.message, err: true });
      console.log("Error: ", error);
      //   alert(error.message)
    } else {
      res.send(
        {
          message: "Alert email sent to " + toEmail,
          err: false,
        },
      );
      //   alert(info.response);
      console.log("Email sent: " + info.response);
    }
  })
});

module.exports = router;
