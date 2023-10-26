const { Project, Propertyfeature,Property,SaveOrder,Email, sequelize,Subscription,User,propertyImage,propertyTypes,propertydetails,Location } = require("../../db");

const { NotFoundError, BadRequestError } = require("../../utils/api-errors");
const {
    AddProjectTemplate,
    UpdateProjectTemplate,
    propertyaddadminTemplate,
    ProjectupdateadminTemplate
  } = require("../../utils/email-templates");
  const emailTransporter = require('../../utils/email');

// Project Add
const doProject = async ({ state_id,
  rera_registration,
  build_id,
  cus_id,
  b_unit,
  vid_url,
  t_type,
  area,
  name,
  ship,
  address,
  address2,
  room,
  option,
  p_unt,
  description,
  tot_price,
  faceid,
  pincode,
  location_id,
  city_id,
  flooring,
  p_floor,
  bath,
  floor,
  age,
  a_unit,
  p_unit,
  p_typeid, flat ,carparking}) => {

  const combinedString = name + "-" + address;
  const ordersss = await SaveOrder.findOne({
    where: {
      user_id: cus_id,
    },
    order: [["id", "DESC"]],
  });
  if (!ordersss || ordersss.length === 0) {
    throw new NotFoundError('You do not have a purchase package and can create a package and post property/project.');
  };
  const currentDate = new Date();
  if (ordersss && ordersss.dataValues.pkg_expiredate <= currentDate) {
    throw new NotFoundError('Your subscription package has expired. Please renew to continue using our service.can create a package and post property/project');
  }
  const projectCount = await Project.count({
    where: {
      cus_id: cus_id,
      subscription_order_id: ordersss.dataValues.id
    }
  });
  console.log("🚀 ~ file: project.service.js:61 ~ ordersss.dataValues.f1<= projectCount:", ordersss.dataValues.f1 <= projectCount)
  if (ordersss.dataValues.f1 <= projectCount) {
    throw new BadRequestError(`Exceeded the usage or resource limit associated with your package.can create a package and post property/project`);
  } else {
    const projectades = await Project.create({
      subscription_order_id: ordersss.dataValues.id,
      state_id,
      rera_registration,
      build_id,
      cus_id,
      b_unit,
      vid_url,
      t_type,
      name,
      ship,
      address,
      address2,
      room,
      option,
      p_unt,
      description,
      tot_price,
      faceid,
      pincode,
      location_id,
      city_id,
      area,
      flooring,
      p_floor,
      bath,
      floor,
      age,
      a_unit,
      p_unit,
      p_typeid,
      flat,
      type: 1,
      url: combinedString,
      status: 'N'
    });
    const users = await User.findOne({
      where: {
        id: cus_id
      },
    });
    const locations = await Location.findOne({
      where: {
        id: location_id
      },
    });
    const projecttype = await propertyTypes.findOne({
      where: {
        id: p_typeid
      },
    });
    const emailtempleate = await Email.findOne({
      where: {
        id: 19
      },
    });
    let template;
    let descriptions = description;
    template = AddProjectTemplate({
      fromUser: "Property bull",
      fromEmail: "contact@propertybull.com",
      toEmail: users.dataValues.username,
      Name: users.dataValues.name,
      html: emailtempleate.dataValues.description,
      subject: emailtempleate.dataValues.subject,
      site_url: 'https://stage.propertybull.com',
      opt: option,
      typ: projecttype.dataValues.name,
      pnm: name,
      add: address,
      address2: address2,
      namelocation: locations.dataValues.name,
      pincode: pincode,
      cttt: city_id,
      state: state_id,
      area: area,
      tot_price: tot_price,
      room: room,
      bath: bath,
      flat: flat == 'undefined' ? "-" : flat,
      flooring: p_floor == 'undefined' ? "-" : p_floor,
      p_floor: p_floor == 'undefined' ? "-" : p_floor,
      descriptions: description == 'undefined' ? "-" : description,
      parking:carparking,
      propertyurl: combinedString,
    });
    await emailTransporter.send(template);
    console.log("🚀 ~ file: project.service.js:154 ~ template:", template)
    const adminemailtempleate = await Email.findOne({
      where: {
        id: 20
      },
    });

    const admin = await User.findOne({
      where: {
        role_id: 1
      },
    });
    let Admintemplate;
    let adminemail = admin.dataValues.username
    Admintemplate = propertyaddadminTemplate({
      fromUser: "Property bull",
      fromEmail: "contact@propertybull.com",
      toEmail: adminemail,
      Name: users.dataValues.name,
      propertyName: name,
      Address: address,
      Address2: address2,
      Pincode: pincode,
      Tot_price: tot_price,
      Description: description,
      Option: option,
      Area: area,
      Room: room,
      Bath: bath,
      TotalFloors: floor,
      PropertyonFloor: p_floor,
      flooring: p_floor == 'undefined' ? "-" : p_floor,
      flat: flat == 'undefined' ? "-" : flat,
      Face: '-',
      City: "jaipur",
      State: "Rajesthan",
      Locationname: locations.dataValues.name,
      PropertyType: projecttype.dataValues.name,
      html: adminemailtempleate.dataValues.description,
      subject: adminemailtempleate.dataValues.subject,
      ship: ship,
      parking:carparking,
      propertyurl: combinedString,

    });
    const results = await emailTransporter.send(Admintemplate);
    return projectades.id
  }

}
const doGetProject = async ({ BadRequestError, Project, Builder
}) => {
    const project = await Project.findAll(
        {    include: { model: Builder },
        }
    );
    return project;
};
const doDeleteProject = async ({
    id
}) => {
    const project = await Project.destroy({
        where: {
            id: id,
        },
    })
    if (project == 0) throw new BadRequestError('id not match ');
    return project[0];
};
const doUpdateProject = async ({
  id,
  Project,
  BadRequestError,
  UpdateData,
  featureimageFilename

}) => {
  const { state_id,
    rera_registration,
    build_id,
    cus_id,
    b_unit,
    vid_url,
    t_type,
    area_in_sqft,
    name,
    ship,
    address,
    address2,
    room,
    option,
    p_unt,
    description,
    tot_price,
    faceid,
    pincode,
    location_id,
    city_id,
    area,
    flooring,
    p_floor,
    bath,
    floor,
    age,
    a_unit,
    p_unit,
    p_typeid,
    flat,
    url
  } = UpdateData
  let featureimage = featureimageFilename
  const data = await Project.update({
    state_id,
    rera_registration,
    build_id,
    cus_id,
    b_unit,
    vid_url,
    t_type,
    area_in_sqft,
    name,
    ship,
    address,
    address2,
    room,
    option,
    p_unt,
    description,
    tot_price,
    faceid,
    pincode,
    location_id,
    city_id,
    area,
    flooring,
    p_floor,
    bath,
    floor,
    age,
    a_unit,
    p_unit,
    p_typeid,
    featureimage,
    flat,
    url
  },
    {
      where: {
        id: id,
      },
    },
  );
  const users = await User.findOne({
    where: {
      id: cus_id
    },
  });

  // find Admin
  const admin = await User.findOne({
    where: {
      role_id: 1
    },
  });




  const emailtempleate = await Email.findOne({
    where: {
      id: 22
    },
  });

  const projecttype = await propertyTypes.findOne({
    where: {
      id: p_typeid
    },
  })
  console.log("🚀 ~ file: project.service.js:324 ~ projecttype:", projecttype)
  let template;
  
  const de = description;
  template = UpdateProjectTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: users.dataValues.username,
    Name: users.dataValues.name,
    html: emailtempleate.dataValues.description,
    subject: emailtempleate.dataValues.subject,
    site_url: 'https://stage.propertybull.com',
    opt: option,
    typ: projecttype.dataValues.name,
    pnm: name,
    add: address,
    address2: address2,
    namelocation: location_id,
    pincode: pincode,
    cttt: city_id,
    state: state_id,
    area: area,
    tot_price: tot_price,
    room: room,
    floor: flat == 'undefined' ? "-" : flat,
    flooring: p_floor == 'undefined' ? "-" : p_floor,
    bath: bath,
    p_floor: p_floor == 'undefined' ? "-" : p_floor,
    description: de !== 'undefined' ? de : "-",
    propertyurl: url,
    parking:UpdateData.carparking,

  });
  await emailTransporter.send(template);

  // send admin email

  const ProjectadminTemplate = await Email.findOne({
    where: {
      id: 69
    },
  });
  let Admintemplate;
  // let adminemail = "kamalrajora.official@gmail.com";
  let adminemail = admin.dataValues.username
  Admintemplate = ProjectupdateadminTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: adminemail,
    Name: users.dataValues.name,
    html: emailtempleate.dataValues.description,
    subject: emailtempleate.dataValues.subject,
    site_url: 'https://stage.propertybull.com',
    opt: option,
    typ: projecttype.dataValues.name,
    pnm: name,
    add: address,
    address2: address2,
    namelocation: location_id,
    pincode: pincode,
    cttt: city_id,
    state: "Rajasthan",
    area: area,
    tot_price: tot_price,
    room: room,
    floor: flat == 'undefined' ? "-" : flat,
    flooring: p_floor == 'undefined' ? "-" : p_floor,
    bath: bath,
    p_floor: p_floor == 'undefined' ? "-" : p_floor,
    description: de !== 'undefined' ? de : "-",
    html: ProjectadminTemplate.dataValues.description,
    subject: ProjectadminTemplate.dataValues.subject,
    propertyurl: url,
    parking:UpdateData.carparking,

  });

  await emailTransporter.send(Admintemplate);


  if (data[0] == 0) throw new BadRequestError('Id Not Match');
  return data[0];
};
    

  const doUpdateProjectDetail = async ({ carparking,room,bathroom,pro_id,area,tot_price
  }) => {
      carparking,room,bathroom,pro_id,area,tot_price
  const detail = await propertydetails.update({carparking,room,bathroom,pro_id,area,tot_price},{
      where:{
        pro_id:pro_id
      }
  });
  return detail;
  }




