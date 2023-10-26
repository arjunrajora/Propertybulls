var  otpes =  ("" + Math.random()).substring(2, 8);
const projectenquiryAdd = ({ BadRequestError, doProjectenquiry,doCreateSession }) => async (httpRequest) => {
  const { fname, email, phone, country_code, pro_id, message ,otp} = httpRequest.body;  
  console.log("🚀 ~ file: projectenquiry.controller.js:10 ~ projectenquiryAdd ~ otp:", otp)
  const { error } = (httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const projectenquiryResult= await doCreateSession({
    phone,
    otp:otpes
   })
 
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Thank You for Contact With Us Your Requirement Information has been sent successfully to Owner.  !',
      data: projectenquiryResult,
    },
  };
};

const CheckUserExistOtp = ({ BadRequestError, doCheckUserExistOtp,doProjectenquiry }) => async (httpRequest) => {

  const { phone, otp , fname, email,country_code, pro_id, message} = httpRequest.body;
  if(otpes==otp){
    const projectenquiryResult = await doProjectenquiry({
      fname, email, phone, country_code, pro_id, message,otp
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Thank You for Contact With Us Your Requirement Information has been sent successfully to Owner.',
        data: projectenquiryResult,
      },
    };
  }else{
    throw new BadRequestError('User Otp not match');
  
  }

};


module.exports = {
  projectenquiryAdd,
  CheckUserExistOtp
  


}