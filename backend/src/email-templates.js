const { WEB_URL, EMAIL, EMAIL_PASS, EMAIL_HOST } = require('config');


const forgetPasswordTemplate = ({ fromUser, fromEmail, toEmail, Name, password, subject, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{Name}/g, Name).replace(/{password}/g, password).replace(/{site_url}/g, "https://www.propertybull.com/").replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{html}/g, html),

  password: password,
  template_id: "d-67b60cd879a64256847be80c5924029b",
});

//Registered users in web 
const RegisteredTemplate = ({ fromUser, fromEmail, toEmail, username, Name, mobile, role, password, subject, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{mobile}/g, mobile).replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{site_url}/g, "https://www.propertybull.com/").replace(/{username}/g, username).replace(/{role}/g, role).replace(/{password}/g, password).replace(/{html}/g, html),

  password: password,
  template_id: "d-67b60cd879a64256847be80c5924029b",
});
const UpdateProfileTemplate = ({ fromUser, fromEmail, toEmail, username, site_url, Name, subject, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{site_url}/g, site_url).replace(/{username}/g, username),
  template_id: "d-67b60cd879a64256847be80c5924029b",
});
const ChangePasswordTemplate = ({ fromUser, fromEmail, toEmail, username, Name, mobile, role, password, subject, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{mobile}/g, mobile).replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{username}/g, username).replace(/{password}/g, password).replace(/{role}/g, role).replace(/{password}/g, password).replace(/{html}/g, html),
  password: password,
  template_id: "d-67b60cd879a64256847be80c5924029b",
});
const SandLoaninquryTemplate = ({ fromUser, fromEmail, toEmail, Name, occup,
  email,
  mobile,
  location,
  dob,
  loan_type,
  gross_salary,
  monthly_salary, subject, html }) => ({
    from: `"${fromUser}" <${fromEmail}>`,
    to: toEmail,
    subject: subject,
    html: html.replace(/{name}/g, Name).replace(/{mobile}/g, mobile).replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{location}/g, location).replace(/{occup}/g, occup).replace(/{loantype}/g, loan_type).replace(/{email}/g, email).replace(/{gross_salary}/g, gross_salary).replace(/{monthly_salary}/g, monthly_salary).replace(/{dob}/g, dob).replace(/{site_name}/g, "propertybull.com").replace(/{html}/g, html),
    template_id: "d-67b60cd879a64256847be80c5924029b",
  });


// subscribe Newsletter
const subscribeTemplate = ({ fromUser, fromEmail, toEmail, username, subject, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, username).replace(/{html}/g, html),


  template_id: "d-67b60cd879a64256847be80c5924029b",
});

// Requirement Add 
const RequirementaddTemplate = ({ fromUser, fromEmail, toEmail, Name, subject, html, budget, room, build, category, Address, PropertyType }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{html}/g, html).replace(/{budget}/g, budget).replace(/{build}/g, build).replace(/{room}/g, room).replace(/{looking}/g, category).replace(/{site_name}/g, "propertybull.com")
    .replace(/{admin_username}/g, "contact@propertybull.com").replace(/{address}/g, Address).replace(/{type}/g, PropertyType),

  template_id: "d-67b60cd879a64256847be80c5924029b",
});


// Requirement  send to Admin
const adminRequirementTemplate = ({ fromUser, fromEmail, toEmail, username, subject, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, username).replace(/{html}/g, html),


  template_id: "d-67b60cd879a64256847be80c5924029b",
});







