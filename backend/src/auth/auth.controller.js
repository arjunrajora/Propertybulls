// login to  admin 
const login = ({
  doCheckUserExist,
  doLogin,
  validateUserLoginData,
  BadRequestError,
}) => async (httpRequest) => {
  //console.log(httpRequest.body);
  const { email, password, firebaseToken } = httpRequest.body;
 // console.log(email);
  const userData = await doCheckUserExist({
    email,
  });
  const { error } = validateUserLoginData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  if (userData.isActive === false) throw new BadRequestError('User Blocked by super Admin');
  if (userData.isEmailVerified === false && userData.roleId != 5) throw new BadRequestError('Please verify your email');
  const loginData = {
    email,
    userId: userData.id,
    roleId: userData.roleId,
    passedPassword: password,
    actualPassword: userData.password,
    userRoleId: userData.userRoleId,
    firebaseToken,
  };
  const loginDetails = await doLogin(loginData);
  // console.log("loginData=>>>",loginData);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Successfully logged in!',
      data: loginDetails,
    },
  };
};



// login in front 
const frontTologin = ({
  doCheckUserExist,
  dofrontLogin,
  validateUserLoginData,
  BadRequestError,
}) => async (httpRequest) => {
  //console.log(httpRequest.body);
  const { email, password, firebaseToken } = httpRequest.body;
 // console.log(email);
  const userData = await doCheckUserExist({
    email,
  });
  const { error } = validateUserLoginData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  if (userData.isActive === false) throw new BadRequestError('User Blocked by super Admin');
  if (userData.isEmailVerified === false && userData.roleId != 5) throw new BadRequestError('Please verify your email');
  // do login
  const loginData = {
    email,
    userId: userData.id,
    roleId: userData.roleId,
    passedPassword: password,
    actualPassword: userData.password,
    userRoleId: userData.userRoleId,
    firebaseToken,
  };
  const loginDetails = await dofrontLogin(loginData);
  // console.log("loginData=>>>",loginData);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Successfully logged in!',
      data: loginDetails,
    },
  };
};
// mobile to chick use 

const MobileToRegister= ({
  doMobile,
  BadRequestError,
  doCheckUserExistMobile
}) => async (httpRequest) => {
  //console.log(httpRequest.body);
  const { mobile,otp} = httpRequest.body;
  const userData = await doCheckUserExistMobile({
    mobile,
    otp
  });    
  if (userData.status==="N") throw new BadRequestError('You are account not active ');
  console.log("🚀 ~ file: auth.controller.js:93 ~ userData.status:", userData.status)
  if (userData.isActive === false) throw new BadRequestError('User Blocked by super Admin');
  if (userData.isEmailVerified === false && userData.roleId != 5) throw new BadRequestError('Please verify your email');
  // do login
  const loginData = {
   mobile,
   userId: userData.id,
   roleId: userData.roleId,
   name: userData.name,
  };
  const loginDetails = await doMobile(loginData);
  // console.log("loginData=>>>",loginData);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Successfully mobile in!',
      data: loginDetails,
    },
  };
};


// register in user 
const register = ({
  BadRequestError,
  doCheckUserExist,
  doRegister,
  validateUserRegisterData,
  subscribeTemplate,
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
  EMAIL,
  INVITATION_TOKEN_EXPIRES_IN,
  emailTransporter,
}) => async (httpRequest) => {
  const {
    username,
    password,
    role_id,
    email,
    gender,
    name,
    lname
  } = httpRequest.body;
  try {
    await doCheckUserExist({
      username,
    });
  } catch (err) {
    // user doesn't exist
    const { error } = validateUserRegisterData(httpRequest.body);
    if (error) throw new BadRequestError(error.message);
    const registerResult = await doRegister({
      username,
      password,
      role_id,
      email,
      gender,
      name,
      lname
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Registered successfully!',
        data: registerResult,
      },
    };
  }
  throw new BadRequestError('User already exist!');
};



