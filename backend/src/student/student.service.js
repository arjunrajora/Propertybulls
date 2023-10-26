const paginate = require('../utils/paginate');

function removeDuplicates(originalArray, prop) {
  const newArray = [];
  const lookupObject = {};
  for (const i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i];
  }
  for (const i in lookupObject) {
    newArray.push(lookupObject[i]);
  }
  return newArray;
}

const doAddQualification = async ({
  QualificationDetail,
  qualificationData,
  userRoleId,
  BadRequestError,
  StudentQualification,
}) => {
  // let types = qualificationData.fieldOfStudy.split(',').map(item => item.trim());
  // let studentQualificationDetail = []
  // for (const type of types) {
    const qualificationDetail = await QualificationDetail.create({
      school: qualificationData.school,
      qualification: qualificationData.qualification,
      fieldOfStudy: qualificationData.fieldOfStudy,
      startDate: qualificationData.startDate,
      endDate: qualificationData.endDate
    });
    let studentQualificationDetail = await StudentQualification.create({
      studentId: userRoleId,
      qualificationId: qualificationDetail.id,
    });
  // }
  // if (studentQualificationDetail.length == 0) throw new BadRequestError('Please try again later');
  return studentQualificationDetail;
};
const doUpdateQualification = async ({
  QualificationDetail,
  qualificationData,
  qualificationId,
  BadRequestError,
}) => {
  const qualificationDetail = await QualificationDetail.update(qualificationData, {
    where: {
      id: qualificationId,
    },
  });
  if (qualificationDetail[0] == 0) throw new BadRequestError('Please try again later');
  return qualificationDetail[0];
};

const doGetQualification = async ({
  QualificationDetail,
  userRoleId,
  userId,
  BadRequestError,
  StudentQualification,
  Student,
}) => {
  const teacherQualificationDetail = await StudentQualification.findAll({
    where: {
      studentId: userRoleId,
    },
    include:
    {
      model: QualificationDetail,
    },
  });

  // get all schools
  // const schoolList = [];
  // teacherQualificationDetail.forEach((qualification) => {
  //   const schoolName = qualification.QualificationDetail.school
  //   if (!schoolList.some((school) => school.QualificationDetail.school === schoolName)) {
  //     schoolList.push(qualification);
  //   }
  // });

// each schools get all field of study
//   const modifiedQualification = [];
//   schoolList.forEach((school) => {
//     const qualificationData = {
//       studentId: school.studentId,
//       QualificationDetail: {
//         school: school.QualificationDetail.school,
//         qualification: school.QualificationDetail.qualification,
//         fieldOfStudy: teacherQualificationDetail
//             .filter((qualification) => qualification.QualificationDetail.school === school.QualificationDetail.school)
//             .map((qualification) => ({
//               'id':qualification.QualificationDetail.id,
//               'name':qualification.QualificationDetail.fieldOfStudy.toLowerCase(),
//               'startDate':qualification.QualificationDetail.startDate,
//               'endDate':qualification.QualificationDetail.endDate,
//             })),
//       }
//     }
//     modifiedQualification.push(qualificationData);
//   });


  if (teacherQualificationDetail[0] == 0) throw new BadRequestError('Please try again later');
  return teacherQualificationDetail;
};

const doDeleteQualification = async ({
  QualificationDetail,
  userRoleId,
  BadRequestError,
  StudentQualification,
  qualificationId,
}) => {
  await QualificationDetail.destroy({
    where: {
      id: qualificationId,
    },
  });
  const studentQualificationDetail = await StudentQualification.destroy({
    where: {
      studentId: userRoleId,
      qualificationId,
    },
  });
  if (studentQualificationDetail[0] == 0) throw new BadRequestError('Please try again later');
  return studentQualificationDetail[0];
};

const doGetStudentHomeworkSubject = async ({
  BadRequestError,
  Homework,
  MarkHomework,
  Subject,
  sequelize,
  studentId,
}) => {
  const subjects = await Subject.findAll({
    where: {
      '$Homework.MarkHomeworks.studentId$': studentId,
    },
    attributes:['id', 'subjectName'],
    include:[{
      model: Homework,
      required: true,
      attributes: [],
      include:[{
        model: MarkHomework,
        required: true,
        attributes: [],
      }],
    }],
  });
  return subjects;
};

const doGetHomeworkBySubjectId = async ({
  studentId,
  subjectId,
  BadRequestError,
  Homework,
  StudentHomework,
  Student,
}) => {
  const homeworkDetail = await StudentHomework.findAll({
    where: {
      studentId,
    },
    include: {
      model: Student,
    },
  });
  const result = await Promise.all(homeworkDetail.map(async (homework) => {
    const homeworkData = await Homework.findOne({
      where: {
        subjectId,
        id: homework.homeworkId,
      },
    });
    if (homeworkData !== null) {
      return {
        homeworkData,
        homework,
      };
    }
  }));
  if (result[0] == 0) throw new BadRequestError('Please try again later');
  return result;
};
const doGetUpcomingEvents = async ({
  Event,
  date,
  userId,
  EventInvited,
  moment,
}) => {
  const event = await EventInvited.findAll({
    where: {
      userId,
    },
    include: [{
      model: Event,

    }],
  });
  const events = [];
  event.map(({
    Event,
  }) => {
    if (moment(Event.date).isSameOrAfter(moment(date))) events.push(Event);
  });
  return events;
};

const doUploadHomework = async ({
  studentId,
  homeworkId,
  BadRequestError,
  MarkHomework,
  StudentHomework,
  fileName,
  comment,
  submittedOn,
}) => {
  const homeworkDetail = await MarkHomework.update({
    homeworkDocument: fileName,
    isComplete: true,
    studentComment: comment,
    submittedOn,
  }, {
    where: {
      studentId,
      homeworkId,
    },
  });

  const homeworkLog = await StudentHomework.create({
    homeworkId,
    studentId,
    isCompleted: true,
    homeworkDocument: fileName,
    comment,
  });

  // if (homeworkDetail == 0) throw new BadRequestError('Please try again later');
  return { homeworkDetail, homeworkLog };
};

