const {
  Contactinquiry,
  sequelize,
} = require('../db');

const { generateJWT, verifyJWT } = require('../utils/jwt');

const { NotFoundError, BadRequestError } = require('../utils/api-errors');




//View Contactinquiry
const doGetContactinquiry = async ({ BadRequestError, Property, Customer, Location, User, City
}) => {
  const contactinquiry = await Contactinquiry.findAll(
    {
      include: [{
        model: Property,
        include: [{ model: Location },
        { model: User },
        { model: City }
        ]
      },
      { model: Customer }
      ],
      order: [["createdAt", "DESC"]],

    }
  );
  return contactinquiry
};

// Search Contactinquiry
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchContactinquiry = async ({
  fname,
  phone,
  pro_id,
  Contactinquiry,
  Location, User, City,
  BadRequestError,
  Property, Customer
}) => {
  let newobject = {};
  if (fname) {
    newobject.fname = { [Op.like]: `%${fname}%` }
  }
  if (phone) {
    newobject.phone = { [Op.like]: `%${phone}%` }
  }
  if (pro_id) {
    newobject.pro_id = pro_id
  }

  console.log("newobject", newobject);
  const data = await Contactinquiry.findAll({
    where: newobject,
    include: [{
      model: Property,
      include: [{ model: Location },
      { model: User },
      { model: City }
      ]

    },
    { model: Customer }
    ],
    order: [["fname", "ASC"]],
  });
  if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};



// deleted Contact Inquiry

const doDeleteContactinquiry = async ({
  id
}) => {
  const data = await Contactinquiry.destroy({
    where: {
      id: id,
    },
  })
  if (data == 0) throw new BadRequestError("Id Not Match");
  return data[0];
};









module.exports = {
  doGetContactinquiry,
  doSearchContactinquiry,
  doDeleteContactinquiry
}