// Update Project Status
const doUpdateProjectStatus = async ({
    id,
    Project,
    BadRequestError,
    status,

}) => {
    const data = await Project.update({ status },
        {
            where: {
                id: id,
            },
        },
    );
    if (data[0] == 0) throw new BadRequestError('Please try again later');
    return data[0];
};

// Search Project
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchProject = async ({
    state_id, city_id, location_id, status, id, name, option, featured, p_typeid, minprice, maxprice,
    build_id,
    Project,
    BadRequestError,
}) => {
    let newobject = {};
    if (name) {
        newobject.name = { [Op.like]: `%${name}%` }
    }
    if (status) {
        newobject.status = status
    }
    if (state_id) {
        newobject.state_id = state_id
    } if (city_id) {
        newobject.city_id = city_id
    } if (location_id) {
        newobject.location_id = location_id
    } if (id) {
        newobject.id = id
    } if (option) {
        newobject.option = option
    } if (featured) {
        newobject.featured = featured
    } if (p_typeid) {
        newobject.p_typeid = p_typeid
    }
    if (minprice) {
        newobject.minprice = minprice
    } if (maxprice) {
        newobject.maxprice = maxprice
    }
    if (build_id) {
        newobject.build_id = build_id
    }
    const data = await Project.findAll({
        where: newobject,
    });
    if (data[0] == 0) throw new BadRequestError("Data Not Match");
    return data;
};