const doGetAllFeaturedSubjects = async ({
  Subject,
  BadRequestError,
  page,
  perPage,
}) => {
  const subjectDetail = await Subject.findAll({
    ...paginate(page, perPage),
  });
  if (subjectDetail[0] == 0) throw new BadRequestError('Please try again later');
  return subjectDetail;
};

const doGetAllUpcomingSessions = async ({
  BadRequestError,
  SchoolSession,
  SchoolSessionRoutine,
  Op,
  StudentsSection,
  studentId,
  page,
  perPage,
  sort_title,
  sort_order,
  date_start,
  date_end,
  query_keyword,
  perTime,
  Teacher,
  Subject,
  moment,
  sequelize,
  SchoolRecordSession,
  SchoolRecordSessionStudent,
  SchoolSessionStudent,
}) => {
  let resultFrom = moment().subtract(270, "days").format("YYYY-MM-DD");
  let whereQuery;
  const classSectionDetail = await StudentsSection.findOne({
    where: {
      studentId,
    },
  });
  if(date_start && date_end){
    let dt;
    let start;
    let end;
    let dateStart;
    let dateEnd;
    dateStart = moment(date_start).format('YYYY-MM-DD');
    dateEnd = moment(date_end).format('YYYY-MM-DD');
    if (perTime === "true"){
      start = moment(dateStart, 'YYYY-MM-DD').startOf('day').format('YYYY-MM-DD');
      end = new Date(date_end);
    }else{
      start = moment(dateStart, 'YYYY-MM-DD').startOf('day').format('YYYY-MM-DD');
      end = moment(dateEnd, 'YYYY-MM-DD').endOf('day').format('YYYY-MM-DD');
    }

    whereQuery = {
      'scheduledOn': {
        [Op.between]: [
          start,
            end
        ] },
      'classSectionId': classSectionDetail && classSectionDetail.classSectionId || null,
    }
  }
  else{
    const today = Date.now();
    whereQuery = {
      'scheduledOn': { [Op.gt]: today },
      'classSectionId': classSectionDetail && classSectionDetail.classSectionId || null,
    }
  }

  /**
   * get all list to display
   */
  const upcomingSessionDetail = await SchoolSession.findAndCountAll({
    where: whereQuery,
    include: [
      {
        model: Teacher,
      },
      {
        model: Subject,
      },
      {
        model: SchoolSessionRoutine,
      },
    ],
    order:[[sort_title,sort_order]],
    ...paginate(page, perPage),
  });

  /**
   * get all recorded list of a student
   */
  const recordings = await SchoolRecordSession.findAndCountAll({
    include:{
      model: SchoolRecordSessionStudent,
      where:{
        studentId,
      }
    },
    where:{
      createdAt: {
        [Op.gte]: resultFrom,
      },
    },
    order:[['createdAt','DESC']],
    ...paginate(page,perPage),
  });

  /**
   * get all LIVE past dated list of a student
   */
  const pastDate = await SchoolSession.findAndCountAll({
    include:{
      model: SchoolSessionStudent,
      where:{
        studentId,
      },
    },
    where: whereQuery,
    order:[['createdAt','DESC']],
    ...paginate(page,perPage),
  });

  return {
    upcomingSessionDetail: upcomingSessionDetail.rows,
    sessionCount: upcomingSessionDetail.count,
    previousCount: (pastDate.count + recordings.count),
    schoolPastSessionCountTotal: pastDate.count,
    schoolPastSessionCountCurrent: pastDate.rows.length,
    schoolRecordCountTotal: recordings.count,
    schoolRecordCountCurrent: recordings.rows.length,
  };
};

const doGetAllPreviousSessions = async ({
  BadRequestError,
  SchoolSession,
  SchoolSessionRoutine,
  Op,
  StudentsSection,
  studentId,
  page,
  perPage,
  Teacher,
  Subject,
}) => {
  const today = Date.now();
  const classSectionDetail = await StudentsSection.findOne({
    where: {
      studentId,
    },
  });
  const previousSessionDetail = await SchoolSession.findAll({
    where: {
      scheduledOn: {
        [Op.lt]: today,
      },
      classSectionId: classSectionDetail && classSectionDetail.classSectionId || null,
    },
    include: [
      {
        model: Teacher,
      },
      {
        model: Subject,
      },
      {
        model: SchoolSessionRoutine,
      },
    ],
    ...paginate(page, perPage),
  });
  const sessionCount = previousSessionDetail.length;
  // if (previousSessionDetail[0] == null) throw new BadRequestError('No Sessions Found');
  return { previousSessionDetail, sessionCount };
};

const doGetAllFeaturedTeachers = async ({
  BadRequestError,
  SectionDetail,
  Teacher,
  StudentsSection,
  studentId,
  User,
  page,
  perPage,
}) => {
  const classSectionDetail = await StudentsSection.findOne({
    where: {
      studentId,
    },
  });
  const sectionDetail = await SectionDetail.findAll({
    where: {
      classSectionId: classSectionDetail.classSectionId,
    },
    include: {
      model: Teacher,
      include: {
        model: User,
      },
    },
    ...paginate(page, perPage),
  });
  const result = removeDuplicates(sectionDetail, 'teacherId');
  if (result[0] == null) throw new BadRequestError('No Teachers Found');
  return result;
};

const doGetAllFilteredTeachersBySubject = async ({
  BadRequestError,
  SectionDetail,
  Teacher,
  subjectId,
  Subject,
  page,
  perPage,
}) => {
  const tutorDetails = await SectionDetail.findAll({
    where: {
      subjectId,
    },
    include: [
      {
        model: Teacher,
      },
      {
        model: Subject,
      },
    ],
    ...paginate(page, perPage),
  });
  const result = removeDuplicates(tutorDetails, 'teacherId');
  const teacherCount = result.length;
  if (result[0] == null) throw new BadRequestError('No Teachers Found');
  return { result, teacherCount };
};

