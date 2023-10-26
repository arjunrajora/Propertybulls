
const {
    Staticpage,
    sequelize,
  } = require('../../db');
  
  const { generateJWT, verifyJWT } = require('../../utils/jwt');
  
  const { NotFoundError, BadRequestError } = require('../../utils/api-errors');
  

  
  //View AboutUspage
  const doGetAboutus = async ({
    BadRequestError,
  
 
  }) => {
    const staticpage = await Staticpage.findAll({
      where: {
        id:76
      }
    });
    if (staticpage[0] == 0) throw new BadRequestError('Please try again later');
    return staticpage;
  };
  


   //View Helpage
   const doGetHelp = async ({
    BadRequestError,
  
 
  }) => {
    const staticpage = await Staticpage.findAll({
      where: {
        id:40
      }
    });
    if (staticpage[0] == 0) throw new BadRequestError('Please try again later');
    return staticpage;
  };
  

   //View Privacy&policy
   const doGetPrivacy = async ({
    BadRequestError,
  }) => {
    const staticpage = await Staticpage.findAll({
      where: {
        id:44
      }
    });
    if (staticpage[0] == 0) throw new BadRequestError('Please try again later');
    return staticpage;
  };

  
   //View Terms&Conditions
   const doGetTerms = async ({
    BadRequestError,
  }) => {
    const staticpage = await Staticpage.findAll({
      where: {
        id:77
      }
    });
    if (staticpage[0] == 0) throw new BadRequestError('Please try again later');
    return staticpage;
  };


  module.exports = {
    
    doGetAboutus,
    doGetHelp,
    doGetPrivacy,
    doGetTerms,
   
  };
  
  