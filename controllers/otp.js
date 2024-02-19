// Example mongodb ในตัวอย่างจะเป็นการใช้ mongodb นะครับ
const { line_notify, email_notify } = require("../helpers/sendMessage");
const User = require("../models/User.model");
const otpTool = require("otp-without-db");

exports.requrestOtp = async (req, res) => {
  /**
   * Check permission component.
   * @param {string} username
   * @param {string} permission something permission
   * @returns status, permission || message
   */
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUserByUsername(decoded.username);
    /// checkpermission something ,if true next step/
    const profile = User.find();

    const key = process.env.OTP_KEY;
    //create reference for opt (สร้างชื่ออ้างอิงค์สำหรับ otp)

    let charRef = "";
    for (let char = 1; char <= 4; c++) {
      let engChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let randomIndex = Math.floor(Math.random() * engChar.length);
      randomChar = uppercaseChars[randomIndex];
      charRef += randomChar;
    }
    //create ropt (otp)
    let otp = "";
    for (let i = 1; i <= 6; i++) {
      let randomOTP = Math.floor(Math.random() * 10);
      otp += randomOTP;
    }

    let hash = otpTool.createNewOTP(charRef, otp, key);

    if (typeof profile[0].linetoken != "undefined") {
      await line_notify(
        profile[0].linetoken,
        `(REF:${charRef} OTP IS : ${otp}`
      );
    }

    let html = `<div>REF:${charRef} OTP IS : ${otp}</div>`;
    if (typeof profile[0].email != "undefined") {
      await email_notify(profile[0].email, "OTP REQUEST", html);
    }

    ///permission pass
    res.json({status:200,charRef,hash});

  } catch (err) {
    console.log({status:err.status,messmage:err.message});
  }
};

exports.validateOTP = async(req,res)=>{
    try{
        const {charRefVerify,otpVerify,hashVerify} = req.body;
        const key = process.env.OTP_KEY;
        let validated = otpTool.verifyOTP(
            charRefVerify,
            otpVerify,
            hashVerify,
            key,
            "sha256"
        );
        res.status(200).json(validated);

    }catch(err){
            console.log({status:err.status,messmage:err.message});
    }
}