const doGetAllFilteredSessionsBySubject = async ({
  BadRequestError,
  Teacher,
  subjectId,
  Subject,
  SchoolSession,
  page,
  perPage,
}) => {
  const sessionDetails = await SchoolSession.findAll({
    where: {
      subjectId,
    },
    include: [
      {
        model: Teacher,
      },
      {
        model: Subject,
      },
    ],
    ...paginate(page, perPage),
  });
  const result = removeDuplicates(sessionDetails, 'id');
  if (result[0] == null) throw new BadRequestError('No Sessions Found');
  return result;
};

const doGetCountFromFilter = async ({
  SectionDetail,
  subjectId,
  Subject,
  SchoolSession,
  page,
  perPage,
}) => {
  const teacherDetails = await SectionDetail.findAll({
    where: {
      subjectId,
    },
    include: {
      model: Subject,
    },
    ...paginate(page, perPage),
  });
  const result1 = removeDuplicates(teacherDetails, 'teacherId');
  const teacherCount = result1.length;
  const sessionDetails = await SchoolSession.findAll({
    where: {
      subjectId,
    },
    ...paginate(page, perPage),
  });
  const result2 = removeDuplicates(sessionDetails, 'id');
  const sessionCount = result2.length;

  return {
    teacherCount, sessionCount, subject: teacherDetails[0].Subject, result1, result2,
  };
};

const doGetSessionById = async ({
  BadRequestError,
  Teacher,
  sessionId,
  Subject,
  SchoolSession,
  moment,
  SchoolSessionStudent,
  studentId,
  Student,
  User,
  FavouriteSession,
  userId,
  SessionReview,
}) => {
  const isFav = await FavouriteSession.count({
    where:{
      userId,
      sessionId,
      type: "live",
      state: "school",
      active: true,
    }
  });
  const sessionDetails = await SchoolSession.findOne({
    where: {
      id: sessionId,
    },
    include: [
      {
        model: SchoolSessionStudent,
        include: [
          {
            model: Student,
            attributes:['id','firstName','lastName'],
            include: [
              {
                model: User,
                attributes:['id','email','profile'],
              },
            ],
          },
        ],
      },
      {
        model: Subject,
      },
      {
        model: Teacher,
      },
    ],
  });
  const { startTime, endTime } = sessionDetails;
  const a = moment(startTime, 'HH:mm:ss');
  const b = moment(endTime, 'HH:mm:ss');
  const duration = moment.duration(b.diff(a));
  const hours = duration.hours();
  const minutes = duration.minutes();
  if (sessionDetails == null) throw new BadRequestError('No Sessions Found');
  return {
    sessionDetails,
    duration: { hours, minutes },
    isFavourite: (isFav === 1),
    isFavourite1: false,
    isLivePurchasedValue: "paid",
    isLiveSessionReviewed: 0,
    isRecordSessionValue: false,
    isRecordSessionReviewed: 0,
    recordSessionDetails: null,
  };
};

const doBookPrivateSession = async ({
  BadRequestError,
  studentId,
  teacherId,
  StudentTeacherPrivateSession,
  privateSessionData,
}) => {
  const {
    subjectId,
    date,
    startTime,
    endTime,
  } = privateSessionData;
  const sessionDetails = await StudentTeacherPrivateSession.create({
    subjectId,
    date,
    startTime,
    endTime,
    studentId,
    teacherId,
  });
  if (sessionDetails == null) throw new BadRequestError('Please try again later');
  return sessionDetails;
};

const doGetCountOfUpcomingSessions = async ({
  BadRequestError,
  StudentsSection,
  studentId,
  SchoolSession,
  Op,
  page,
  perPage,
}) => {
  const today = Date.now();
  const sectionDetails = await StudentsSection.findOne({
    where: {
      studentId,
    },
  });
  const sessionDetails = await SchoolSession.findAll({
    where: {
      scheduledOn: {
        [Op.gt]: today,
      },
      classSectionId: sectionDetails.classSectionId,
    },
    ...paginate(page, perPage),
  });
  const upcomingClassesCount = sessionDetails.length;
  if (sessionDetails[0] == null) throw new BadRequestError('No Session Found');
  return { upcomingClassesCount, sessionDetails };
};

const doGetCountOfPrivateSessions = async ({
  BadRequestError,
  studentId,
  StudentTeacherPrivateSession,
  page,
  perPage,
}) => {
  const privateSessionDetails = await StudentTeacherPrivateSession.findAll({
    where: {
      studentId,
    },
    ...paginate(page, perPage),
  });
  const privateSessionCount = privateSessionDetails.length;
  if (privateSessionDetails[0] == null) throw new BadRequestError('No Session Found');
  return { privateSessionCount, privateSessionDetails };
};

const doGetProfile = async ({
  BadRequestError,
  studentId,
  User,
  Student,
  QualificationDetail,
  StudentQualification,
  School,
}) => {
  const studentProfileDetails = await Student.findOne({
    where: {
      id: studentId,
    },
    include: [
      {
        model: User,
      },
      {
        model: School,
      },
    ],
  });
  const qualificationDetail = await StudentQualification.findAll({
    where: {
      studentId,
    },
    include: [
      {
        model: QualificationDetail,
      },
    ],
  });
  if (studentProfileDetails == null && qualificationDetail[0] == null) throw new BadRequestError('No Data Found');
  return { studentProfileDetails, qualificationDetail };
};

