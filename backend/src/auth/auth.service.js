const {
  subscribeTemplate,
  forgetPasswordTemplate,
  RegisteredTemplate,
  UpdateProfileTemplate,
  verifyTemplate,
  invitationChildTemplate,
  rejectInviteTemplate,
  acceptInviteTemplate,
  forgetPasswordTemplateMobile,
  superAdminDocumentTemplate,
  inviteProfileRegistrationEmail,
} = require("../utils/email-templates");
// const AWS = require('aws-sdk');
const {
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
  ///
  // S3_ENDPOINT,
  // S3_ACCESS_KEY_ID,
  // S3_SECRET_ACCESS_KEY,
  // S3_REGION,
  // S3_SIGNATURE_VERSION,
  // S3_BUCKET_URL,
} = require('config');

const ROLES = {
  1: 'SuperAdmin',
  3: 'School',
  4: 'Teacher',
  5: 'Student',
  6: 'Guardian',
};
const bcrypt = require('bcryptjs');
const {
  User,
  sequelize,
  Email} = require('../db');
const emailTransporter = require('../utils/email');
// const sendGridTransporter = require('../utils/sendgrid');;
const { generateJWT, verifyJWT } = require('../utils/jwt');
const { NotFoundError, BadRequestError } = require('../utils/api-errors');

