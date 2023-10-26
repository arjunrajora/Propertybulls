module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    location: DataTypes.STRING,
    schoolId: DataTypes.INTEGER,
    isVerifiedBySchool: DataTypes.BOOLEAN,
    classSectionId: DataTypes.INTEGER,
    fatherName: DataTypes.STRING,
    motherName: DataTypes.STRING,
    parentStatus: DataTypes.STRING,
    about: DataTypes.STRING,
    departmentId: DataTypes.INTEGER,
    isVerifiedByAdmin: DataTypes.BOOLEAN,
    phoneNumber: DataTypes.STRING,
    countryCode: DataTypes.STRING,
    dob: DataTypes.DATE,
    schoolRegisterId: DataTypes.STRING,
  }, {
    tableName: 'students',
  });
  Student.associate = function (models) {
  //   // associations can be defined here
    Student.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  //   Student.hasMany(models.StudentQualification, {
  //     foreignKey: 'studentId',
  //   });
  //   Student.hasMany(models.Attendance, { 
  //     foreignKey: 'studentId',
  //   });
  //   Student.hasOne(models.StudentsSection, {
  //     foreignKey: 'studentId',
  //   });
  //   Student.hasOne(models.SectionStudent, {
  //     foreignKey: 'studentId',
  //   });
  //   Student.hasOne(models.GuardianStudent, {
  //     foreignKey: 'studentId',
  //   });
  //   Student.hasMany(models.StudentHomework, {
  //     foreignKey: 'studentId',
  //   });
  //   Student.belongsTo(models.ClassSection, {
  //     foreignKey: 'classSectionId',
  //   });
  //   Student.hasMany(models.FreelancerSessionStudent, { foreignKey: 'studentId' });

  //   Student.belongsTo(models.School, {
  //     foreignKey: 'schoolId',
  //   });

  //   Student.hasMany(models.ExamStudent, {
  //     foreignKey: 'studentId',
  //   });

  //   Student.hasMany(models.MarkHomework, {
  //     foreignKey: 'studentId',
  //   });

  //   Student.hasMany(models.Transaction, {
  //     foreignKey: 'studentId',
  //   });

  };
  return Student;
};
