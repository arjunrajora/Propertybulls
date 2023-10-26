
const {
  State,
  sequelize,
} = require('../../db');
const { NotFoundError, BadRequestError } = require('../../utils/api-errors');

//  Add State
const doStateAdd = async ({
  name
}) => {
  const state = await State.create(
    {
      name
    },

  );

  return {
    StateId: state.id
  };
};

// Gat Data in State
const doGetState = async ({
}) => {
  const faq = await State.findAll({
    order: [["createdAt", "DESC"]],
  }
  );
  if (faq == null) throw new BadRequestError('Please try again later');
  return faq
};

// Edit Data in State

const doEditState = async ({
  id,
  BadRequestError,
}) => {
  const data = await State.findOne({
    where: {
      id,
    },
  });
  if (data == null) throw new BadRequestError('Please try again later');
  return data
};


//Update Data in State
const doUpdateState = async ({
  id,
  State,
  BadRequestError,
  BuilderUpdateData
}) => {
  const data = await State.update(BuilderUpdateData,
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};

//status  in State
const doStatusState = async ({
  id,
  State,
  BadRequestError,
  status
}) => {
  const data = await State.update({ status },
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


// Delete State
const doDeleteState = async ({
  id
}) => {
  const data = await State.destroy({
    where: {
      id: id,
    },
  })
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};


module.exports = {
  doStateAdd,
  doGetState,
  doEditState,
  doUpdateState,
  doDeleteState,
  doStatusState
};

