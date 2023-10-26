
const fileUpload = require("../middlewares/fileUpload");


module.exports = ({ FileUploadController, router, makeExpressCallback }) => {
    // router.get(
    //     '/signed-url/:fileName',
    //     makeExpressCallback(FileUploadController.generateSignedUrl),
    // );
    router.post(
        '/file-upload',fileUpload.imageUpload.single("image"),makeExpressCallback(FileUploadController.uploadProfile),
    ); 
    // router.put(
    //     '/uploads/documents',
    //     makeExpressCallback(FileUploadController.uploadTeacherDocuments),
    // );

    return router;
};
