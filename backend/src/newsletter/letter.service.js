
const { Letter, Subscribe, Builder, Agent } = require("../db");

const { generateJWT, verifyJWT } = require("../utils/jwt");

const { NotFoundError, BadRequestError } = require("../utils/api-errors");
const letter = require(".");

// Letter Add
const doLetter = async ({ title, description }) => {
  const letter = await Letter.create({ title, description });
  return { letterId: letter.id };
};


// newsletter view 
const doGetLetter = async ({
}) => {
  const letter = await Letter.findAll({

    order: [["createdAt", "DESC"]],
  }
  );
  return letter
};






//Newsletter deleted
const doDeleteLetter = async ({
  id
}) => {
  const letter = await Letter.destroy({
    where: {
      id: id,
    },
  })
  if (letter == 0) throw new BadRequestError('id not match ');
  return letter[0];
};

const doUpdateLetter = async ({
  id,
  Letter,
  BadRequestError,
  LetterUpdateData
}) => {
  const data = await Letter.update(LetterUpdateData,
    {
      where: {
        id: id,
      },
    },
  );
  if (data[0] == 0) throw new BadRequestError('id not match');
  return data[0];
};

// Letter View By Id
const doGetNewsletterpreviewbyid = async ({
  id,
}) => {
  const data = await Letter.findOne({
    where: {
      id,
    },
  });
  return data;
};



// NewsLetter Subscribe view 
const doGetNewslettersubscribe = async ({
}) => {
  const subscribe = await Subscribe.findAll({

    order: [["createdAt", "DESC"]],
  }
  );
  return subscribe;
};

// NewsLetter Builder view 
const doGetNewsletterBuilder = async ({
}) => {
  const builder = await Builder.findAll({
    where: { role_id: 2 },
    order: [["createdAt", "DESC"]],
  }
  );
  return builder;
};

// NewsLetter Agent view 
const doGetNewsletterAgent = async ({
}) => {
  const builder = await Builder.findAll({
    where: { role_id: 3 },
    order: [["createdAt", "DESC"]],
  }
  );
  return builder;
};





module.exports = {
  doLetter,
  doGetLetter,
  doDeleteLetter,
  doUpdateLetter,
  doGetNewsletterpreviewbyid,
  doGetNewslettersubscribe,
  doGetNewsletterBuilder,
  doGetNewsletterAgent

};
