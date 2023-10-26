const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const options = {
  errors: {
    wrap: {
      label: '',
    },
  },
};

const validateAddExperienceData = (data) => {
  const schema = Joi.object({
    workPlace: Joi.string().required(),
    position: Joi.string().required(),
    department: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data, options);
};
const validateAddQualificationData = (data) => {
  const schema = Joi.object({
    school: Joi.string().required(),
    qualification: Joi.string().required(),
    fieldOfStudy: Joi.string().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  });
  return schema.validate(data, options);
};

const validatePrivateSessionData = (data) => {
  const schema = Joi.object({
    date: Joi.array().items({
      date: Joi.date(),
    }),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
    subjectId: Joi.number().required(),
  });
  return schema.validate(data, options);
};

const validateStudentReviewTutor = (data) => {
  const schema = Joi.object({
    userId: Joi.string(),
    teacherId: Joi.string(),
    challenge: Joi.string(),
    type: Joi.string(),
    description: Joi.string().required(),
    rating: Joi.string().required(),
    recommend: Joi.string(),
  });
  return schema.validate(data, options);
};

module.exports = {
  validateAddExperienceData,
  validateAddQualificationData,
  validatePrivateSessionData,
  validateStudentReviewTutor,
};