// Contact Now
const propertyInquiryTemplate = ({ fromUser, fromEmail, toEmail, Name, Mobile, subject, html, Email, PropertyId, ownername, Price, Propertyname }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{html}/g, html).replace(/{ownermobile}/g, Mobile).replace(/{owneremail}/g, Email).replace(/{pid}/g, PropertyId).replace(/{ownername}/g, ownername).replace(/{price}/g, Price).replace(/{pname}/g, Propertyname).replace(/{admin_username}/g, "contact@propertybull.com").replace(/{site_name}/g, "propertybull.com"),


  template_id: "d-67b60cd879a64256847be80c5924029b",
});
const propertyInquiryToOwnerTemplate = ({ fromUser, fromEmail
  , toEmail,ptype,loc,username,usermobile,useremail,enquiry, Name, pid, subject, html, PropertyId,
   ownername, Price, Propertyname }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{html}/g, html).replace(/{username}/g, username)
  .replace(/{ptype}/g, ptype).replace(/{pid}/g, pid).replace(/{loc}/g, loc).replace(/{ownername}/g, ownername)
  .replace(/{useremail}/g, useremail).replace(/{usermobile}/g, usermobile).replace(/{enquiry}/g, enquiry)
  .replace(/{PropertyId}/g, PropertyId).replace(/{price}/g, Price).replace(/{pname}/g, Propertyname)
  .replace(/{admin_username}/g, "contact@propertybull.com").replace(/{site_name}/g, "propertybull.com"),


  template_id: "d-67b60cd879a64256847be80c5924029b",
});
// send propertyinqury in admin
const propertyInquiryAdminTemplate = ({ fromUser, fromEmail
  , toEmail,ptype,loc,username,usermobile,useremail,enquiry, Name, pid, subject, html, PropertyId,
   ownername, Price, Propertyname }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{html}/g, html).replace(/{username}/g, username)
  .replace(/{ptype}/g, ptype).replace(/{pid}/g, pid).replace(/{loc}/g, loc).replace(/{ownername}/g, ownername)
  .replace(/{useremail}/g, useremail).replace(/{usermobile}/g, usermobile).replace(/{enquiry}/g, enquiry)
  .replace(/{PropertyId}/g, PropertyId).replace(/{price}/g, Price).replace(/{pname}/g, Propertyname)
  .replace(/{admin_username}/g, "contact@propertybull.com").replace(/{site_name}/g, "propertybull.com"),


  template_id: "d-67b60cd879a64256847be80c5924029b",
});
// property add on propertybull.com Email templete
const propertyaddTemplate = ({ fromUser, fromEmail, toEmail, Name, subject, html, Bath, Face, propertyName, Room, Address, Address2, Pincode, Tot_price, Description, Option, PropertyType, PropertyonFloor, TotalFloors, Locationname, Area, City, State }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{html}/g, html).replace(/{pnm}/g, propertyName).replace(/{add}/g, Address).replace(/{address2}/g, Address2).replace(/{pincode}/g, Pincode).replace(/{opt}/g, Option)
    .replace(/{tot_price}/g, Tot_price).replace(/{description}/g, Description).replace(/{typ}/g, PropertyType).replace(/{namelocation}/g, Locationname).replace(/{area}/g, Area).replace(/{cttt}/g, City).replace(/{state}/g, State)
    .replace(/{room}/g, Room).replace(/{bath}/g, Bath).replace(/{sace}/g, Face).replace(/{site_name}/g, "propertybull.com").replace(/{admin_username}/g, "contact@propertybull.com").replace(/{floor}/g, TotalFloors).replace(/{p_floor}/g, PropertyonFloor),

  template_id: "d-67b60cd879a64256847be80c5924029b",
});

// property Update on propertybull.com templete
const propertyupdateTemplate = ({ fromUser, fromEmail, toEmail, Name, subject, html, Bath, Face, propertyName, Room, Address, Address2, Pincode, Tot_price, Description, Option, PropertyType, PropertyonFloor, TotalFloors, Locationname, Area, City, State }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{html}/g, html).replace(/{pnm}/g, propertyName).replace(/{add}/g, Address).replace(/{address2}/g, Address2).replace(/{pincode}/g, Pincode).replace(/{opt}/g, Option)
    .replace(/{tot_price}/g, Tot_price).replace(/{description}/g, Description).replace(/{typ}/g, PropertyType).replace(/{namelocation}/g, Locationname).replace(/{area}/g, Area).replace(/{cttt}/g, City).replace(/{state}/g, State)
    .replace(/{room}/g, Room).replace(/{bath}/g, Bath).replace(/{sace}/g, Face).replace(/{site_name}/g, "propertybull.com").replace(/{admin_username}/g, "contact@propertybull.com").replace(/{floor}/g, TotalFloors).replace(/{p_floor}/g, PropertyonFloor),

  template_id: "d-67b60cd879a64256847be80c5924029b",
});