const doGetAllHomeworkCount = async ({
  BadRequestError,
  studentId,
  MarkHomework,
  page,
  perPage,
}) => {
  const homeworkDetails = await MarkHomework.findAll({
    where: {
      studentId,
    },
    ...paginate(page, perPage),
  });
  const result = removeDuplicates(homeworkDetails, 'homeworkId');
  const homworkCount = result.length;
  if (homworkCount === 0) throw new BadRequestError('No homework Found');
  return { count: homworkCount, homework: result };
};

const doGetAllExtraCurricularCount = async ({
  BadRequestError,
  studentId,
  ExtracurricularStudent,
  ExtracurricularActivity,
  Student,
  page,
  perPage,
  Teacher,
}) => {
  const extracurricularStudentDetails = await ExtracurricularStudent.findAll({
    where: {
      studentId,
    },
    include: [
      {
        model: ExtracurricularActivity,
        include: {
          model: Teacher,
        },
      },
      {
        model: Student,
      },
    ],
    ...paginate(page, perPage),
  });
  const result = removeDuplicates(extracurricularStudentDetails, 'extracurricularActivityId');
  const extraCurricularCount = result.length;
  if (extraCurricularCount === 0) throw new BadRequestError('No homework Found');
  return { count: extraCurricularCount, activites: result };
};

const doGetUpcomingAndPrivateSessionByDate = async ({
  BadRequestError,
  StudentsSection,
  SchoolSession,
  moment,
  Op,
  StudentTeacherPrivateSession,
  studentId,
  date,
  page,
  perPage,
}) => {
  const momentDate = moment(date);

  const studentSectionDetails = await StudentsSection.findOne({
    where: {
      studentId,
    },
  });
  const studentSessionDetails = await SchoolSession.findAll({
    where: {
      classSectionId: studentSectionDetails && studentSectionDetails.classSectionId,
      scheduledOn: {
        [Op.gt]: momentDate,
      },
    },
    ...paginate(page, perPage),
  });
  const studentPrivateSessionDetails = await StudentTeacherPrivateSession.findAll({
    where: {
      studentId,
    },
    ...paginate(page, perPage),
  });
  const studentPrivateSessionCount = studentPrivateSessionDetails.length;
  const studentSessionCount = studentSessionDetails.length;
  if (studentSessionCount === 0 && studentPrivateSessionCount === 0) throw new BadRequestError('No Session Found');
  return {
    schoolUpcomingSession: studentSessionCount,
    studentSessionDetails,
    privateSession: studentPrivateSessionCount,
    studentPrivateSessionDetails,
  };
};


const doGetCountSchoolClassesByParams = async ({
  page,
  perPage,
  type,
  studentId,
  date_start,
  date_end,
  SchoolSession,
  SchoolSessionStudent,
  SchoolRecordSession,
  moment,
  Op,
  Teacher,
}) => {
  if (type === "session") {
    const countSessions = await SchoolSession.count({
      include:[
        {
          model: SchoolSessionStudent,
          where:{
            studentId,
          },
        }
      ],
    });
    return { countSessions };
  } else if (type === "recorded") {
    const countSessions = await SchoolRecordSession.count({
      where:{

      },
    });
    return { countSessions };
  }
};
const doGetAllRecommendedCount = async ({
  BadRequestError,
  Teacher,
  Recommend,
  RecommendedStudent,
  Student,
  page,
  perPage,
  studentId,
  SchoolRecordSession,
}) => {
  const studentsRecommendDetails = await RecommendedStudent.findAll({
    where: {
      studentId,
    },
    include: [
      {
        model: Recommend,
        include: [
            {
              model: SchoolRecordSession,
            },
            {
              model: Teacher,
            },
        ],
      },
      {
        model: Student,
      },
    ],
    ...paginate(page, perPage),
  });
  const result = removeDuplicates(studentsRecommendDetails, 'recommendId');
  const studentsRecommendCount = result.length;
  // if (studentsRecommendCount === 0) throw new BadRequestError('No Recommend Found');
  return { studentsRecommendCount, result };
};

const doGetAllFilteredPreviousSessionsBySubject = async ({
  BadRequestError,
  Teacher,
  Subject,
  SchoolSession,
  Op,
  page,
  perPage,
  subjectId,
}) => {
  const today = Date.now();
  const sessionDetails = await SchoolSession.findAll({
    where: {
      subjectId,
      scheduledOn: {
        [Op.lt]: today,
      },
    },
    include: [
      {
        model: Teacher,
      },
      {
        model: Subject,
      },
    ],
    ...paginate(page, perPage),
  });
  const result = removeDuplicates(sessionDetails, 'id');
  const previousCount = result.length;
  if (result[0] == null) throw new BadRequestError('No Sessions Found');
  return { result, previousCount };
};

const doCreateNotifications = async ({
  Notifications,
  userId,
  description,
  topic,
  sequelize
}) => {
  const result = await Notifications.create({
    userId,
    topic,
    description,
    date: sequelize.literal('CURRENT_TIMESTAMP')
  });
  return result;
};

const doGetNotifications = async ({
  userId,
  Notifications,
}) => {
  const result = await Notifications.findAll({
    where: {
      userId,
    },
    order: [['date', 'DESC']],
  });
  await Notifications.update({
    is_read: true,
  },{
    where:{
      userId,
    },
  });
  return result;
};

const doGetNotificationsCheck = async ({
  userId,
  Notifications,
  ChatParticipant,
  ChatMessageRead,
}) => {
  const result = await Notifications.count({
    where: {
      userId,
      is_read: 'false',
    },
    order: [['date', 'DESC']],
  });

  const chatCount = await ChatMessageRead.count({
    where: {
      userId,
    },
    group: ['groupId'],
  });

  return { unreadNotificationCount: result, unreadMessagesCount: chatCount.length};
};