const doPropertyImg = async ({ filename, pro_id,
    type, }) => {
    const insertedDetails = [];
    for (const filenames of filename) {
        const detail = await propertyImage.create({
            img:filenames, pro_id,
            type,
        });
        insertedDetails.push(detail);
    }

    return insertedDetails;
};


const doPropertyfeatures = async ({
    pro_id,
    check_list
}) => {
    var arrcheck_list = check_list.split(",");
    for (const checkdata of arrcheck_list) {
        await Propertyfeature.create({
            pro_id: pro_id,
            check_list: checkdata
        });
    }
    return true;
};

const doDeletePropertyImg= async ({
    pro_id
}) => {
    const project = await propertyImage.destroy({
        where: {
            pro_id
        },
    })
    return project
};

const doDeletePropertyfeatures = async ({
    pro_id
}) => {
    const project = await Propertyfeature.destroy({
        where: {
            pro_id
        },
    })
    return project
};




const doGetProjectbuyid = async ({ BadRequestError, id, propertyImage,
    Propertyfeature,propertydetails }) => {
    const propertyes = await Property.findOne(
        {
            where: { id: id },
            include: [
                { model: propertyTypes },
                { model: propertyImage },
                { model: Propertyfeature },
                { model: propertydetails },
            
            ],

            
            
             }
    );
    return propertyes
};

const doCheckProjectbyApproved= async ({ BadRequestError, id, }) => {
    const propertyes = await Project.findOne(
        { where: { id: id },   }
    );
    return propertyes
};



const doProjectDetail = async ({ 
     tot_price,
     area_unit,
    carparking,room,bathroom,pro_id,area,per_unit
    }) => {
        carparking,room,bathroom,pro_id,area
    const detail = await propertydetails.create({
        carparking,room,bathroom,pro_id,area, tot_price,per_unit,
        area_unit,
    });
    return detail;

}



// const doUpdatePropertyImg = async ({ filename, pro_id,floorimges,
//     type, }) => {
        
//         const project = await propertyImage.destroy({
//             where: {
//                 pro_id,type:1
//             },
//         });
//     const insertedDetails = [];
//     for (const filenames of filename) {
//         const detail = await propertyImage.create({
//             img: filenames, pro_id,
//             type,
//         });
//         insertedDetails.push(detail);
//     }

//     return insertedDetails;
// };