//Property Inquiry mail to Owner 
const propertyEnquiryTemplate = ({ fromUser, fromEmail, toEmail, Name, subject, html, UserName, Mobile, Email, Enquiry, Propertyname, TotalPrice, PropertyId, Locationname, Propertytype }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{ownername}/g, Name).replace(/{html}/g, html).replace(/{username}/g, UserName).replace(/{usermobile}/g, Mobile).replace(/{useremail}/g, Email).replace(/{enquiry}/g, Enquiry)
    .replace(/{admin_username}/g, "contact@propertybull.com").replace(/{site_name}/g, "propertybull.com").replace(/{pname}/g, Propertyname).replace(/{price}/g, TotalPrice).replace(/{pid}/g, PropertyId)
    .replace(/{loc}/g, Locationname).replace(/{ptype}/g, Propertytype),
  template_id: "d-67b60cd879a64256847be80c5924029b",
});


// property requirement template Send mail to owner
const propertyRequirementTemplate = ({ fromUser, fromEmail, toEmail, username, subject, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, username).replace(/{html}/g, html),


  template_id: "d-67b60cd879a64256847be80c5924029b",
});

/// use this code in builder and agent 
const BuilderRegisteredTemplate = ({ fromUser, fromEmail, toEmail, username, Name, mobile, role, password, subject, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name).replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{mobile}/g, mobile).replace(/{site_name}/g, "propertybull.com").replace(/{username}/g, username).replace(/{password}/g, password).replace(/{role}/g, role).replace(/{html}/g, html),


  template_id: "d-67b60cd879a64256847be80c5924029b",
});



//  use this code in web and frontend 
const AddProjectTemplate = ({ fromUser, fromEmail, toEmail, room, area, floor, flooring, bath, p_floor, typ, Name, opt, add, Description, namelocation, pnm, state, tot_price, subject, address2, pincode, cttt, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name)
    .replace(/{opt}/g, opt).replace(/{area}/g, area).replace(/{flooring}/g, flooring).replace(/{p_floor}/g, p_floor)
    .replace(/{bath}/g, bath).replace(/{floor}/g, floor).replace(/{site_name}/g, "propertybull.com")
    .replace(/{typ}/g, typ).replace(/{pnm}/g, pnm).replace(/{pincode}/g, pincode)
    .replace(/{address2}/g, address2).replace(/{cttt}/g, 'Jaipur').replace(/{state}/g, 'Rajesthan')
    .replace(/{tot_price}/g, tot_price).replace(/{room}/g, room).replace(/{Description }/g, Description).replace(/{p_floor }/g, p_floor)
    .replace(/{add}/g, add).replace(/{namelocation}/g, namelocation).replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{html}/g, html),


  template_id: "d-67b60cd879a64256847be80c5924029b",
});
//  use this code in web and frontend 
const UpdateProjectTemplate = ({ fromUser, fromEmail, toEmail, room, area, floor, flooring, bath, p_floor, typ, Name, opt, add, description, namelocation, pnm, state, tot_price, subject, address2, pincode, cttt, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name)
    .replace(/{opt}/g, opt).replace(/{area}/g, area).replace(/{flooring}/g, flooring).replace(/{p_floor}/g, p_floor)
    .replace(/{bath}/g, bath).replace(/{floor}/g, floor).replace(/{site_name}/g, "propertybull.com")
    .replace(/{typ}/g, typ).replace(/{pnm}/g, pnm).replace(/{pincode}/g, pincode)
    .replace(/{address2}/g, address2).replace(/{cttt}/g, 'Jaipur').replace(/{country_name}/g, 'Rajesthan')
    .replace(/{tot_price}/g, tot_price).replace(/{room}/g, room).replace(/{description }/g, description).replace(/{p_floor }/g, p_floor)
    .replace(/{add}/g, add).replace(/{namelocation}/g, namelocation).replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{html}/g, html),

  template_id: "d-67b60cd879a64256847be80c5924029b",
});

