const { Project, Propertyfeature, propertyImage } = require("../db");

const { NotFoundError, BadRequestError } = require("../utils/api-errors");


// Project Add
const doProject = async ({ state_id,
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
    age,
    a_unit,
    p_unit,
    p_typeid, }) => {
    const project = await Project.create({
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
        age,
        a_unit,
        p_unit,
        p_typeid,
    });
    return { projectId: project.id };
};



const doGetProject = async ({ BadRequestError, Project, Builder
}) => {
    const project = await Project.findAll(
        {
            include: { model: Builder },
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

const doUpdateProject = async ({ id, Project, BadRequestError, ProjectUpdateData }) => {
    const data = await Project.update(ProjectUpdateData, {
        where: {
            id: id,
        },
    });
    if (data[0] == 0) throw new BadRequestError("id not match");
    return data;
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

    console.log("newobject", newobject);
    const data = await Project.findAll({
        where: newobject,
    });
    if (data[0] == 0) throw new BadRequestError("Data Not Match");
    return data;
};


const doPropertyImg = async ({ filename, pro_id,
    type, }) => {
    var img = filename;
    const detail = await propertyImage.create({
        img,
        type,
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

module.exports = {
    doProject,
    doGetProject,
    doDeleteProject,
    doUpdateProject,
    doUpdateProjectStatus,
    doSearchProject,
    doPropertyImg,
    doPropertyfeatures,
};
