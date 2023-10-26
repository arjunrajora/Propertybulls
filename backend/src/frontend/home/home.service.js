const { Slider, property, Builder, Article, Location, propertyTypes, User ,SaveOrder,
    Subscription,} = require("../../db");
const { NotFoundError, BadRequestError } = require("../../utils/api-errors");


//Get data Slider
const doGetSlider = async ({ BadRequestError }) => {
    const slider = await Slider.findAll({
        where: {
            status: "Y",
        },
    });

    if (slider[0] == 0) throw new BadRequestError("please try again");
    return slider;
};


// Get data Project of the month
const doGetProject = async ({ BadRequestError }) => {
    const project = await property.findAll({
        where: { status: "Y", featured: 1, type: 1, }, limit: 4,
        attributes: [ 'featureimage','url','name'],

    });

    if (project[0] == 0) throw new BadRequestError("please try again");
    return project;
};

// view project Gallery

const doGetProjectgallery = async ({ BadRequestError }) => {
    const projectgallery = await property.findAll({
        where: { status: "Y", featured_gallery: 1, type: 1 },
        attributes: [ 'featureimage','url','name'],

    });
    if (projectgallery[0] == 0) throw new BadRequestError("please try again");
    return projectgallery;
};


// View Associate  Builder 
const doGetBuilder = async ({ BadRequestError, Location, State }) => {
    const builder = await Builder.findAll({
        // include: [{ model: Location }, { model: State }],
        where: { status: "Y", role_id: 4, featured: 1 },
        attributes: ['image'],

        // limit: 22
    }
    );
    if (builder[0] == 0) throw new BadRequestError("Please try again later");
    return builder;
};


//View Article
const doGetArticle = async ({
    BadRequestError,

}) => {
    const article = await Article.findAll({
        where: {
            status: "Y",
        },
        attributes: ['image','url','title'],

    });
    if (article[0] == 0) throw new BadRequestError('Please try again later');
    return article;
};

// Search Property
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchProperty = async ({
    id,
    option,
    city_id,
    location_id,
    state_id,
    p_typeid,
    room,
    tot_price,
    age,
    area,
    SaveOrder,
    Subscription,
    BadRequestError,
    VisibilityMatrix,
    User,
    Location,
    type,
    propertyTypes
}) => {
    let newobject = {};
    if (type) {
        newobject.type = type

    }
    if (option) {
        newobject.option = option

    }
    if (city_id) {
        newobject.city_id = city_id
    }
    if (location_id) {
        if (typeof location_id === 'string') {
            const location_idArray = location_id.split(',').map(value => parseInt(value.trim()));
            newobject.location_id = {
                [Op.in]: location_idArray,
            };
        } else if (Array.isArray(location_id)) {
            newobject.location_id = {
                [Op.in]: location_id,
            };
        } else {
            newobject.location_id = location_id;
        }
    }
    if (state_id) {
        newobject.state_id = state_id
    }
    if (p_typeid) {
        if (typeof p_typeid === 'string') {
            const p_typeidArray = p_typeid.split(',').map(value => parseInt(value.trim()));
            newobject.p_typeid = {
                [Op.in]: p_typeidArray,
            };
        } else if (Array.isArray(p_typeid)) {
            newobject.p_typeid = {
                [Op.in]: p_typeid,
            };
        } else {
            newobject.p_typeid = p_typeid;
        }
    }
    if (room) {
        if (typeof room === 'string') {
            const roomArray = room.split(',').map(value => parseInt(value.trim()));
            newobject.room = {
                [Op.in]: roomArray,
            };
        } else if (Array.isArray(room)) {
            newobject.room = {
                [Op.in]: room,
            };
        } else {
            newobject.room = room;
        }
    }
    if (tot_price) {
        if (typeof tot_price === 'string') {
            const [minPrice, maxPrice] = tot_price.split('-').map(value => parseInt(value.trim()));
            newobject.tot_price = {
                [Op.between]: [minPrice, maxPrice],
            };
        } else if (Array.isArray(tot_price)) {
            newobject.tot_price = {
                [Op.between]: tot_price,
            };
        } else {
            newobject.tot_price = tot_price;
        }
        
    }
    if (id) {
        newobject.id = { [Op.like]: `%${id}%` }
    }
    if (age) {
        if (typeof age === 'string') {
            const ageArray = age.split(',').map(value => parseInt(value.trim()));
            newobject.age = {
                [Op.in]: ageArray,
            };
        } else if (Array.isArray(age)) {
            newobject.age = {
                [Op.in]: age,
            };
        } else {
            newobject.age = age;
        }
    }
    if (area) {
        if (typeof area === 'string') {
            const [minPrice, maxPrice] = area.split('-').map(value => parseInt(value.trim()));
            newobject.area = {
                [Op.between]: [minPrice, maxPrice],
            };
        } else if (Array.isArray(area)) {
            newobject.area = {
                [Op.between]: area,
            };
        } else {
            newobject.area = area;
        }
        
    }
    const data = await property.findAll({
        where: newobject,
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
                    include: {
                        model: VisibilityMatrix,
                    },
                },
            },
        ],
        order: [

            [{ model: SaveOrder, as: 'SaveOrder'}, { model: Subscription, as: 'Subscription' },{ model: VisibilityMatrix, as: 'VisibilityMatrix' }, "ordernumber","asc"],
        ],
    });
    
    console.log("🚀 ~ file: home.service.js:232 ~ data:", data)
    return data;
};

// view all property 

const doGetProperty = async ({ BadRequestError }) => {
    const gallery = await property.findAll({

    });

    if (gallery[0] == 0) throw new BadRequestError("please try again");
    return gallery;
};

// view All location
const doGetLocation = async ({ BadRequestError }) => {
    const location = await Location.findAll({

    });

    if (location[0] == 0) throw new BadRequestError("please try again");
    return location;
};

// view All location

const doGetPropertytypes = async ({ BadRequestError }) => {
    const location = await propertyTypes.findAll({
        where: { status: "Y" }
    });

    if (location[0] == 0) throw new BadRequestError("please try again");
    return location;
};


const doGethomeDate = async ({ BadRequestError }) => {
    const slider = await Slider.findAll({
        where: {
            status: "Y",
        },
        attributes: [ 'name'],

    });

    if (slider[0] == 0) throw new BadRequestError("please try again");
    return slider;
};




module.exports = {

    doGetSlider,
    doGetProject,
    doGetProjectgallery,
    doGetBuilder,
    doGetArticle,
    doSearchProperty,
    doGetProperty,
    doGetLocation,
    doGetPropertytypes,
    doGethomeDate

};