// register 
const doRegister = async ({
  username,
  password,
  role_id,
  name,
  lname
}) => {
  email = username.toLowerCase();
  console.log(email + 'lokesh test');   
  const result = await sequelize.transaction(async (t) => {
    //const { Model, roleId } = getModelFromRole(role);
    roleId = '1';
    const user = await User.create(
      {
        username,
        password,
        roleId,
        name,
        lname
      },
      {
        transaction: t,
      },
    );


    return {
      userId: user.id,
      email,
      role_id,
      //userRoleId: model.id,
    };
  });
  // generate access token
  const payload = result;
  console.log(JWT_ACCESS_TOKEN_SECRET + 'lokesh');
  const token = await generateJWT({
    secretKey: JWT_ACCESS_TOKEN_SECRET,
    payload,
    signOption: {
      ...SIGN_OPTION,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  });
  const token1 = token.replace('Bearer ', '');
  return {
    access_token: token,
    ...payload,
  };
};


// register in user 
const dofrontRegister = async ({
  username,
  password,
  role_id,
  name,
  mobile,
  country_code
}) => {
  let email = username.toLowerCase();
  const result = await sequelize.transaction(async (t) => {
    const user = await User.create(
      {
        username,
        password,
        role_id,
        name,
        mobile,
        country: country_code,
        country_code
      },
      {
        transaction: t,
      },
    );
    function setRoleById(id) {
      if (id == 1) {
        return "Admin";
      } else if (id ==2) {
        return "Owner";
      } else if (id == 3) {
        return "Agent";
      }  else if (id == 4) {
        return "Builder";
      }
      else {
        return "Unknown"; // If the ID is not 1, 2, or 3, set the role as "Unknown."
      }
    }
    const role = setRoleById(role_id);
    console.log(role);
    const emailtempleate = await Email.findOne({
      where: {
        id:10
      },
    });

    let template;
    template = RegisteredTemplate({
      fromUser: "Property bull",
      fromEmail: "contact@propertybull.com",
      toEmail: email,
      Name:name,
      password: password, 
      html:emailtempleate.dataValues.description,
      subject:emailtempleate.dataValues.subject,
      role:role,
      mobile:mobile,
      username:username,
      site_url:'https://stage.propertybull.com'
    });
 await emailTransporter.send(template)
    return {
      userId: user.id,
      email,
      role_id,
      name
    };
  });
  const payload = result;
  console.log(JWT_ACCESS_TOKEN_SECRET + 'lokesh');
  const token = await generateJWT({
    secretKey: JWT_ACCESS_TOKEN_SECRET,
    payload,
    signOption: {
      ...SIGN_OPTION,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  });
  const token1 = token.replace('Bearer ', '');
  return {
    access_token: token,
    ...payload,
  };
};



//  use chack in mobile in data 
const doMobile = async ({
  mobile,
  BadRequestError
}) => {
  const isValidPass = (mobile);
  console.log(isValidPass);
  if (!isValidPass) throw new BadRequestError('Username or Password is invalid!');
  const data = await User.findOne({
    where: {
      mobile,
    },
  });
  if (data == null) throw new BadRequestError('mobile invaild');
  return data
};


// mobile  in otp to login use 
const doMobileToLogin = async ({
  mobile, otp,
  BadRequestError,
}) => {
  const isValidPass = (mobile, otp);
  console.log(isValidPass);
  if (!isValidPass) throw new BadRequestError('Username or Password is invalid!');
  const data = await User.findOne({
    where: {
      mobile, otp
    },
  });
  const payload = {
    email: data.username,
    otp,
    mobile,
    userId: data.id,
    userRoleId: data.id,
    roleId: data.role_id,
    name: data.name
  };
  const token = await generateJWT({
    secretKey: JWT_ACCESS_TOKEN_SECRET,
    payload,
    signOption: {
      ...SIGN_OPTION,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  });
  return {
    access_token: token,
    ...payload,
  };
};


// admin login 
const doLogin = async ({
  email,
  roleId,
  passedPassword,
  actualPassword,
  userId,
  firebaseToken,
}) => {
  email = email.toLowerCase();
  const isValidPass = bcrypt.compareSync(passedPassword, actualPassword);
  console.log(isValidPass);
  if (!isValidPass) throw new BadRequestError('Username or Password is invalid!');
  const userRole = await User.findOne({
    where: {
      id: userId,
      role_id: 1
    },
  });
  const payload = {
    firstName: userRole.firstName,
    lastName: userRole.lastName,
    email,
    userId,
    roleId: userRole.role_id,
    userRoleId: userRole.id,
  };
  const token = await generateJWT({
    secretKey: JWT_ACCESS_TOKEN_SECRET,
    payload,
    signOption: {
      ...SIGN_OPTION,
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    },
  });
  return {
    access_token: token,
    ...payload,
  };
};













//frontlogin
const dofrontLogin = async ({
  email,
  roleId,
  passedPassword,
  actualPassword,
  userId,
  firebaseToken,
}) => {
  email = email.toLowerCase();
  const isValidPass = bcrypt.compareSync(passedPassword, actualPassword);
  console.log(isValidPass);
  if (!isValidPass) throw new BadRequestError('Username or Password is invalid!');

  const userRole = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (userRole.status === "Y") {
    const payload = {
      firstName: userRole.firstName,
      lastName: userRole.lastName,
      email,
      userId,
      roleId: userRole.role_id,
      userRoleId: userRole.id,
    };
    const token = await generateJWT({
      secretKey: JWT_ACCESS_TOKEN_SECRET,
      payload,
      signOption: {
        ...SIGN_OPTION,
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
      },
    });
    return {
      access_token: token,
      ...payload,
    };
  } else {
    // If user status is not 'Y', handle the condition here
    // You can throw an error, return a specific message, or take any other action you want
    // For example, throwing an error:
    throw new BadRequestError('Your account is not active. Please contact support.');
  }
};


const doCheckUser = async ({ username }) => {
  username = username.toLowerCase();
  const agent = await User.findOne({
    where: {
      username: username
    },
  });
  //console.log(user);
  if (!agent) throw new NotFoundError('Agent not found!');
  return agent;
};




// use check email  
const doCheckUserExist = async ({ email }) => {
  email = email.toLowerCase();
  const user = await User.findOne({
    where: {
      username: email
    },
  });
  if (!user) throw new NotFoundError('User not found!');
  return user;
};
// do check user otp and mobile 
const doCheckUserExistOtp = async ({ mobile, otp }) => {
  const user = await User.findOne({
    where: {
      mobile,
      otp
    },
  });
  if (!user) throw new NotFoundError('User otp  not found!');
  if (user.otp === false) throw new NotFoundError('User otp  not found!');
  return user;
};



// do check mobile and update otp
const doCheckUserExistMobile = async ({ mobile, otp }) => {
  const user = await User.findOne({
    where: {
      mobile,
    },
  });
  if (!user) throw new NotFoundError('User not found!');
  const data = await User.update({ otp },
    {

      where: {
        id: user.dataValues.id,
      },
    },
  );
  return user
};





// get data in id

const doGetbyid = async ({
  id,
  BadRequestError,
  Role,
}) => {
  const data = await User.findOne({
    include: { model: Role },
    where: {
      id,
    },
  });
  if (data == null) throw new BadRequestError('Please try again later');
  return data
};


// upadate user in admin
const doUpdateUser = async ({
  id,
  User,
  filename,
  BadRequestError,
  UpdateData
}) => {
  var Image = filename;
  const { name, username, lname, mobile, password, fax, address } = UpdateData
  const data = await User.update({ name, username, lname, mobile, password, fax, address, Image },
    {
      where: {
        id: id,
      },
    },
  );
  console.log("🚀 ~ file: auth.service.js:447 ~ data:", data)

  if (data[0] == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};


// user profile update 
const doEditUserProfile = async ({
  id,
  BadRequestError,
  UpdateData,
  filename,
  User
}) => {
  var Image = filename

  const { name, address, description, mobile, mobileno, altemail, loc_ids, country_code,featured_mobile } = UpdateData
  if (Image !== null) {
    const data = await User.update({ name, address, description, mobile, mobileno, altemail, loc_ids, country_code, Image,featured_mobile },
      // const data = await User.update(UpdateData,

      {

        where: {
          id: id,
        },
      },
    );
    const userdata = await User.findOne({
      where: {
        id,
      },
    });
    const emailtempleate = await Email.findOne({
      where: {
        id:30
      },
    });
    let template;
    template = UpdateProfileTemplate({
      fromUser: "Property bull",
      fromEmail: "contact@propertybull.com",
      toEmail: userdata.username,
      Name:userdata.name,
      html:emailtempleate.dataValues.description,
      subject:emailtempleate.dataValues.subject,
      username:userdata.username,
      site_url:'https://stage.propertybull.com'
    });
 await emailTransporter.send(template);
 if (data == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  } else {

    const data = await User.update({ name, address, description, mobile, mobileno, altemail, loc_ids, country_code },
      // const data = await User.update(UpdateData,

      {

        where: {
          id: id,
        },
      },
    );
    const userdata = await User.findOne({
      where: {
        id,
      },
    });
    const emailtempleate = await Email.findOne({
      where: {
        id:30
      },
    });
    let template;
    template = UpdateProfileTemplate({
      fromUser: "Property bull",
      fromEmail: "contact@propertybull.com",
      toEmail: userdata.username,
      Name:userdata.name,
      html:emailtempleate.dataValues.description,
      subject:emailtempleate.dataValues.subject,
      username:userdata.username,
      site_url:'https://stage.propertybull.com'
    });
 await emailTransporter.send(template);
 if (data == 0) throw new BadRequestError("Id Not Match");
    return data[0];
  }
};


// do update password 

const doupdatepassword = async ({
  id,
  BadRequestError,
  password
}) => {

  const data = await User.update({ password },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

// user otp update in null
const doremark = async ({
  mobile,
  BadRequestError,
  otp
}) => {
  otp = (null)

  const data = await User.update({ otp },
    {
      where: {
        mobile
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

// const dofrogetpassword = async ({ username, password }) => {
//   const user = await User.findOne({
//     where: {
//       username
//     },
//   });
//   if (!user) throw new NotFoundError('User not found!');
//   // password = ("" + Math.random()).substring(2, 8);
//   password = '1234567';
//   const data = await User.update({ password },
//     {

//       where: {
//         id: user.dataValues.id,
//       },
//     },
//   );
//   return data;
// };

const doForgetPassword = async ({ User, username, BadRequestError, type }) => {
  const users = await User.findOne({
    where: {
      username
    },
  });
  if (!users) throw new NotFoundError('User not found!');
  const emailtempleate = await Email.findOne({
    where: {
      id:8
    },
  });
  if (!emailtempleate) throw new NotFoundError('User not found!');
  const randomstring =  ("" + Math.random()).substring(2, 8);;
  
  const user = await User.update(
    {
      password: randomstring,
    },
    {
      where: {
        username,
      },
    }
  );
  if (+user[0] === 0) throw new BadRequestError("Email not found");
  let email = username;
  let template;
    template = forgetPasswordTemplate({
      fromUser: "Property bull",
      fromEmail: "contact@propertybull.com",
      toEmail: email,
      Name:users.dataValues.name,
      password: randomstring, 
      html:emailtempleate.dataValues.description,
      subject:emailtempleate.dataValues.subject
    });
  const result = await emailTransporter.send(template);
  return {
    data: result,
    message: "Forget Password Successfully",
    success: true,
  };
};

module.exports = {
  doRegister,
  doLogin,
  doCheckUserExist,
  doGetbyid,
  doupdatepassword,
  doUpdateUser,
  dofrontRegister,
  doEditUserProfile,
  doMobile,
  doCheckUserExistMobile,
  doCheckUserExistOtp,
  doMobileToLogin,
  doremark,
  doCheckUser,
  dofrontLogin,
  doForgetPassword,
  
};

