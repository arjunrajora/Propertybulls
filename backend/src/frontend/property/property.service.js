// const { features } = require("process");
const { property, Project, Propertyfeature, propertyImage, Features, Facing ,SaveOrder,Subscription} = require("../../db");
const { NotFoundError, BadRequestError } = require("../../utils/api-errors");
const { getRecentprojects } = require("./property.controller");




const doGetAllproperty = async ({ BadRequestError, User, Location, propertyTypes,SaveOrder,Subscription }) => {
    const count = await property.count({
        where: { status: "Y", type: 0, option: "Sell" }
    });

    if (count == 0) throw new BadRequestError("please try again");

    const allproperty = await property.findAll({
        // include: { model: User, Location },
        include: [
            {
                model: User,
            },
            {
                model: Location,
            },
            {
                model: propertyTypes,
            },
            {
                model: SaveOrder,
                required: false, // This allows records without SaveOrder associations
                include: {
                    model: Subscription,
                }
            }

        ],

        where: { status: "Y", type: 0, option: "Sell" },
        order: [['created', 'DESC'] ]

    });
    return {
        allproperty,
        data: count
    }
};


// Get Allproject

const doGetAllproject = async ({ BadRequestError, User, Location, propertyTypes,SaveOrder ,Subscription}) => {
    const count = await property.count({
        where: { status: "Y", type: 1, option: "Sell" }
    });

    if (count == 0) throw new BadRequestError("please try again");

    const allproject = await property.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Location,
            },
            {
                model: SaveOrder,
                required: false, // This allows records without SaveOrder associations
                include: {
                    model: Subscription,
                }
            },
            {
                model: propertyTypes,
            }],
        where: { status: "Y", type: 1, option: "Sell" },
        order: [['created', 'DESC']],
    });
    return {
        allproject,
        data: count
    }
};

// Get Allrentproperties

const doGetAllrentproperties = async ({ BadRequestError, User, Location, propertyTypes,        SaveOrder,Subscription
}) => {
    const count = await property.count({
        where: { status: "Y", type: 0, option: "Rent" }
    });

    if (count == 0) throw new BadRequestError("please try again");

    const allrentproperties = await property.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Location,
            },
            {
                model: SaveOrder,
                required: false, // This allows records without SaveOrder associations
                include: {
                    model: Subscription,
                }
            },

            {
                model: propertyTypes,
            }],
        where: { status: "Y", type: 0, option: "Rent" },
        order: [['created', 'DESC']],

    });
    return {
        allrentproperties,
        data: count
    }
};



const doGetRentprojects = async ({ BadRequestError, User, Location, propertyTypes }) => {
    const rentprojects = await property.findAndCountAll({
        where: {
            status: "Y", type: 1, option: "Rent"
            ,
        },
    });

    if (rentprojects[0] == 0) throw new BadRequestError("please try again");
    return rentprojects;
};


// Recent projects 

const doGetRecentprojects = async ({ BadRequestError, Location }) => {
    const recentproject = await property.findAll({
        include: { model: Location },
        where: { type: 1, status: "Y" },
        order: [['created', 'DESC']],
    });


    return recentproject;
};



// Real-Estate-Buy-Rent-Residential

const doGetResidential = async ({ BadRequestError, User, Location, propertyTypes }) => {
    const count = await property.count({
        where: { status: "Y", type: 0 }
    });

    if (count == 0) throw new BadRequestError("please try again");

    const residential = await property.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Location,
            },
            {
                model: propertyTypes,
            }],
        where: { status: "Y", type: 0 },
        order: [['created', 'DESC']],

    });
    return {
        residential,
        data: count
    }
};

// Real-Estate-Buy-Rent-Commercial

const doGetCommercial = async ({ BadRequestError, User, Location, propertyTypes }) => {
    const count = await property.count({
        where: { status: "Y", type: 0, p_typeid: [324, 325, 326, 327, 330] }
    });

    if (count == 0) throw new BadRequestError("please try again");

    const commercial = await property.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Location,
            },
            {
                model: propertyTypes,
            }],
        order: [['created', 'DESC']],
        where: { status: "Y", type: 0, p_typeid: [324, 325, 326, 327, 330] },


    });
    return {
        commercial,
        data: count
    }
};

// Residential-Plot-Land-For-Sale-In-Jaipur
const doGetResidentialPlot = async ({ BadRequestError, User, Location, propertyTypes }) => {
    const count = await property.count({
        where: { status: "Y", type: 0, p_typeid: 319 }
    });

    if (count == 0) throw new BadRequestError("please try again");

    const residentialPlot = await property.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Location,
            },
            {
                model: propertyTypes,
            }],
        where: { status: "Y", type: 0, p_typeid: 319 },
        order: [['created', 'DESC']],


    });
    return {
        residentialPlot,
        data: count
    }
};




