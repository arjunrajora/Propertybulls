const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
    errors: {
        wrap: {
            label: '',
        },
    },
};

const validateAddProjectData = (data) => {
    const schema = Joi.object({
        rera_registration: Joi.string().required(),
        build_id: Joi.string().required(),
        url: Joi.string().required(),
        name: Joi.string().required(),
        address: Joi.string().required(),
        city_id: Joi.string().required(),
        location_id: Joi.string().required(),
        option: Joi.string().required(),
        room: Joi.string().required(),
        flat: Joi.string().required(),
        bath: Joi.string().required(),
        floor: Joi.string().required(),
        p_floor: Joi.string().required(),
        flooring: Joi.string().required(),
        faceid: Joi.string().required(),
        area: Joi.string().required(),
        type: Joi.string().required(),
        carpet: Joi.string().required(),
        build: Joi.string().required(),
        tot_price: Joi.string().required(),
        description: Joi.string().required(),
        count_id: Joi.string().required(),
        featured: Joi.string().required(),
        featureimage: Joi.string().required(),
        latitude: Joi.string().required(),
        longitude: Joi.string().required(),
        currency: Joi.string().required(),
        deposit: Joi.string().required(),
        vid_url: Joi.string().required(),
        address2: Joi.string().required(),
        pincode: Joi.string().required(),
        t_type: Joi.string().required(),
        area_in_sqft: Joi.string().required(),



    });
    return schema.validate(data, options);
};

const validateUpdateProjectData = (data) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        b_id: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.string().required(),
        featured: Joi.string().required(),
        loc_id: Joi.string().required(),
        state_id: Joi.string().required(),
        city_id: Joi.string().required(),
    });
    return schema.validate(data, options);
};

const validateUpdateStatus = (data) => {
    const schema = Joi.object({
        status: Joi.string().required(),

    });
    return schema.validate(data, options);
};



module.exports = {
    validateAddProjectData,
    validateUpdateProjectData,
    validateUpdateStatus,
}
