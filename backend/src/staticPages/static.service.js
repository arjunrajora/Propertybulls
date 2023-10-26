const { } = require('config');

const { Static, sequelize, } = require('../db');

const { generateJWT, verifyJWT } = require('../utils/jwt');

const { NotFoundError, BadRequestError } = require('../utils/api-errors');


//Static Add
const doStatic = async ({
  title, filename, content
}) => {
  var image = filename;
  const static = await Static.create(
    { title, image, content }
  )
  return { staticId: static.id };
};


const doGetStatic = async ({
}) => {
  const static = await Static.findAll({
    order: [["createdAt", "DESC"]],
  }
  );
  return static
};


const doDeleteStatic = async ({
  id
}) => {
  const static = await Static.destroy({
    where: {
      id: id,
    },
  })
  if (static == 0) throw new BadRequestError('id not match ');
  return static[0];
};

const doUpdateStatic = async ({
  id,
  Static,
  filename,
  BadRequestError,
  StaticUpdateData
}) => {
  var image = filename;
  const { title, content } = StaticUpdateData;
  if (image != null) {
    const data = await Static.update({ image, title, content },
      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError('id not match');
    return data;
  } else {
    const data = await Static.update({ title, content },
      {
        where: {
          id: id,
        },
      },
    );
    if (data[0] == 0) throw new BadRequestError('id not match');
    return data;
  }

};



// Static View By Id
const doGetStaticById = async ({
  id,
}) => {
  const data = await Static.findOne({
    where: {
      id,
    },
  });
  return data;
};

// Update Static Status
const doUpdateStaticStatus = async ({
  id,
  Static,
  BadRequestError,
  status
}) => {
  const data = await Static.update({ status },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('Please try again later');
  return data[0];
};


module.exports = {
  doStatic,
  doGetStatic,
  doDeleteStatic,
  doUpdateStatic,
  doGetStaticById,
  doUpdateStaticStatus,

}