
const mailer = require('nodemailer');

const sendingMail = async (to, subject, text) => {


    const transporter = mailer.createTransport({
        service: 'gmail',
        auth: {
            user: "doshisaumya7704@gmail.com",
            pass: "kiep crah cmjb mpro"
        }
    })

    const mailOptions = {
        from: 'doshisaumya7704@gmail.com',
        to: to,
        subject: subject,
        text: text

    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}


module.exports = {
    sendingMail
}
