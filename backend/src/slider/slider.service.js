const { Slider, sequelize } = require("../db");
const { NotFoundError, BadRequestError } = require("../utils/api-errors");

// Slider Add

const doAddSlider = async ({ title,filename }) => {
  var name = filename;
  const sliders = await Slider.create({
    name,
    title,
  });
  return {
    SliderId: sliders.id,
  };
};


//Get data Slider
const doGetSlider = async ({ BadRequestError }) => {
  const sliders = await Slider.findAll(
    {
      order: [["createdAt", "DESC"]],

    }
  );
  if (sliders[0] == 0) throw new BadRequestError("please try again");
  return sliders;
};


//Edit data in Slider
const doEditSlider = async ({ id, BadRequestError }) => {
  const data = await Slider.findOne({
    where: {
      id,
    },
  });
  if (data == null) throw new BadRequestError("Please try again later");
  return data;
};


//Update data in Slider
const doUpdateSlider = async ({
  id,
  Slider,
  filename,
  BadRequestError,
  sliderdata,
}) => {
  var name = filename;
  const { title  } = sliderdata;
  const data = await Slider.update(  {name,title },{
    where: {
      id: id, 
    },
  });
  if (data[0] == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


//status
const doStatusSlider = async ({ id, BadRequestError, status, Slider }) => {
  const data = await Slider.update(
    { status },
    {
      where: {
        id: id,
      },
    }
  );
  if (data[0] == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


//delete data in Slider
const doDeleteSlider = async ({ id }) => {
  const data = await Slider.destroy({
    where: {
      id: id,
    },
  });
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

module.exports = {
  doAddSlider,
  doGetSlider,
  doEditSlider,
  doUpdateSlider,
  doDeleteSlider,
  doStatusSlider,
};
