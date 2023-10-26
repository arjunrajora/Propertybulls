const fileUpload = require("../middlewares/fileUpload");

module.exports = ({
  SliderController,
  router,
  makeExpressCallback,
}) => {

  router.post('/add',fileUpload.imageUpload.single("name"),makeExpressCallback(SliderController.SliderAdd));
  router.get('/viewAll', makeExpressCallback(SliderController.getSlider));
  router.delete('/:id', makeExpressCallback(SliderController.Sliderdelete));
  router.put('/:id',fileUpload.imageUpload.single("name"),makeExpressCallback(SliderController.updateSlider));
  router.put('/status/:id', makeExpressCallback(SliderController.StatusSlider));
  router.get('/:id', makeExpressCallback(SliderController.EditSlider)); 

  return router;  
};
     