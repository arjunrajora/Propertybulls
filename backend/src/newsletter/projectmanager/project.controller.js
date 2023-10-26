const { validateUpdateStatus } = require("./project.validator");


const projectAdd =
    ({ BadRequestError,
        doProject }) =>
        async (httpRequest) => {
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
                age,
                a_unit,
                p_unit,
                p_typeid, } = httpRequest.body;
            const projectResult = await doProject({
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
            return {
                statusCode: 200,
                body: {
                    success: true,
                    message: "project added successfully!",
                    data: projectResult,
                },
            };
        };



const getProject =
    ({ BadRequestError, doGetProject, Project, Builder }) =>
        async (httpRequest) => {
            const data = await doGetProject({
                Project,
                BadRequestError,
                Builder
            });
            return {
                statusCode: 200,
                body: {
                    success: true,
                    message: "Fetched Project successfully!",
                    data,
                },
            };
        };

const deleteProject = ({ BadRequestError, Project, doDeleteProject,
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    const data = await doDeleteProject({
        id,
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Project deleted successfully!',
            data,
        },
    };
};

const updateProject =
    ({ doUpdateProject, Project, BadRequestError }) =>
        async (httpRequest) => {
            const { id } = httpRequest.params;
            const ProjectUpdateData = httpRequest.body;

            const data = await doUpdateProject({
                id,
                Project,
                BadRequestError,
                ProjectUpdateData,
            });
            return {
                statusCode: 200,
                body: {
                    success: true,
                    message: "Project updated successfully!",
                    data,
                },
            };
        };




const updateProjectStatus = ({
    doUpdateProjectStatus,
    Project,
    BadRequestError,
    validateUpdateStatus,
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    let { status } = httpRequest.body;
    status = (status === "Y") ? "N" : "Y";


    const {
        error,
    } = validateUpdateStatus(httpRequest.body);
    if (error) throw new BadRequestError(error.message);



    const data = await doUpdateProjectStatus({
        id,
        Project,
        BadRequestError,
        status
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Project status updated successfully!',
            data,
        },
    };
};

// Search Project
const searchProject = ({
    doSearchProject,
    Project,
    BadRequestError,
}) => async (httpRequest) => {
    const { state_id, city_id, location_id, status, id, name, option, featured, p_typeid, minprice, maxprice, build_id } = httpRequest.body;
    console.log("BODY DATA=>>>", httpRequest.body);
    const data = await doSearchProject({
        state_id, city_id, location_id, status, id, name, option, featured, p_typeid, minprice, maxprice,
        build_id,
        Project,
        BadRequestError,
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Project Search successfully!',
            data,
        },
    };
};







const featurespropertyAdd = ({
    BadRequestError,
    doPropertyImg,
    doPropertyfeatures
}) => async (httpRequest) => {
    const {
        pro_id, type, check_list
    } = httpRequest.body;
    const { filename } = httpRequest.file
    console.log(filename, "images");
    const Result = await doPropertyImg({
        filename,
        pro_id,
        type,
    });


    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Property Added Successfully!',
            pro_id: pro_id,
        },
    };
};

















module.exports = {
    projectAdd,
    getProject,
    deleteProject,
    updateProject,
    updateProjectStatus,
    searchProject,
    featurespropertyAdd
};