const doGetStudentAllExpense = async ({
  userRoleId,
  Transaction,
  sequelize,
  Op,
}) => {
  const totalSale = await Transaction.findAll({
    attributes: [[sequelize.fn('to_char', sequelize.col('createdAt'), 'Mon'), 'month'], [sequelize.fn('COUNT', 'id'), 'studentCount'], [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount']],
    where: {
      studentId: userRoleId,
      [Op.and]:[
        sequelize.where(sequelize.fn("date_part",'year',sequelize.col('createdAt')), new Date().getFullYear()),
      ],
    },
    group: [sequelize.fn('to_char', sequelize.col('createdAt'), 'Mon')]
  });
  const recorded = await Transaction.findAll({
    attributes: [[sequelize.fn('to_char', sequelize.col('createdAt'), 'Mon'), 'month'], [sequelize.fn('COUNT', 'id'), 'studentCount'], [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount']],
    where: {
      studentId: userRoleId,
      classType: "0",
      [Op.and]:[
        sequelize.where(sequelize.fn("date_part",'year',sequelize.col('createdAt')), new Date().getFullYear()),
      ],
    },
    group: [sequelize.fn('to_char', sequelize.col('createdAt'), 'Mon')]
  });
  const liveClass = await Transaction.findAll({
    attributes: [[sequelize.fn('to_char', sequelize.col('createdAt'), 'Mon'), 'month'], [sequelize.fn('COUNT', 'id'), 'studentCount'], [sequelize.fn('sum', sequelize.col('amount')), 'totalAmount']],
    where: {
      studentId: userRoleId,
      classType: "1",
      [Op.and]:[
        sequelize.where(sequelize.fn("date_part",'year',sequelize.col('createdAt')), new Date().getFullYear()),
      ],
    },
    group: [sequelize.fn('to_char', sequelize.col('createdAt'), 'Mon')]
  });

  let averageSale = 0;
  totalSale.forEach((item) => {
    averageSale += parseFloat(item.dataValues.totalAmount);
  });

  return { recordStats: recorded, liveStats: liveClass, totalSale, averageSpend: (averageSale/12).toFixed(2) };
};

const doAddTutorReviewByStudent = async ({
  BadRequestError,
  userRoleId,
  userId,
  TeacherReview,
  teacherId,
  description,
  rating,
  recommend,
}) => {
  const findReview = await TeacherReview.findOne({
    where:{
      userId,
      teacherId,
    }
  });
  if (findReview) throw new BadRequestError('Review Already Exists.');
  const reviewTutor = await TeacherReview.create({
    userId,
    teacherId,
    description,
    rating,
    recommend,
  });

  return reviewTutor;
};


const doGetSchoolRecordPreviousById = async ({
  studentId,
  userId,
  id,
  SchoolRecordSession,
  SchoolRecordSessionStudent,
  Student,
  User,
  Teacher,
  Subject,
  TeacherSubject,
  FavouriteSession,
  SessionReview,
}) => {
  const isFav = await FavouriteSession.count({
    where:{
      sessionId: id,
      userId,
      active:true,
      type: 'recorded',
      state: 'school',
    }
  });
  const recordClass = await SchoolRecordSession.findAll({
    where:{
      id,
    },
    include:[
      {
        model: TeacherSubject,
        include:[
          {
            model: Teacher,
            attributes: ['id', 'firstName', 'lastName', 'userId'],
            include: {
              model : User,
              attributes: ['id', 'email', 'profile'],
            }
          },
          {
            model: Subject,
          }
        ],
      },
      {
        model: SchoolRecordSessionStudent,
        where:{
          studentId,
        },
        include:[
          {
            model: Student,
            attributes:['id','firstName','lastName'],
            include:[
              {
                model: User,
                attributes:['id','email','profile'],
              },
            ],
          },
        ],
      },
    ],
  });
  const isReviewed = await SessionReview.count({
    where:{
      type:'school',
      sessionId: id,
      userId,
    }
  });

  return {
    prerecordedSessions: recordClass,
    isFavourite: (isFav === 1),
    isFavourite1: false,
    isLivePurchasedValue: "paid",
    isLiveSessionReviewed: 0,
    isRecordSessionValue: false,
    isRecordSessionReviewed: isReviewed,
    recordSessionDetails: null
  }
};
const doGetSchoolRecordPrevious = async ({
  page,
  perPage,
  studentId,
  userId,
  SchoolRecordSession,
  SchoolRecordSessionStudent,
  Student,
  User,
  Teacher,
  Subject,
  TeacherSubject,
  Op,
  moment,
}) => {
  let resultFrom = moment().subtract(270, "days").format('YYYY-MM-DD HH:mm:ss Z');
  const recordClass = await SchoolRecordSession.findAndCountAll({
    include:[
        {
          model: TeacherSubject,
          include:[
            {
              model: Teacher,
              attributes: ['id', 'firstName', 'lastName', 'userId'],
              include: {
                model : User,
                attributes: ['id', 'email', 'profile'],
              }
            },
            {
              model: Subject,
            }
          ],
        },
        {
          model: SchoolRecordSessionStudent,
          where:{
            studentId,
          },
          include:[
            {
              model: Student,
              attributes:['id','firstName','lastName'],
              include:[
                {
                  model: User,
                  attributes:['id','email','profile'],
                },
              ],
            },
          ],
        }
    ],
    where:{
      createdAt:{
        [Op.gte]: resultFrom,
      },
    },
    order:[['createdAt','DESC']],
    ...paginate(page, perPage),
  });
  return {
    prerecordedSessions: recordClass.rows,
    current_listing: recordClass.rows.length,
    previousCount: recordClass.count,
  }
};

const doGetSchoolProfile = async ({
  BadRequestError,
  School,
  studentId,
  Student,
  User,
}) => {
  const schoolProfileDetails = await Student.findOne({
    where: {
      id: studentId,
    },
    include: {
      model: School,
      include: {
        model: User,
      },
    },
  });
  if (schoolProfileDetails == null) throw new BadRequestError('Detail Not Found');
  return schoolProfileDetails;
};

const doGetAllFilteredUpcomingSessionsAndExtraCurricularBySubject = async ({
  BadRequestError,
  Teacher,
  Subject,
  SchoolSession,
  Op,
  page,
  perPage,
  subjectId,
  ExtracurricularActivity,
}) => {
  const today = Date.now();
  const subjectData = await Subject.findOne({
    where: {
      id: subjectId,
    },
  });
  const sessionDetails = await SchoolSession.findAll({
    where: {
      subjectId,
      scheduledOn: {
        [Op.gt]: today,
      },
    },
    include: [
      {
        model: Teacher,
      },
      {
        model: Subject,
      },
    ],
    ...paginate(page, perPage),
  });
  const upcomingSessionCount = sessionDetails.length;
  const extraCurricularDetails = await ExtracurricularActivity.findAll({
    where: {
      subject: subjectData.subjectName,
    },
    include: {
      model: Teacher,
    },
    ...paginate(page, perPage),
  });
  const extraCurricularCount = extraCurricularDetails.length;
  if (sessionDetails[0] == null && extraCurricularDetails[0] == null) throw new BadRequestError('No Data Found');
  return {
    upcomingSessionCount, upcomingSession: sessionDetails, extraCurricularCount, extracurricularData: extraCurricularDetails,
  };
};

const doGetMessageRequest = async ({
  userId,
  MessageNotification,
}) => {
  const result = await MessageNotification.findAll({
    where: {
      receiverId: userId,
    },
  });
  return result;
};

const doGetAllHomeworkStatus = async ({
  studentId,
  MarkHomework,
  Homework,
  Teacher,
  Subject,
  Op,
}) => {
  const today = Date.now();
  const studentHomeworkDetails = await MarkHomework.findAll({
    where: {
      studentId,
      isComplete: false,
    },
  });
  const studentAllHomeworkDetails = await MarkHomework.findAll({
    where: {
      studentId,
    },
    include: {
      model: Homework,
    },
  });
  const overDueHW = [];
  const nonOverDueHW = [];
  await Promise.all(studentAllHomeworkDetails.map(async (data) => {
    const homeworkData1 = await Homework.findOne({
      where: {
        id: data.homeworkId,
        dueDate: {
          [Op.lt]: today,
        },
      },
      include: [
        {
          model: MarkHomework,
          where: {
            studentId,
          },
        },
        {
          model: Teacher,
        },
        {
          model: Subject,
        },
      ],
    });
    if (homeworkData1 !== null) {
      overDueHW.push(homeworkData1);
    }
    const homeworkData2 = await Homework.findOne({
      where: {
        id: data.homeworkId,
        dueDate: {
          [Op.gte]: today,
        },
      },
      include: [
        {
          model: MarkHomework,
          where: {
            studentId,
          },
        },
        {
          model: Teacher,
        },
        {
          model: Subject,
        },
      ],
    });
    if (homeworkData2 !== null) {
      nonOverDueHW.push(homeworkData2);
    }
  }));
  const overDueCount = overDueHW.length;
  const incompleteCount = studentHomeworkDetails.length;
  const allHomeworkCount = studentAllHomeworkDetails.length;
  const per = (incompleteCount / allHomeworkCount) * 100;
  return {
    incompleteCount,
    allHomeworkCount,
    overDueCount,
    overDueHW,
    nonOverDueHW,
    per,
    studentAllHomeworkDetails,
  };
};

const doGetAllHomeworkStatusBySubject = async ({
  studentId,
  MarkHomework,
  Homework,
  subjectId,
  Op,
  Teacher,
  Subject,
}) => {
  const today = Date.now();
  const studentHomeworks = await MarkHomework.findAll({
    where: {
      studentId,
    },
  });
  const incompleteHomework = [];
  const overDueHomework = [];
  const nonOverDueHomework = [];
  await Promise.all(studentHomeworks.map(async (data) => {
    const homeworkData = await Homework.findOne({
      where: {
        id: data.homeworkId,
        subjectId,
      },
      include: [
        {
          model: MarkHomework,
          where: {
            studentId,
          },
        },
        {
          model: Teacher,
        },
        {
          model: Subject,
        },
      ],
    });
    if (homeworkData !== null && data.isComplete === false) {
      incompleteHomework.push(homeworkData);
    }
    const homeworkOverDueData = await Homework.findOne({
      where: {
        id: data.homeworkId,
        subjectId,
        dueDate: {
          [Op.lt]: today,
        },
      },
      include: [
        {
          model: MarkHomework,
          where: {
            studentId,
          },
        },
        {
          model: Teacher,
        },
        {
          model: Subject,
        },
      ],
    });
    const homeworkNonOverDueData = await Homework.findOne({
      where: {
        id: data.homeworkId,
        subjectId,
        dueDate: {
          [Op.gt]: today,
        },
      },
      include: [
        {
          model: MarkHomework,
          where: {
            studentId,
          },
        },
        {
          model: Teacher,
        },
        {
          model: Subject,
        },
      ],
    });
    if (homeworkOverDueData !== null) {
      overDueHomework.push(homeworkOverDueData);
    }
    if (homeworkNonOverDueData !== null) {
      nonOverDueHomework.push(homeworkNonOverDueData);
    }
  }));
  const incompleteCount = incompleteHomework.length;
  const allHomeworkCount = studentHomeworks.length;
  const overDueCount = overDueHomework.length;
  return {
    incompleteCount,
    allHomeworkCount,
    overDueCount,
    overDueHomework,
    nonOverDueHomework,
  };
};
const doDeleteNotifications = async ({
  Notifications,
  userId,
}) => {
  const result = await Notifications.destroy({
    where: {
      userId,
    },
  });
  return result;
};

const doGetStudentExamResults = async ({
 studentId,
 Student,
 Subject,
 Term,
 Exam,
 moment,
 Op,
 Teacher,
 ExamStudent,
 User,
 page,
 perPage,
 month_start,
 month_end,
 sequelize,
}) => {
  let whereQuery = {};
  if(month_start && month_end){
    let m_start = moment(month_start).startOf('day').format('YYYY-MM-DD HH:mm:ss Z');
    let m_end = moment(month_end).endOf('day').format('YYYY-MM-DD HH:mm:ss Z');
    if(m_start && m_end){
      whereQuery = {
        createdAt:{
          [Op.between]: [m_start, m_end],
        },
      }
    }
  }
  const exams = await ExamStudent.findAndCountAll({
    where: {
      studentId,
      percentage: {
        [Op.ne]: null,
      }
    },
    include: [
      {
        model: Exam,
        include: [
          {
            model: Term,
            attributes:['id', 'termName'],
          },
          {
            model: Teacher,
            attributes:['id', 'firstName', 'lastName', 'userId'],
            include: {
              model: User,
              attributes:['id', 'email', 'profile'],
            },
          },
          {
            model: Subject,
          }
        ],
        where: whereQuery,
      },
      {
        model: Student,
        attributes:['id', 'firstName', 'lastName', 'userId'],
        include: {
          model: User,
          attributes:['id', 'email', 'profile'],
        },
      }
    ],
    order:[
      [{model: Exam, as: 'Exam'}, 'createdAt', 'DESC'],
    ],
    ...paginate(page, perPage),
  });
  const calculation = await ExamStudent.findAll({
    attributes:[
      'id',
      'percentage',
      'examId',
      [sequelize.fn('sum', sequelize.col('percentage')), 'total_amount'],
    ],
    where: {
      studentId,
      percentage: {
        [Op.ne]: null,
      }
    },
    include: [
      {
        model: Exam,
        where: whereQuery,
        attributes:[
          'id',
          'predicted',
          [sequelize.fn('sum', sequelize.col('predicted')), 'total_predicted'],
        ],
      }
    ],
    group:["Exam.id", "ExamStudent.id"],
  });

  let tPrediction = 0;
  let tPercentage = 0;
  let targetAverage = [];
  let yourAverage = [];

  await Promise.all(
      calculation.map(async item => {
        tPercentage  += parseInt(item.dataValues.total_amount);
        tPrediction  += parseInt(item.Exam.predicted);
        yourAverage.push(parseInt(item.percentage));
        targetAverage.push(parseInt(item.Exam.predicted));
      })
  )

  let total = calculation.length;
  let average = 0;
  let prediction = 0;
  if(tPercentage/total)
    average = (tPercentage/total).toFixed(1);

  if(tPrediction/total)
    prediction = (tPrediction/total).toFixed(1);

  return {
    graph: {
      targetAverage: targetAverage.sort((a, b) => (b - a)),
      yourAverage: yourAverage.sort((a, b) => (b - a)),
    },
    average,
    prediction,
    exams,
  };

};
const doGetStudentExamResultsById = async ({
  Student,
  Subject,
  Term,
  Exam,
  Teacher,
  ExamStudent,
  User,
  id,
}) => {

  const exams = await ExamStudent.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Exam,
        include: [
          {
            model: Term,
            attributes:['id', 'termName'],
          },
          {
            model: Teacher,
            attributes:['id', 'firstName', 'lastName', 'userId'],
            include: {
              model: User,
              attributes:['id', 'email', 'profile'],
            },
          },
          {
            model: Subject,
          }
        ],
      },
      {
        model: Student,
        attributes:['id', 'firstName', 'lastName', 'userId'],
        include: {
          model: User,
          attributes:['id', 'email', 'profile'],
        },
      }
    ],
  });

  return exams;


};
const doGetAllTimeTable = async ({
  studentIdRoleValue,
  Period,
  Timetable,
  StudentTimetable,
  Section,
  Class,
  ClassSection,
  Teacher,
  Subject,
  SectionDetail,
  date,
  Op,
  moment,
  User,
}) => {
  const startOfTheWeek = moment(date, 'YYYY-MM-DD').startOf('week').format('YYYY-MM-DD');
  const endOfTheWeek = moment(date, 'YYYY-MM-DD').endOf('week').format('YYYY-MM-DD');
  const studentTimetableIds = await StudentTimetable.findAll({
    where: {
      studentId: studentIdRoleValue,
    },
  });
  const studentTimetable = [];
  await Promise.all(studentTimetableIds.map(async (data) => {
    const checkQuery = date
        ? { id: data.timetableId, startDate: { [Op.between]: [startOfTheWeek, endOfTheWeek] } }
        : { id: data.timetableId };

    const timeTableData = await Timetable.findAll({
      include: [
        {
          model: Class,
          include: {
            model: ClassSection,
            include: [
              {
                model: Section,
              },
            ],
          },
        },
        {
          model: Subject,
        },
      ],
      where: checkQuery,
    });
    let teacherResultDetails = [];
    if (timeTableData.length) {
      await Promise.all(timeTableData[0].teachersId.map(async (teacherIds) => {
        let teacherDetails = await Teacher.findOne({
          attributes:['id','firstName', 'lastName'],
          include: {
            model: User,
            attributes:['id','email', 'roleId', 'profile', 'whiteboardUserId'],
          },
          where: {
            id: teacherIds,
          },
        });
        teacherResultDetails.push(teacherDetails);
      }));
      timeTableData[0].dataValues.Teacher  = teacherResultDetails;
      studentTimetable.push(timeTableData[0]);
    }
  }));
  return studentTimetable;
};

