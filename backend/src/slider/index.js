const router = require("express").Router();
const {
  JWT_ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  SIGN_OPTION,
  EMAIL,
  INVITATION_TOKEN_EXPIRES_IN,
} = require("config");

const { Slider } = require("../db");

const {
  validateAddSlider,
  validateUpdateSlider,
  validateStatusSlider,
} = require("./slider.validator");
const { imageUpload } = require("../middlewares/fileUpload");
const {
  doAddSlider,
  doGetSlider,
  doEditSlider,
  doUpdateSlider,
  doDeleteSlider,
  doStatusSlider,
} = require("./slider.service");

const makeExpressCallback = require("../utils/express-callback");

const { BadRequestError } = require("../utils/api-errors");
// controller
const controller = require("./slider.controller");
const SliderAdd = controller.SliderAdd({
  BadRequestError,
  doAddSlider,
  validateAddSlider,
  imageUpload,
});

const getSlider = controller.getSlider({
  BadRequestError,
  doGetSlider,
});

const Sliderdelete = controller.Sliderdelete({
  BadRequestError,
  doDeleteSlider,
});

const updateSlider = controller.updateSlider({
  BadRequestError,
  doUpdateSlider,
  Slider,
  validateUpdateSlider,
});

const EditSlider = controller.EditSlider({
  BadRequestError,
  doEditSlider,
});
const StatusSlider = controller.StatusSlider({
  BadRequestError,
  doStatusSlider,
  validateStatusSlider,
  Slider,
});

const SliderController = {
  SliderAdd,
  getSlider,
  EditSlider,
  updateSlider,
  Sliderdelete,
  StatusSlider,
};

// routes
const routes = require("./slider.routes")({
  SliderController,
  router,
  makeExpressCallback,
});

module.exports = {
  SliderController,
  SliderService: {
    doAddSlider,
    doGetSlider,
    doEditSlider,
    doUpdateSlider,
    doDeleteSlider,
    doStatusSlider,
  },
  SliderRoutes: routes,
};