// commercial-land-for-sale-in-Jaipur

const doGetCommercialLand = async ({ BadRequestError, User, Location, propertyTypes }) => {
    const count = await property.count({
        where: { status: "Y", type: 0, p_typeid: 324 }
    });

    if (count == 0) throw new BadRequestError("please try again");

    const commercialLand = await property.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Location,
            },
            {
                model: propertyTypes,
            }],
        where: { status: "Y", type: 0, p_typeid: 324 },
        order: [['created', 'DESC']],

    });
    return {
        commercialLand,
        data: count
    }
};

// ResidentialHouse-for-sale-in-Jaipur
const doGetResidentialHouse = async ({ BadRequestError, User, Location, propertyTypes }) => {
    const count = await property.count({
        where: { status: "Y", type: 0 }
    });

    if (count == 0) throw new BadRequestError("please try again");

    const residentialHouse = await property.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Location,
            },
            {
                model: propertyTypes,
            }],
        where: { status: "Y", type: 0 },
        order: [['created', 'DESC']],

    });
    return {
        residentialHouse,
        data: count
    }
};

// commercial-shop-for-sale-in-Jaipur
const doGetCommercialShop = async ({ BadRequestError, User, Location, propertyTypes }) => {
    const count = await property.count({
        where: { status: "Y", type: 0, p_typeid: 326 }
    });

    if (count == 0) throw new BadRequestError("please try again");

    const commercialShop = await property.findAll({
        include: [
            {
                model: User,
            },
            {
                model: Location,
            },
            {
                model: propertyTypes,
            }],
        where: { status: "Y", type: 0, p_typeid: 326 },
        order: [['created', 'DESC']],

    });
    return {
        commercialShop,
        data: count
    }
};



// view propertyTypes in sell and by type

const dogetpropertyTypes = async ({ BadRequestError, type, propertyTypes }) => {

    const propertytype = await propertyTypes.findAll({

        where: [{ type: type },
        { status: "Y" }
        ]
    });
    return propertytype

};


// view all propertytypes
const dogetpropertyType = async ({ BadRequestError, propertyTypes }) => {

    const propertytype = await propertyTypes.findAll({
    });
    return propertytype

};




// Property Add by Frontend
const doProperty = async ({ state_id,
    rera_registration,
    build_id,
    cus_id,
    carpet,
    build,
    b_unit,
    t_type,
    area_in_sqft,
    name,
    ship,
    rent,
    security_deposit,
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
    remark,
    p_typeid,
    deposit,
    type
}) => {
    const combinedString = name + "-" + address;
    const propertys = await property.create({
        state_id,
        rera_registration,
        build_id,
        cus_id,
        carpet,
        build,
        b_unit,
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
        rent,
        security_deposit,
        a_unit,
        p_unit,
        p_typeid,
        remark,
        deposit,
        type: 0,
        url: combinedString,
    });
    return { propertysId: propertys.id };
};



// propertyAdded features Features with images

const doFeatureimage = async ({
    id, filename,
}) => {
    console.log(id)

    let featureimage = filename
    const data = await property.update({ featureimage },
        {
            where: {
                id: id,
            },
        },
    );
    return data
}

const doPropertyImg = async ({ filename, pro_id,
    type, }) => {

    const insertedDetails = [];

    for (const filenames of filename) {
        const detail = await propertyImage.create({
            img: filenames,
            pro_id,
            type,
        });
        insertedDetails.push(detail);

    }

    return insertedDetails;
};