const doGetAllTimeTableClassByDate = async ({
  studentId,
  BadRequestError,
  Period,
  Timetable,
  StudentTimetable,
  Section,
  Class,
  ClassSection,
  Teacher,
  Subject,
  SectionDetail,
  Op,
  date,
  moment,
  sequelize,
  User,
  sort_title,
  sort_order,
}) => {
  const momentDate = moment(date).format('YYYY-MM-DD');
  const studentTimetableIds = await StudentTimetable.findAll({
    where: {
      studentId,
    },
  });
  const result1 = [];

  await Promise.all(studentTimetableIds.map(async (data) => {
    if (data.timetableId){
      const timeTableData = await Timetable.findOne({
        include: [
          {
            model: Class,
            include: {
              model: ClassSection,
              include: [
                {
                  model: Section,
                },
              ],
            },
          },
          {
            model: Subject,
          },
        ],
        where: {
          id: data.timetableId,
          [Op.and]:[
            sequelize.where(sequelize.fn("date",sequelize.col('startDate')), '=', momentDate )
          ],
        },
      });
      let teacherResultDetails = [];
      if (timeTableData !== null) {
        await Promise.all(timeTableData.teachersId.map(async (teacherIds) => {
          let teacherDetails = await Teacher.findOne({
            attributes:['id','firstName', 'lastName'],
            include: {
              model: User,
              attributes:['id','email', 'roleId', 'profile', 'whiteboardUserId'],
            },
            where: {
              id: teacherIds,
            },
          });
          teacherResultDetails.push(teacherDetails);
        }));
        timeTableData.dataValues.Teacher  = teacherResultDetails;

        result1.push(timeTableData);
      }
      return false;
    }
  }));

  result1.sort(function(a, b) {
    if (a.startTime < b.startTime) return -1;
    return 0;
  });





  // if (result1[0] == null) throw new BadRequestError('No Data Found');
  return result1;
};

