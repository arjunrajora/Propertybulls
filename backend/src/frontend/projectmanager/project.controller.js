const { validateUpdateStatus } = require("./project.validator");
const projectAdd =
    ({ BadRequestError,
        doPropertyImg,
        doProjectDetail,
        doProject }) =>
        async (httpRequest) => {
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
                pro_id,
                type,
                carparking,
                 bathroom,
            } = httpRequest.body;
            const filename = httpRequest.files.map(file => file.filename);
            const projectResult = await doProject({
                state_id,
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
                area,
                flooring,
                p_floor,
                bath,
                floor,
                age,
                a_unit,
                p_unit,
                p_typeid,
                carparking
            });
            await doProjectDetail({
                carparking,room,bathroom,
                pro_id:projectResult
                 ,area:area_in_sqft,
                 tot_price,
                 area_unit:ship,
                 per_unit:p_unit
            })
            await doPropertyImg({
                type,
                pro_id:projectResult,
               filename
            })
            return {
                statusCode: 200,
                body: {
                    success: true,
                    message: "project added successfully!",
                    data: projectResult
                },
            };
        };


        const getProject = ({
            BadRequestError,
            doGetAllproperty,
            Project,
                    User,
            Location,
            propertyTypes
        }) => async (httpRequest) => {
        
            const data = await doGetAllproperty({
                BadRequestError,
                Project,User, Location, propertyTypes
            });
        
            return {
                statusCode: 200,
                body: {
                    success: true,
                    message: 'Allproperty fatch successfully!',
                    data,
                },
            };
        };
        
        
const deleteProject = ({ BadRequestError,
     Project, doDeleteProject, doCheckProjectbyApproved,
     doDeletePropertyfeatures, doDeletePropertyImg
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    console.log(id, "sdf");
   const viewproperty= await doCheckProjectbyApproved({
        id,
      BadRequestError,
        });   
           if(viewproperty.status=="N"){
            const data = await doDeleteProject({
                id,
            });
            await doDeletePropertyImg({
                pro_id: id
            });
            await doDeletePropertyfeatures({
                pro_id: id,
            });
            return {
                statusCode: 200,
                body: {
                    success: true,
                    message: 'Project deleted successfully!',
                    data,
                },
            };
        }else{
            throw new BadRequestError('Project delete  not found !');

        }
   
}





const deleteFloorimg = ({ BadRequestError, doDeletefloorimg
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    console.log(id, "sdf");
 const data= await doDeletefloorimg({
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












const updateProject =
    ({ doUpdateProject, Project, BadRequestError, doUpdatePropertyfeatures,doUpdateProjectDetail,
        doUpdatePropertyImg }) =>
        async (httpRequest) => {
            const { id } = httpRequest.params;
            const UpdateData = httpRequest.body;
            const { img, featureimage, floor_img } = httpRequest.files;
            let floorimges;
            let featureimageFilename;
            let imgFilenames;
            if (Array.isArray(img)) {
                console.log(img,"img");

              imgFilenames = img.map((image) => image.filename);
            } else {
              imgFilenames = []; 
            }
            if (Array.isArray(floor_img)) {
                console.log(floor_img,"floor_img");
                floorimges = floor_img.map((image) => image.filename);
            } else {
                floorimges = []; 
              }
            
              if (featureimage) {    
                        console.log(featureimage,"featureimage");

                featureimageFilename = featureimage[0].filename;
            } else {
                featureimageFilename
              }
            
        await doUpdateProject({
                id,
                Project,
                BadRequestError,
                UpdateData,
                featureimageFilename
            });
            await doUpdatePropertyImg({
                filename: imgFilenames,
                pro_id: id,
                type: UpdateData.type,
                floorimges
            });
           await doUpdateProjectDetail({
                pro_id: id,
                carparking: UpdateData.carparking,
                bathroom: UpdateData.bathroom,
            });
            await doUpdatePropertyfeatures({
                pro_id: id,
                check_list: UpdateData.check_list,
                type: UpdateData.type,     
                   });
            return {
                statusCode: 200,
                body: {
                    success: true,
                    message: "Project Updated Successfully!",
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
    const images = httpRequest.files.map(file => file.filename);
    console.log(images, "dss");
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


const getProjectbuyid = ({
    BadRequestError,
    doGetProjectbuyid,
    propertyImage,
    Propertyfeature,
    propertydetails,
    propertyTypes
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    const data = await doGetProjectbuyid({
        BadRequestError,
        propertyImage,
        Propertyfeature,
        propertydetails,
        propertyTypes,
        id,
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Fetched property data successfully!',
            data,
        },
    };
};


const getProjectdetailByUrl = ({
    doGetProjectdetailByUrl,
    Project,
    propertyTypes,
    propertyImage,
    propertydetails,
    Propertyfeature,
    Builder,
    Features
  }) => async (httpRequest) => {
    const { url } = httpRequest.params;
    const data = await doGetProjectdetailByUrl({
      url,
      Project,
      propertyTypes,
      propertyImage,
      propertydetails,
      Propertyfeature,
      Builder,
      Features
  
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'fetched Project Detail successfully!',
        data
      },
    };
  };
  const UpdateProjectFeatured_post = ({
    doUpdateFeatured_post,
    Project,
    BadRequestError,
    doCheckProjectbyApproved
}) => async (httpRequest) => {
    const { id } = httpRequest.params;
    let { featured_post } = httpRequest.body;
    const viewproperty= await doCheckProjectbyApproved({
        id,
      BadRequestError,
        });   
        if(viewproperty.status=="Y"){
            featured_post = (featured_post === "Y") ? "N" : "Y";
       const data = await doUpdateFeatured_post({
        id,
        Project,
        BadRequestError,
        featured_post
    });

    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'Project status updated successfully!',
            data,
        },
    };
        }
else{
    throw new BadRequestError('You are Project not approud');

}
};

const getpakagebyuser = ({
     BadRequestError,
     docheckpakagebyuser ,SaveOrder,Project
}) => async (httpRequest) => {
    const { user_id } = httpRequest.body;
 const data= await docheckpakagebyuser({
    user_id,
    SaveOrder,Project
    });
    return {
        statusCode: 200,
        body: {
            success: true,
            message: 'get pakage  successfully!',
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
    getProjectbuyid,
    deleteFloorimg,
    getProjectdetailByUrl,
    UpdateProjectFeatured_post,
    getpakagebyuser
};
