const enquiryAdd = ({ BadRequestError, doEnquiry, validateAddEnquiryData }) => async (httpRequest) => {
  const { f_name, email, phone, message } = httpRequest.body;

  const { error } = validateAddEnquiryData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);

  const enquiryResult = await doEnquiry({
    f_name, email, phone, message
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Thank you for send message!',
      data: enquiryResult,
    },
  };
};



module.exports = {
  enquiryAdd,


}