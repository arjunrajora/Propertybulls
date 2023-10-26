const { validateUpdateStatus } = require("./project.validator");

const projectAdd =
    ({ BadRequestError, doProjectImg, doProject, doPropertyfeatures, doProjectDetail }) => async (httpRequest) => {
        const {
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
            type,
            check_list,
            carparking,
            bathroom
        } = httpRequest.body;
        const { img, featureimage, floor_img } = httpRequest.files;
        let floorimges;
        let featureimageFilename;
        let imgFilenames;
        console.log("floor_img", floor_img);
        if (Array.isArray(img)) {
            console.log(img, "img");
            imgFilenames = img.map((image) => image.filename);
        } else {
            imgFilenames = [];
        }
        if (Array.isArray(floor_img)) {
            console.log(floor_img, "floor_img");
            floorimges = floor_img.map((image) => image.filename);
        } else {
            floorimges = [];
        }

        if (featureimage) {
            console.log(featureimage, "featureimage");

            featureimageFilename = featureimage[0].filename;
            console.log("featureimageFilename", featureimageFilename);
        } else {
            featureimageFilename
        };

        const projectResult = await doProject({
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
            featureimage: featureimageFilename
        });

        await doPropertyfeatures({
            check_list,
            pro_id: projectResult,
        });
        const projectdetails = await doProjectDetail({
            carparking,
            room,
            bathroom,
            pro_id: projectResult,
            area,
            tot_price,
            area_unit: ship,
            per_unit: p_unit
        })
        await doProjectImg({
            pro_id: projectResult,
            type,
            filename: imgFilenames,
            floorimges,
            p_deatil_id: projectdetails.id
        });
        console.log(projectdetails.id);
        return {
            statusCode: 200,
            body: {
                success: true,
                message: "project added successfully!",
                data: projectResult
            },
        };
    };




    const getProject = ({ BadRequestError, doGetProject, Project, Builder ,propertyTypes,Location,propertydetails}) =>
    async (httpRequest) => {
        const data = await doGetProject({
            Project,
            BadRequestError,
            Builder,
            propertyTypes,
            Location,
            propertydetails
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
    ({ doUpdateProject, Project, BadRequestError, doUpdatePropertyfeatures, doUpdateProjectDetail, doUpdatePropertyImg }) =>
        async (httpRequest) => {
            const { id } = httpRequest.params;
            const UpdateData = httpRequest.body;
            const { img, featureimage, floor_img } = httpRequest.files;
            let floorimges;
            let featureimageFilename;
            let imgFilenames;
            console.log("floor_img", floor_img);
            if (Array.isArray(img)) {
                console.log(img, "img");
                imgFilenames = img.map((image) => image.filename);
            } else {
                imgFilenames = [];
            }
            if (Array.isArray(floor_img)) {
                console.log(floor_img, "floor_img");
                floorimges = floor_img.map((image) => image.filename);
            } else {
                floorimges = [];
            }

            if (featureimage) {
                console.log(featureimage, "featureimage");

                featureimageFilename = featureimage[0].filename;
                console.log("featureimageFilename", featureimageFilename);
            } else {
                featureimageFilename
            };;
            const destetail = await doUpdateProject({
                id,
                Project,
                BadRequestError,
                UpdateData,
                featureimageFilename
            });


            await doUpdateProjectDetail({
                pro_id: id,
                carparking: UpdateData.carparking,
                bathroom: UpdateData.bathroom,
            });
            await doUpdatePropertyImg({
                filename: imgFilenames,
                pro_id: id,
                type: UpdateData.type,
                floor_img
            });
            await doUpdatePropertyfeatures({
                pro_id: id,
                check_list: UpdateData.check_list
            });
            return {
                statusCode: 200,
                body: {
                    success: true,
                    message: "Project updated successfully!",
                    id
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
    Builder,
    propertyTypes,
    Location,
    propertyImage,
    BadRequestError,
}) => async (httpRequest) => {
    const { state_id, city_id, location_id, status, id, name, option, featured, p_typeid, tot_price, build_id } = httpRequest.body;
    console.log("BODY DATA=>>>", httpRequest.body);
    const data = await doSearchProject({
        state_id, city_id, location_id, status, id, name, option, featured, p_typeid, tot_price,
        build_id,
        Project,
        Builder,
        propertyTypes,
        Location,
        propertyImage,
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
    doProjectImg,
    doPropertyfeatures
}) => async (httpRequest) => {
    const {
        pro_id, type, check_list
    } = httpRequest.body;
    const { filename } = httpRequest.file
    console.log(filename, "images");
    const Result = await doProjectImg({
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











const getProjectimgbyid = ({ BadRequestError, dogetProjectImgbyid }) =>
    async (httpRequest) => {
        const { pro_id } = httpRequest.body;

        const data = await dogetProjectImgbyid({
            pro_id
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



// View By Id
const GetProjectbyid = ({
    doGetProjectbyid, Builder, propertyTypes, Location, propertyImage, Propertyfeature, propertydetails
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    const data = await doGetProjectbyid({
        id,
        Builder, propertyTypes, Location, propertyImage, Propertyfeature, propertydetails
    });
    // console.log("data==>>",data);
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'fetched Project successfully!',
            data,
        },
    };
};



// Update Featured
const updateFeatured = ({
    doUpdateFeatured,
    BadRequestError,
    // validateAgentStatus
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    let { featured } = httpRequest.body;
    featured = (featured === 1) ? 0 : 1
    const data = await doUpdateFeatured({
        id,
        BadRequestError,
        featured
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Featured updated successfully!',
            data,
        },
    };
};

const updatefeatured_gallery= ({
    doUpdatefeatured_gallery,
    BadRequestError,
    // validateAgentStatus
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    let { featured_gallery } = httpRequest.body;
    featured_gallery = (featured_gallery === 1) ? 0 : 1
    const data = await doUpdatefeatured_gallery({
        id,
        BadRequestError,
        featured_gallery
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Featured gallery successfully!',
            data,
        },
    };
};




const deleteProjectimg = ({ BadRequestError, doDeleteprojectimg
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    console.log(id, "sdf");
    const data = await doDeleteprojectimg({
        id
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



module.exports = {
    projectAdd,
    getProject,
    deleteProject,
    updateProject,
    updateProjectStatus,
    searchProject,
    featurespropertyAdd,
    getProjectimgbyid,
    GetProjectbyid,
    updateFeatured,
    deleteProjectimg,
    updatefeatured_gallery
};
