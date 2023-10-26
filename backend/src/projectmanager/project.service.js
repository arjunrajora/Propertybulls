const { Project, Propertyfeature, propertyTypes,propertyImage,propertydetails,Email ,User,Location} = require("../db");

const { NotFoundError, BadRequestError } = require("../utils/api-errors");
const {
    ProjectAddTemplate
  } = require("../utils/email-templates");
  const emailTransporter = require('../utils/email');

// Project Add
const doProject = async ({ state_id,
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
    p_typeid,featureimage }) => {
        const combinedString =name+"-"+address;
    const project = await Project.create({
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
        url:combinedString
    });
    const users = await User.findOne({
        where: {
          id:cus_id
        },
      });
      const locations = await Location.findOne({
        where: {
          id:location_id
        },
      });
      const projecttype = await propertyTypes.findOne({
        where: {
          id:p_typeid
        },
      });
    const emailtempleate = await Email.findOne({
        where: {
          id:20
        },
      });
      let template;
      let descriptions=description;
      template = ProjectAddTemplate({
          fromUser: "Property bull",
          fromEmail: "contact@propertybull.com",
          toEmail: users.dataValues.username,
          Name: users.dataValues.name,
          html:emailtempleate.dataValues.description,
          subject:emailtempleate.dataValues.subject,
        site_url:'https://stage.propertybull.com',
        opt:option,
        typ:projecttype.dataValues.name,
        pnm:name,
        add:address,
        address2:address2,
        namelocation:locations.dataValues.name,
        pincode:pincode,
        cttt:city_id,
        state:state_id,
        area:area,
        tot_price:tot_price,
        room:room,
        bath:bath,
        unit:p_unt == 'undefined' ?"-":p_unt ,
        floor:floor == 'undefined' ?"-":floor ,
        flooring:p_floor,
        p_floor: p_floor == 'undefined' ?  "-":p_floor ,
        description :descriptions == 'undefined' ?  "-":descriptions  
    });
    await emailTransporter.send(template);
    return project.id 
};



const doGetProject = async ({ BadRequestError, Project, Builder,propertyTypes,build_id,Location,propertydetails
}) => {
    const project = await Project.findAll(
        {where:{type:1},
            order: [["createdAt", "DESC"]],
            include:[{ model: Builder, },
                { model: propertyTypes },
                { model: Location },
                {    model: propertydetails, },
            ],
        }
    );
    return project;
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






const doGetProjectbyid = async ({ id ,Builder,propertyTypes,Location,Propertyfeature,propertydetails,propertyImage}) => {
    const data = await Project.findOne({
      where: {
        id,
      },
      include:[{ model: Builder,
        required: true, 
             },
                 { model: propertyTypes },
                 { model: Location },
                 {   model: propertyImage },
                   {  model: Propertyfeature },
                   {  model: propertydetails },

             ],

    });
    return data;
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
        }=UpdateData
  let featureimage=featureimageFilename
    const data = await Project.update(  {state_id,
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
        p_typeid,featureimage},
      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError('Id Not Match');
    return data[0];
  };
  



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
    state_id, city_id, location_id, status, id, name, option, featured, p_typeid, tot_price,
    build_id,
    Project,
    Builder,
    propertyTypes,
    Location,
    propertyImage,
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
    if (tot_price) {
        newobject.tot_price = tot_price
    } 
    if (build_id) {
        newobject.build_id = build_id
    }

    console.log("newobject", newobject);
    const data = await Project.findAll({
        where: newobject,
        order: [["name", "ASC"]],
        include:[{ model: Builder,
            required: true, 
                 },
                     { model: propertyTypes },
                     { model: Location },
                     {
                         model: propertyImage,
                       },
                 ],
    });
    if (data[0] == 0) throw new BadRequestError("Data Not Match");
    return data;
};


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


const dogetProjectImgbyid = async ({pro_id }) => {
    
    const detail = await propertyImage.findAll({
       where:{pro_id}
    });
    return detail;

}





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
const doProjectImg = async ({ filename, pro_id, floorimges, type,p_deatil_id }) => {
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
                p_deatil_id
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
            check_list:checkdata,pro_id,
        });

    }

    return true;
};
const doUpdateFeatured = async ({
    id,
    BadRequestError,
    featured
  }) => {
    const data = await Project.update({ featured },
      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError('Id Not Match');
    return data[0];
  };
  const doUpdatefeatured_gallery = async ({
    id,
    BadRequestError,
    featured_gallery
  }) => {
    const data = await Project.update({ featured_gallery },
      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError('Id Not Match');
    return data[0];
  };


  const doDeleteprojectimg= async ({
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

const doUpdateProjectDetail = async ({ carparking,room,bathroom,pro_id,area
}) => {
    carparking,room,bathroom,pro_id,area
const detail = await propertydetails.update({carparking,room,bathroom,pro_id,area},{
    where:{
      pro_id:pro_id
    }
});
return detail;
}




module.exports = {
    doProject,
    doGetProject,
    doDeleteProject,
    doUpdateProject,
    doUpdateProjectStatus,
    doSearchProject,
    doProjectImg,
    doPropertyfeatures,
    dogetProjectImgbyid,
    doGetProjectbyid,
    doUpdatePropertyImg,
    doUpdatePropertyfeatures,
    doUpdateFeatured,
    doProjectDetail,
    doDeleteprojectimg,
    doUpdateProjectDetail,
    doUpdatefeatured_gallery
};