// get data in id 
const Getbyid = ({
  doGetbyid,
  User,
  Role
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  
  const data = await doGetbyid({
    id,
    User,
    Role
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched user successfully!',
      data,
    },
  };
};


//update in password

const updatePasssword = ({
  doupdatepassword,
  User,
  BadRequestError,
  validatePasswordUpdateData
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  let  {password }  = httpRequest.body;
  const { error } = validatePasswordUpdateData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doupdatepassword({
    id,
    password,
    BadRequestError,
    password,
    
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: ' updated User Password successfully!',
      data,
      
    },
  };
};

//edit profile 
const EditUserProfile = ({
  doEditUserProfile,User,
  BadRequestError,
  validateUserUpdateProfileData
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  UpdateData  = httpRequest.body;
  var  filename;
  if(httpRequest.file){
    var  {filename} = httpRequest.file;
  }  
  console.log(filename,'dd');
  const data = await doEditUserProfile({
    id,
    User,
    BadRequestError,
    UpdateData,
    filename
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'User Profile  updated successfully!',
      data,
    },
  };
};
 

//update user 

const updateUser = ({
  doUpdateUser,
  User,
  BadRequestError,
  validateUserUpdateData
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const  UpdateData  = httpRequest.body;
  const {filename} = httpRequest.file;

  const data = await doUpdateUser({
    id,
    User,
    BadRequestError,
    UpdateData,
    filename
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'User updated successfully!',
      data,
    },
  };
};
//register in user

const frontregister = ({
  BadRequestError,
  doCheckUser,
  validateUserRegisterDataFrontend,
  dofrontRegister,
  subscribeTemplate,
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
  EMAIL,
  INVITATION_TOKEN_EXPIRES_IN,
  emailTransporter,
}) => async (httpRequest) => {
  const {
    username,
    password,
    role_id,
    name,
    mobile,
    country_code
  } = httpRequest.body;
  try {
     await doCheckUser({
      username,
    });
    
  } catch (err) {
    const { error } = validateUserRegisterDataFrontend(httpRequest.body);
    if (error) throw new BadRequestError(error.message);
    const registerResult = await dofrontRegister({
      username,
      password,
      role_id,
      name,
      mobile,
      country_code 
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Registered successfully!',
        data: registerResult,
      },
    };
  }
  throw new BadRequestError('User already exist!');
};



// login to mobile and otp
const loginToMobile = ({
  doCheckUserExistOtp,
  doMobileToLogin,
  BadRequestError,
}) => async (httpRequest) => {
  const { mobile,otp } = httpRequest.body;
  const userData = await doCheckUserExistOtp({
   mobile,otp
  });
  
  if (userData.isActive === false) throw new BadRequestError('User Blocked by super Admin');
  if (userData.otp === false) throw new BadRequestError('User otp not found');
  const loginData = {
    otp,
    mobile,
    email: userData.usernmae,
    userId: userData.id,
    roleId: userData.roleId,
    name:userData.name,
  };
  console.log(loginData,"loginData");
  const loginDetails = await doMobileToLogin(loginData);
  // console.log("loginData=>>>",loginData);
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Successfully logged in!',
      data: loginDetails,
    },
  };
};

// re mark otp 

const remarkotp = ({
  doremark,
  BadRequestError,
}) => async (httpRequest) => {
  let  {otp,mobile}  = httpRequest.body;
  const data = await doremark({
    mobile,
    BadRequestError,
    otp,
  
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: ' resand otp successfully!',
      data,
      
    },
  };
};

// const forgotPasssword = ({
//   BadRequestError,
//   dofrogetpassword,
//   username
// }) => async (httpRequest) => {
//   const {username}=httpRequest.body
//     const data = await dofrogetpassword({
//       username
//     });
//   return {
//     statusCode: 200,
//     body: {
//       success: true,
//       message: 'Fetched User  successfully!',
//       data,
//     },
//   };
// };





const forgetPassword = ({ User, doForgetPassword, BadRequestError }) => async (
  httpRequest,
) => {
  const { email } = httpRequest.body;
  const result = await doForgetPassword({
    User,
    username:email,
    BadRequestError,
  });

  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Email sent',
      data: result,
    },
  };
};

module.exports = {
  register,
  login,
  Getbyid,
  updateUser,
  updatePasssword,
  frontregister,
  EditUserProfile,
  MobileToRegister,
  loginToMobile,
  remarkotp,
  frontTologin,
  forgetPassword,
};
