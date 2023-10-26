const { Shortlist, sequelize,User ,property,propertyTypes,Email,Location,Property,Role} = require("../../db");
const { WEB_URL, EMAIL, EMAIL_PASS, EMAIL_HOST ,site_url,site_name,admin_username} = require('config');

const { generateJWT, verifyJWT } = require("../../utils/jwt");
const { NotFoundError, BadRequestError } = require("../../utils/api-errors");
const {shortlistTemplate } = require("../../utils/email-templates");
const emailTransporter = require('../../utils/email');
// Shortlist Add

const doShortlist = async ({ pro_id, usr_id, ip_add }) => {
  const shortlist = await Shortlist.create({ pro_id, usr_id, ip_add });
   if(usr_id!=null){
    const propertydetails = await property.findOne({

      where: {
        id:pro_id
      },

    });
    const users = await User.findOne({
      where: {
        id:usr_id
      },
      
    });
      
    const propertytypesname = await propertyTypes.findOne({
      where: {
        id:propertydetails.dataValues.p_typeid, 
      },
    });
    const emailtempleate = await Email.findOne({
      where: {
        id:72
      },
    });
    const locationes = await Location.findOne({
      where: {
        id:propertydetails.dataValues.location_id
      },
    });
    template = shortlistTemplate({
      fromUser: "Property bull",
      fromEmail: "contact@propertybull.com",
      toEmail: users.dataValues.username,
      name:users.dataValues.name,
      Title:propertydetails.dataValues.name,
      P_Typeid:propertytypesname.dataValues.name, 
      Tot_price:propertydetails.dataValues.tot_price,
      Area:propertydetails.dataValues.area,
      Locality:locationes.dataValues.name,
      html:emailtempleate.dataValues.description,
      subject:emailtempleate.dataValues.subject,
    });
  const result = await emailTransporter.send(template);
  }

  return { shortlistId: shortlist.id };
};

const Sequelize = require("sequelize");
const e = require("express");
const Op = Sequelize.Op;
const doGetShortlist = async ({ usr_id, ip_add,
  Property,
  propertyTypes,
  User,
  Role,
  propertydetails
}) => {

  const data = await Shortlist.findAll({
    include: [{
      model: Property,
      include: [
        { model: propertydetails
        },
       { model: propertyTypes},
       {model: User,   
         include: [{
          model: Role,   
       }]
      }],
      }],
    where: {
      [Op.or]: [
        { usr_id: usr_id },
        { ip_add: ip_add }
      ],

    }
  });

  return data;
};

// const doGetShortlist = async ({ usr_id, ip_add,
//   Property,
//   propertyTypes,
//   User,
//   Role,
//   propertydetails
// }) => {

//   const data = await Shortlist.findAll({
//     include: [{
//       model: Property,
//       include: [{ model: propertyTypes},],
//       }],
//     where: {
//       [Op.or]: [
//         { usr_id: usr_id },
//         { ip_add: ip_add }
//       ],

//     }
//   });

//   return data;
// };






const doDeleteShortlist = async ({
  id
}) => {
  const shortlist = await Shortlist.destroy({
    where: {
      id: id,
    },
  })
  if (shortlist == 0) throw new BadRequestError('id not match ');
  return shortlist[0];
};



const doDeleteShortlistinproperty = async ({
  pro_id
}) => {
 const shortlist = await Shortlist.destroy({
    where: {
      pro_id: pro_id,
    },
  })
  if (shortlist == 0) throw new BadRequestError('id not match ');
    return shortlist[0];
};

const todayDate = new Date();
   const oneMonthAgo = new Date(todayDate);
  oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
   console.log("🚀 ~ file: shortlist.service.js:154 ~ oneMonthAgo:", oneMonthAgo)
            