//  use this code in admin  

const ProjectAddTemplate = ({ fromUser, fromEmail, unit, toEmail, room, area, floor, flooring, bath, p_floor, typ, Name, opt, add, Description, namelocation, pnm, state, tot_price, subject, address2, pincode, cttt, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name)
    .replace(/{opt}/g, opt).replace(/{unit}/g, unit).replace(/{area}/g, area).replace(/{flooring}/g, flooring).replace(/{p_floor}/g, p_floor)
    .replace(/{bath}/g, bath).replace(/{floor}/g, floor).replace(/{site_name}/g, "propertybull.com")
    .replace(/{typ}/g, typ).replace(/{pnm}/g, pnm).replace(/{pincode}/g, pincode)
    .replace(/{address2}/g, address2).replace(/{cttt}/g, 'Jaipur').replace(/{state}/g, 'Rajesthan')
    .replace(/{tot_price}/g, tot_price).replace(/{room}/g, room).replace(/{Description }/g, Description).replace(/{p_floor }/g, p_floor)
    .replace(/{add}/g, add).replace(/{namelocation}/g, namelocation).replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{html}/g, html),


  template_id: "d-67b60cd879a64256847be80c5924029b",
});
//  use this code in admin 
const ProjectUpdateTemplate = ({ fromUser, fromEmail, toEmail, room, area, floor, flooring, bath, p_floor, typ, Name, opt, add, description, namelocation, pnm, state, tot_price, subject, address2, pincode, cttt, html }) => ({
  from: `"${fromUser}" <${fromEmail}>`,
  to: toEmail,
  subject: subject,
  html: html.replace(/{name}/g, Name)
    .replace(/{opt}/g, opt).replace(/{area}/g, area).replace(/{flooring}/g, flooring).replace(/{p_floor}/g, p_floor)
    .replace(/{bath}/g, bath).replace(/{floor}/g, floor).replace(/{site_name}/g, "propertybull.com")
    .replace(/{typ}/g, typ).replace(/{pnm}/g, pnm).replace(/{pincode}/g, pincode)
    .replace(/{address2}/g, address2).replace(/{cttt}/g, 'Jaipur').replace(/{country_name}/g, 'Rajesthan')
    .replace(/{tot_price}/g, tot_price).replace(/{room}/g, room).replace(/{description }/g, description).replace(/{p_floor }/g, p_floor)
    .replace(/{add}/g, add).replace(/{namelocation}/g, namelocation).replace(/{admin_username}/g, 'contact@propertybull.com').replace(/{html}/g, html),

  template_id: "d-67b60cd879a64256847be80c5924029b",
});



module.exports = {
  forgetPasswordTemplate,
  RegisteredTemplate,
  UpdateProfileTemplate,
  ChangePasswordTemplate,
  SandLoaninquryTemplate,
  subscribeTemplate,
  RequirementaddTemplate,
  propertyInquiryTemplate,
  propertyaddTemplate,
  propertyupdateTemplate,
  propertyEnquiryTemplate,
  propertyRequirementTemplate,
  BuilderRegisteredTemplate,
  AddProjectTemplate,
  UpdateProjectTemplate,
  ProjectAddTemplate,
  ProjectUpdateTemplate,
  adminRequirementTemplate,
  propertyInquiryToOwnerTemplate,
  propertyInquiryAdminTemplate

};