const doPropertyFloorImg = async ({ filename, pro_id,
    type, }) => {
    const insertedDetails = [];

    for (const floorimges of filename) {
        const detail = await propertyImage.create({
            img: floorimges,
            pro_id,
            type: 2,
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



// Edit property
const doUpdateProperty = async ({
    id,
    property,
    BadRequestError,
    UpdateData,
    featureimageFilename

}) => {
    let featureimage = featureimageFilename
    const { state_id,
        rera_registration,
        build_id,
        cus_id,
        carpet,
        build,
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
        remark,
        a_unit,
        p_unit,
        p_typeid,
        deposit,
        rent,
        security_deposit,
        age,
        
     } = UpdateData;
if(featureimage){
    const [data] = await property.update({
        state_id,
        rera_registration,
        build_id,
        cus_id,
        carpet,
        build,
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
        remark,
        a_unit,
        p_unit,
        p_typeid,
        deposit, 
        featureimage,
        rent,
        security_deposit,
        age,
        status:"N"
    },
        {
            where: {
                id: id,
            },
        },
    );
    // if (data === 0) { throw new BadRequestError('Id Not Match'); }
    return data;
}else{
    const [data] = await property.update({
        state_id,
        rera_registration,
        build_id,
        cus_id,
        carpet,
        build,
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
        remark,
        a_unit,
        p_unit,
        p_typeid,
        deposit, 
        featureimage,
        rent,
        security_deposit,
        age,
    },
        {
            where: {
                id: id,
            },
        },
    );
    return data;
}
    
};

const doUpdatePropertyImg = async ({ filename, pro_id, floorimges,
    type, }) => {
    const insertedDetails = [];

    if (floorimges && floorimges.length > 0) {
        const project = await propertyImage.destroy({
            where: {
                pro_id, type: 2
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
    if (filename && filename.length > 0) {
        const project = await propertyImage.destroy({
            where: {
                pro_id, type: 1
            },
        });
        for (const filenames of filename) {
            const detail = await propertyImage.create({
                img: filenames,
                pro_id,
                type: 1,
            });
            console.log("service", filenames)
            insertedDetails.push(detail);
        }
    }



    return insertedDetails;
};


const doUpdatePropertyfeatures = async ({
    pro_id,
    check_list
}) => {


    const users = await Propertyfeature.destroy({
        where: {
            pro_id: pro_id,
        },
    });


    var arrcheck_list = check_list.split(",");
    for (const checkdata of arrcheck_list) {
        await Propertyfeature.create({
            pro_id: pro_id,
            check_list: checkdata
        });
    }
    return true;
};




// view by propertyid

const doGetPropertybyid = async ({ BadRequestError, id, Propertyfeature,
    propertyImage }) => {
    const propertyes = await property.findOne(
        {
            where: { id: id },
            include: [{ model: Propertyfeature },
            { model: propertyImage },
            ],

        }
    );
    return propertyes
};






// view Property features added property

const doGetPropertyFeatures = async ({

    // Features,
    Type
}) => {
    const features = await Features.findAll({
        include: { model: Type },
        // order: [["createdAt", "DESC"]],
        where: { status: "Y" }

    });
    return features
};








// view  in RECENTLY ADDED PROPERTIES
const dogetresentproperty = async ({ BadRequestError, property, cus_id }) => {
    const propertyes = await property.findAll({
        where: { cus_id: cus_id },
        limit: 5, // limits the number of results to 5
        order: [['createdAt', 'DESC']] // orders the results by createdAt in descending order
    });
    return propertyes;
};
// view added property by user in frontend 
const dogetpropertybycustum = async ({ BadRequestError, property, cus_id }) => {

    const propertytype = await property.findAll({

        where: { cus_id },
        order: [['createdAt', 'DESC']] // orders the results by createdAt in descending order


    })
    return propertytype
}



const domultipleimg = async ({ filenames }) => {
    const detail = await Promise.all(
        filenames.map(async (filename) => {
            const img = filename;
            const image = await propertyImage.create({ img });
            return { propertyId: image.id };
        })
    );
    return detail;
};




// view property floor plan

// const doGetPropertyfloorplan = async ({
// }) => {
//     const image = await propertyImage.findOne({
//         where: { type: 2 }
//     });
//     return image
// };

// const doGetPropertyfloorplan = async ({ BadRequestError, id }) => {
//     const image = await propertyImage.findAll(
//         {
//             where: { id: id },
//         }
//     );
//     return image
// };


// post by agent in rent 


const doGetpostbuyagnet = async ({ User, property, Role, Location, propertyTypes
}) => {
    const features = await property.findAll({
        include: [
            {
                model: User, where: { role_id: 3 },
                order: [['createdAt', 'DESC']],
                include: { model: Role },
            },
            {
                model: Location,
            },
            {
                model: propertyTypes,
            }
        ]

    });
    return features
};




// View Property Face

const doGetPropertyFace = async ({
}) => {
    const face = await Facing.findAll({
        order: [["createdAt", "DESC"]],
        where: { status: "Y" },
    }
    );
    return face
};




















module.exports = {

    doGetAllproperty,
    doGetAllproject,
    doGetAllrentproperties,
    doGetRecentprojects,
    doGetRentprojects,
    doGetResidential,
    doGetCommercial,
    doGetResidentialPlot,
    doGetCommercialLand,
    doGetResidentialHouse,
    doGetCommercialShop,
    dogetpropertyTypes,
    dogetpropertyType,
    doProperty,
    dogetresentproperty,
    dogetpropertybycustum,
    doPropertyImg,
    doPropertyfeatures,
    doGetPropertyFeatures,
    domultipleimg,
    doGetPropertybyid,
    doUpdateProperty,
    doUpdatePropertyImg,
    doUpdatePropertyfeatures,
    doFeatureimage,
    doPropertyFloorImg,
    doGetpostbuyagnet,
    doGetPropertyFace

};