const doUpdatePropertyImg = async ({ filename, pro_id, floorimges, type }) => {
    const insertedDetails = [];

    if (filename && filename.length > 0) {
        const project = await propertyImage.destroy({
            where: {
                pro_id,type:1
            },
        });
        for (const filenames of filename) {
            const detail = await propertyImage.create({
                img: filenames,
                pro_id,
                type,
            });
            insertedDetails.push(detail);
        }
    }

    if (floorimges && floorimges.length > 0) {
        const project = await propertyImage.destroy({
            where: {
                pro_id,type:2
            },
        });
        for (const floorImage of floorimges) {
            const detail = await propertyImage.create({
                img: floorImage,
                pro_id,
                type: 2,
            });
            insertedDetails.push(detail);
        }
    }

    return insertedDetails;
};

const doUpdatePropertyfeatures = async ({
    pro_id,
    check_list
}) => {

    const project = await Propertyfeature.destroy({
        where: {
            pro_id
        },
    })
    var arrcheck_list = check_list.split(",");
    for (const checkdata of arrcheck_list) {
    const   checkdatainproject=  await Propertyfeature.create({
            check_list:checkdata , pro_id,
        });

    }

    return true;
};

const doDeletefloorimg= async ({
    id
}) => {
    const project = await propertyImage.destroy({
        where: {
            id
        },
    })
    if (project == 0) throw new BadRequestError('id not match ');
    return project[0];
};




const doGetProjectdetailByUrl= async ({
    url,
    propertyTypes,
    propertyImage,
    propertydetails,
    Propertyfeature,
    Builder,
    Features
  }) => {
    const data = await Project.findOne({
        where: { url },
    
        include: [
          {
              model:Builder
  
          },{
            model: propertyImage,
          },
          {
            model: propertydetails,
            include: [{
              model: propertyImage,   
           }]
          },
          {
            model: propertyTypes,
          },
          {
            model: Propertyfeature,
            include: [{
              model: Features,
            }],
          },
    
        ]
      });
      if (data == 0) throw new BadRequestError('Id Not Match');
      return data;
    };



    const doUpdateFeatured_post= async ({
        id,
        BadRequestError,
        featured_post
      }) => {
        const userdetail = await Project.findOne(
            {
              where: {
                id: id,
              },
            },
          );
          const ordersss = await SaveOrder.findOne({
            where: {
                user_id: userdetail.dataValues.cus_id,
              },
              order: [["id", "DESC"]],
            });
          if (!ordersss || ordersss.length ===0) {
            throw new NotFoundError('You do not have a purchase package and can create a package and  featured post in property/project.');
          };
          const currentDate = new Date();
          if (ordersss && ordersss.dataValues.pkg_expiredate <= currentDate) {
            throw new NotFoundError('Your subscription package has expired. Please renew to continue using our service.can create a package and  featured post in property/project');
          }
         const projectCount = await Project.count({
            where: { cus_id: userdetail.dataValues.cus_id,
                subscription_order_id:ordersss.dataValues.id ,
                featured_post:"Y"
            
            
            }
          }); 
          if ( ordersss.dataValues.f2<= projectCount ) {
            throw new BadRequestError(`Exceeded the usage or resource limit associated with your package.can create a package and  featured post in property/project`);
        } else {
        const data = await Project.update({ featured_post },
          {
            where: {
              id: id,
            },
          },
        );
        if (data[0] == 0) throw new BadRequestError('Id Not Match');
        return data[0];
      };
    }

    const docheckpakagebyuser= async ({
        user_id,
        BadRequestError,
      }) => {
          const ordersss = await SaveOrder.findOne({
            where: {
                user_id:user_id,
              },
              order: [["id", "DESC"]],
            });
       
          const currentDate = new Date();
          if (ordersss && ordersss.dataValues.pkg_expiredate <= currentDate) {
            throw new NotFoundError('Your subscription package has expired. Please renew to continue using our service.can create a package and  featured post in property/project');
          }
         const projectCount = await Project.count({
            where: { cus_id: user_id,
                subscription_order_id:ordersss?ordersss.dataValues.id:"" ,            
            }
          }); 
             if (ordersss? ordersss.dataValues.f1<=projectCount:"" ){
           throw new NotFoundError(`Exceeded the usage or resource limit associated with your package.can create a package and post property/project`);
          }
          if ( ordersss==null ){
            throw new NotFoundError('You do not have a purchase package and can create a package and post property/project.');
          }
           return ordersss;

    }



module.exports = {
    doProject,
    doGetProject,
    doDeleteProject,
    doUpdateProject,
    doUpdateProjectStatus,
    doSearchProject,
    doPropertyImg,
    doPropertyfeatures,
    doDeletePropertyfeatures,
    doDeletePropertyImg,
    doGetProjectbuyid,
    doProjectDetail,
    doUpdatePropertyfeatures,
    doUpdatePropertyImg,
    doUpdateProjectDetail,
    doDeletefloorimg,
    doCheckProjectbyApproved,
    doGetProjectdetailByUrl,
    doUpdateFeatured_post,
    docheckpakagebyuser
};