const doGetHomeworkDetail = async ({
  studentId,
  MarkHomework,
  Homework,
  Teacher,
  homeworkId,
  Subject,
  StudentHomework,
}) => {
  const result = await MarkHomework.findOne({
    where: {
      homeworkId,
      studentId,
    },
    include: {
      model: Homework,
      include: [
        {
          model: StudentHomework,
          include:{
            model: Teacher,
            attributes:['id', 'firstName', 'lastName'],
          },
        },
        {
          model: Subject,
        },
        {
          model: Teacher,
        },
      ],
    },
    order: [
      [ Homework, 'id', 'DESC' ],
      [ Homework, StudentHomework, 'id', 'DESC' ]
    ]
  });
  return result;
};

const doSubmitHomeworkPhysically = async ({
  studentId,
  isSubmitted,
  MarkHomework,
  homeworkId,
}) => {
  const result = await MarkHomework.update({ isSubmitted },
    {
      where: {
        homeworkId,
        studentId,
      },
    });
  return result;
};

const doAcceptRecommendation = async ({
  RecommendedStudent,
  recommendId,
  studentId,
  status,
}) => {
  const result = await RecommendedStudent.update({ status },
    {
      where: {
        recommendId,
        studentId,
      },
    });
  return result;
};

const doUpdateStudentComments = async ({
  Feedback,
  id,
  updateBody,
}) => {
  const result = await Feedback.update(
      updateBody,
      {
        where: {
          id,
        },
      });
  return result;
};

