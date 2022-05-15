const nodemailer = require("nodemailer");

exports.getIndexPage = (req, res) => {
  console.log(req.session.userID)
  res.status(200).render('index', {
    page_name: "index"
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', {
    page_name: "about"
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: "register"
  });
};

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', {
    page_name: "login"
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: "contact"
  });
};


exports.sendEmail = async (req, res) => {
  const outputMessage = `
 <h1>Mail Details </>
 <ul>
 <li>Name: ${req.body.name}</li>
 <li>Email: ${req.body.email}</li>
 </ul>
 <h1>Message</h1>
  <p>${req.body.message}</p> 
 `

 let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: 'm.w.oguz@gmail.com', // generated gmail account
    pass:'sjvnenlhkxgjxtja', // generated gmail pass
  },
});

// send mail with defined transport object
let info = await transporter.sendMail({
  from: '"Smart EDU Contact👻" <m.w.oguz@gmail.com>', // sender address
  to: "m.w.oguz@gmail.com", // list of receivers
  subject: "Hello ✔", // Subject line 
  html: outputMessage, // html body
});

console.log("Message sent: %s", info.messageId);

res.status(200).redirect('contact');
};


