const axios = require("axios");
const qs = require("qs");

const nodemailer = require("nodemailer");

const line_notify = async(token,message)=>{
    /**
   * Check permission component.
   * @param {string} token token line
   * @param {string} message
   * @returns void
   */
  try{
    const data = {
        message:message,
    };
    axios.post("https://notify-api.line.me/api/notify",
    qs.stringify(data),
    {
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            Authorization: 'Bearer'+token,
        }
    }
    );
  }catch(err){
    console.log(err.message);
  }
}

const email_notify = async(sendto,title,html)=>{
    /**
   * Check permission component.
   * @param {string} sendto mail
   * @param {string} title header mail
   * @param {string} html html
   * @returns void
   */
  try{
    const {EMAIL_USER,EMAIL_PASSWORD} = process.env;
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:465,
        secure:true,
        auth:{
            user:EMAIL_USER, //generated etheral user
            pass:EMAIL_PASSWORD, //generated etheral password
        }
    })

    let detail = {
        from: " Somehing header email",
        to:sendto,
        subject:title,
        html: `<div>${html}<div>`
    }

    transporter.sendMail(detail,(err)=>{
        if(err){
            console.log('it has an error',err)
        }
    })
  }catch(err){
    console.log(err.message);
  }
}

export {line_notify,email_notify};