const doUpdateRecommendationComments = async ({
  RecommendedStudent,
  recommendId,
  updateBody,
}) => {
  const result = await RecommendedStudent.update(
      updateBody,
      {
        where: {
          id: recommendId,
        },
      });
  return result;
};

const doGetStudentAllComments = async ({
  Teacher,
  Student,
  Feedback,
  User,
  userRoleId,
  type,
}) => {
  let whereQuery;
  if (type === 'merits') {
    whereQuery = {
      studentId: userRoleId,
      type: "merits"
    }
  } else if (type === "sanctions") {
    whereQuery = {
      studentId: userRoleId,
      type: "sanctions"
    }
  } else if (type === "comment") {
    whereQuery = {
      studentId: userRoleId,
      type: "comment"
    }
  } else {
    whereQuery = {
      studentId: userRoleId,
    }
  }
  const result = await Feedback.findAll({
      include:[
        {
          model: Student,
          include:{
            model: User,
          }
        },
        {
          model: Teacher,
          include:{
            model: User,
          }
        }
      ],
      where: whereQuery,
  });
  return result;
};

module.exports = {
  doAddQualification,
  doGetQualification,
  doUpdateQualification,
  doDeleteQualification,
  doGetHomeworkBySubjectId,
  doGetStudentHomeworkSubject,
  doGetUpcomingEvents,
  doUploadHomework,
  doGetAllFeaturedSubjects,
  doGetAllUpcomingSessions,
  doGetAllPreviousSessions,
  doGetAllFeaturedTeachers,
  doGetAllFilteredTeachersBySubject,
  doGetAllFilteredSessionsBySubject,
  doGetCountFromFilter,
  doGetSessionById,
  doBookPrivateSession,
  doGetCountOfUpcomingSessions,
  doGetCountOfPrivateSessions,
  doGetProfile,
  doGetAllHomeworkCount,
  doGetAllExtraCurricularCount,
  doGetUpcomingAndPrivateSessionByDate,
  doGetCountSchoolClassesByParams,
  doGetAllRecommendedCount,
  doGetAllFilteredPreviousSessionsBySubject,
  doGetSchoolProfile,
  doGetSchoolRecordPrevious,
  doGetSchoolRecordPreviousById,
  doGetAllFilteredUpcomingSessionsAndExtraCurricularBySubject,
  doGetNotifications,
  doCreateNotifications,
  doGetMessageRequest,
  doGetAllHomeworkStatus,
  doGetAllHomeworkStatusBySubject,
  doDeleteNotifications,
  doGetAllTimeTable,
  doGetAllTimeTableClassByDate,
  doGetHomeworkDetail,
  doSubmitHomeworkPhysically,
  doAcceptRecommendation,
  doGetNotificationsCheck,
  doGetStudentAllExpense,
  doAddTutorReviewByStudent,
  doGetStudentExamResults,
  doGetStudentExamResultsById,
  doGetStudentAllComments,
  doUpdateStudentComments,
  doUpdateRecommendationComments,
};