const doShortlistget = async ({
  BadRequestError,
}) => {
  const agent = await Shortlist.findAll({
  });
  const userid = agent.map((e) => e.usr_id).filter((id) => id !== null).filter((value, index, self) => self.indexOf(value) === index);
  const proid = agent.map((e) => e.pro_id).filter((pro_id) => pro_id !== null).filter((value, index, self) => self.indexOf(value) === index);
  const userdesrtAds = await Shortlist.findAll({
    where:{
      createdAt: {
        [Op.gte]: oneMonthAgo, // gte means "greater than or equal to"
        [Op.lte]: todayDate,    // lte means "less than or equal to"
    },
      pro_id:{
        [Op.in]: proid,
      },
      usr_id:{
        [Op.in]: userid,
      }
    },
    include:[{model:Property,include:[{model:Location},{model:propertyTypes},{model:User}],},

      
    ]

  });
const userDetail = await User.findAll({
  where: {
    id: {
      [Op.in]: userid,
    },
  },
});const emailTemplateData = await Email.findOne({
  where: {
    id: 72
  },
});
userDetail.forEach((indvUser, indexsss) => {
  const userId = indvUser.id; // Assuming the user ID is available in the user object
  const userShortlistedProperties = userdesrtAds.filter((property) => property.usr_id === userId);
    const propertyDetailsHTML = userShortlistedProperties.map((Propertydetails) => {
    return `
       <h3  style="font-size :13px;">Short List details :<br />
     </h3>
  
    <p><strong>Property Name</strong>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color:#000; font-size:13px;">${Propertydetails.Property?Propertydetails.Property.name:""}</span></p>

    <p><strong>Property Type</strong>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#000; font-size:13px">${Propertydetails.Property.propertyType?Propertydetails.Property.propertyType.name:""}</span></p>
    
    <p><strong>Property Location</strong>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#000; font-size:13px">${Propertydetails.Property.Location?Propertydetails.Property.Location.name:""}</span></p>
    <p><strong>Total Price</strong>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp; &nbsp; <span style="color:#000; font-size:13px">${Propertydetails.Property?Propertydetails.Property.tot_price:""}</span></p>
    <p><strong>Total Area</strong>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp; &nbsp;<span style="color:#000; font-size:13px">${Propertydetails.Property?Propertydetails.Property.area:""}-Sq Ft</span>
    <p><strong>Role</strong>: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &nbsp; &nbsp;<span style="color:#000; font-size:13px">${Propertydetails.Property?Propertydetails.Property.User.role_id=='4'?"Builder":Propertydetails.Property.User.role_id=='3'?"Agent":Propertydetails.Property.User.role_id=='2'?'Owner':"":""}</span>
    
    `;
  }).join('<hr />'); // Separate property details with horizontal lines

  const template = shortlistTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: indvUser.username,
    html: `    <div style="margin :auto;text-align :center;width :620px;border :5px solid #88ac2e; border-bottom :none;"><!-- <div style="background : url(images/bg.png) no-repeat right bottom;padding :10px">-->
    <div style=" padding :10px;">
    <div style="text-align :left; float:left"><a href="${site_url}"><img src="${site_url}/images/logo.png" style="width:160px" /></a></div>
    <div style="float:left;color:black;width:70%;font-size :13px;padding: 8px 0px 0px 0px;text-align :left;font-weight :bold;">
    <p><a href="${site_url}/property/search/buy-property-in-Jaipur" style="color :#000000;text-decoration :none;font-size :13px;display: inline-block;padding: 16px 0px 0px 0px;margin-right:10px;">Buy</a>
        <a href="${site_url}/dashboard/addproperty" style="color :#000000;text-decoration :none;font-size :13px;display: inline-block;padding: 16px 0px 0px 0px;margin-right:10px;">Sell</a><a href="${site_url}/property/search/rent-property-in-Jaipur" style="color :#000000;text-decoration :none;font-size :13px;display: inline-block;padding: 16px 0px 0px 0px;margin-right:10px;">Rent</a><a href="${site_url}/real-estate-projects-in-Jaipur" style="color :#000000;text-decoration :none;font-size :13px;display: inline-block;padding: 16px 0px 0px 0px;margin-right:10px;">Recent Projects</a><a href="${site_url}/homeloan-for-Property" style="color :#000000;text-decoration :none;font-size :13px;display: inline-block;padding: 16px 0px 0px 0px;margin-right:10px;">Home Loan</a></p>
    </div>
    <div style="display:block; clear:both; height:0px;"> </div>
    </div>
    <div style="background-color:#88ac2e; height:20px;"> </div>
     
    <div style=" padding :10px; background-color :#fff;">
    <div style="text-align :left;">
    <h5  style="font-size :13px;">Dear <strong>${indvUser.name}</strong>,</h5>
    
    <p>Congratulation! You have successfully Short List with <a href="${site_url}" style="font-size :13px; color :#000; " target="_blank">{site_name}</a></p>
    <hr />
    ${propertyDetailsHTML}
    <hr />
    <h3>For any query ?</h3>
    <p>Mail us at : <a href="mailto:${admin_username}" style="color :#000;">${admin_username}</a></p>
    
    <hr />
    <p>Warn regards<br />
    Team <a href="{site_url}" style="color :#000;">${site_name}</a></p>
    </div>
    </div>
    
    <div style="color :#fff; background :#88ac2e; padding :5px; font-size :13px;">You are a <a href="javascript :void(0);" style="color :#fff;">{site_name}</a> member. This e-mail comes to you in accordance with our <a href="{site_url}static/privacy" style="color:#fff;">Privacy Policy</a>.</div>
    </div>
    `,
    subject: emailTemplateData.dataValues.subject,
    name: indvUser.name,
  });

  const result = emailTransporter.send(template);
});
return userdesrtAds
}


module.exports = {
  doShortlist,
  doGetShortlist,
  doDeleteShortlist,
  doDeleteShortlistinproperty,
  doShortlistget
};
