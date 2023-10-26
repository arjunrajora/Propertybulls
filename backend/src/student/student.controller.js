const deleteQualification = ({
  BadRequestError,
  Student,
  QualificationDetail,
  StudentQualification,
  doDeleteQualification,
}) => async (httpRequest) => {
  const {
    qualificationId,
  } = httpRequest.params;
  const {
    userRoleId,
  } = httpRequest.user;
  const data = await doDeleteQualification({
    QualificationDetail,
    userRoleId,
    Student,
    BadRequestError,
    StudentQualification,
    qualificationId,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Deleted Qualification details successfully!',
      data,
    },
  };
};
const addQualification = ({
  doAddQualification,
  Student,
  QualificationDetail,
  BadRequestError,
  validateAddQualificationData,
  StudentQualification,
}) => async (httpRequest) => {
  const qualificationData = httpRequest.body;
  const {
    userRoleId,
  } = httpRequest.user;
  const {
    error,
  } = validateAddQualificationData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const data = await doAddQualification({
    QualificationDetail,
    userRoleId,
    Student,
    BadRequestError,
    qualificationData,
    StudentQualification,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Added Qualification details successfully!',
      data,
    },
  };
};

const updateQualification = ({
  doUpdateQualification,
  Student,
  QualificationDetail,
  BadRequestError,
  validateAddQualificationData,
  StudentQualification,
}) => async (httpRequest) => {
  const qualificationData = httpRequest.body;
  const {
    qualificationId,
  } = httpRequest.params;
  const {
    userRoleId,
  } = httpRequest.user;

  const data = await doUpdateQualification({
    QualificationDetail,
    userRoleId,
    Student,
    BadRequestError,
    qualificationData,
    StudentQualification,
    qualificationId,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Updated Qualification details successfully!',
      data,
    },
  };
};

const getQualification = ({
  BadRequestError,
  doGetQualification,
  Student,
  QualificationDetail,
  StudentQualification,
}) => async (httpRequest) => {
  console.log('@@@',httpRequest.user);
  const {
    userRoleId, userId,
  } = httpRequest.user;
  const data = await doGetQualification({
    QualificationDetail,
    userRoleId,
    userId,
    Student,
    BadRequestError,
    StudentQualification,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Qualification details successfully!',
      data,
    },
  };
};

const getHomeworkBySubjectId = ({
  BadRequestError,
  Student,
  doGetHomeworkBySubjectId,
  Homework,
  StudentHomework,
  sequelize,
}) => async (httpRequest) => {
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const {
    subjectId,
  } = httpRequest.params;
  const data = await doGetHomeworkBySubjectId({
    studentId,
    subjectId,
    BadRequestError,
    Homework,
    StudentHomework,
    sequelize,
    Student,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Homework Subject wise successfully!',
      data,
    },
  };
};

const getStudentHomeworkSubject = ({
  BadRequestError,
  Homework,
  MarkHomework,
  Subject,
  sequelize,
  doGetStudentHomeworkSubject,
}) => async (httpRequest) => {
  const { userRoleId: studentId } = httpRequest.user;
  const data = await doGetStudentHomeworkSubject({
    BadRequestError,
    Homework,
    MarkHomework,
    Subject,
    sequelize,
    studentId,
  });

  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Student Homework Subject list successfully!',
      data,
    },
  };
};
const getUpcomingEvents = ({
  BadRequestError,
  doGetUpcomingEvents,
  Event,
  Student,
  EventInvited,
  Op,
  moment,
}) => async (httpRequest) => {
  const {
    userRoleId,
    userId,
  } = httpRequest.user;
  const {
    date,
  } = httpRequest.query;
  const data = await doGetUpcomingEvents({
    Event,
    Student,
    userRoleId,
    date,
    BadRequestError,
    userId,
    EventInvited,
    Op,
    moment,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched event successfully!',
      data,
    },
  };
};
const uploadHomework = ({
  BadRequestError,
  Student,
  doUploadHomework,
  Homework,
  MarkHomework,
  sequelize,
  StudentHomework,
}) => async (httpRequest) => {
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const {
    homeworkId,
  } = httpRequest.params;
  const {
    fileName,
    comment,
    submittedOn,
  } = httpRequest.body;
  const data = await doUploadHomework({
    studentId,
    homeworkId,
    BadRequestError,
    Homework,
    MarkHomework,
    sequelize,
    Student,
    fileName,
    comment,
    StudentHomework,
    submittedOn,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Upload Homework successfully!',
      data,
    },
  };
};

const getAllFeaturedSubjects = ({
  BadRequestError,
  Subject,
  doGetAllFeaturedSubjects,
  sequelize,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const data = await doGetAllFeaturedSubjects({
    Subject,
    BadRequestError,
    sequelize,
    page,
    perPage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched All Featured Subjects successfully!',
      data,
    },
  };
};

const getAllUpcomingSessions = ({
  BadRequestError,
  SchoolSession,
  doGetAllUpcomingSessions,
  sequelize,
  SchoolSessionRoutine,
  Op,
  StudentsSection,
  Teacher,
  Subject,
  moment,
  SchoolRecordSession,
  SchoolRecordSessionStudent,
  SchoolSessionStudent,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const sort_title = httpRequest.query.sort_title || 'startDate';
  const sort_order = httpRequest.query.sort_order || 'asc';
  const date_start = httpRequest.query.date_start || '';
  const date_end = httpRequest.query.date_end || '';
  const query_keyword = httpRequest.query.query_keyword || '';
  const perTime = httpRequest.query.perTime || '';

  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetAllUpcomingSessions({
    BadRequestError,
    sequelize,
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
    SchoolRecordSession,
    SchoolRecordSessionStudent,
    SchoolSessionStudent,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched All Upcoming Sessions successfully!',
      data,
    },
  };
};

const getAllPreviousSessions = ({
  BadRequestError,
  SchoolSession,
  doGetAllPreviousSessions,
  sequelize,
  SchoolSessionRoutine,
  Op,
  Teacher,
  Subject,
  StudentsSection,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetAllPreviousSessions({
    BadRequestError,
    sequelize,
    SchoolSession,
    SchoolSessionRoutine,
    Op,
    StudentsSection,
    studentId,
    page,
    perPage,
    Teacher,
    Subject,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched All Previous Sessions successfully!',
      data,
    },
  };
};

const getAllFeaturedTeachers = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetAllFeaturedTeachers,
  sequelize,
  StudentsSection,
  User,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetAllFeaturedTeachers({
    BadRequestError,
    sequelize,
    SectionDetail,
    ClassSection,
    Teacher,
    StudentsSection,
    studentId,
    User,
    page,
    perPage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched All featured Teacher successfully!',
      data,
    },
  };
};

const getAllFilteredTeachersBySubject = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetAllFilteredTeachersBySubject,
  sequelize,
  StudentsSection,
  Subject,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const { subjectId } = httpRequest.params;
  const data = await doGetAllFilteredTeachersBySubject({
    BadRequestError,
    sequelize,
    SectionDetail,
    ClassSection,
    Teacher,
    StudentsSection,
    studentId,
    subjectId,
    Subject,
    page,
    perPage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched All Filtered Teacher By Subject successfully!',
      data,
    },
  };
};

const getAllFilteredSessionsBySubject = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetAllFilteredSessionsBySubject,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const { subjectId } = httpRequest.params;
  const data = await doGetAllFilteredSessionsBySubject({
    BadRequestError,
    sequelize,
    SectionDetail,
    ClassSection,
    Teacher,
    StudentsSection,
    studentId,
    subjectId,
    Subject,
    SchoolSession,
    page,
    perPage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched All Filtered Sessions By Subject successfully!',
      data,
    },
  };
};

const getCountFromFilter = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetCountFromFilter,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const { subjectId } = httpRequest.params;
  const data = await doGetCountFromFilter({
    BadRequestError,
    sequelize,
    SectionDetail,
    ClassSection,
    Teacher,
    StudentsSection,
    studentId,
    subjectId,
    Subject,
    SchoolSession,
    page,
    perPage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Count Filtered Sessions & Teachers By Subject successfully!',
      data,
    },
  };
};

const getSessionById = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetSessionById,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
  moment,
  SchoolSessionStudent,
  Student,
  User,
  FavouriteSession,
  SessionReview,
}) => async (httpRequest) => {
  const {
    userId,
    userRoleId: studentId,
  } = httpRequest.user;
  const { id: sessionId } = httpRequest.params;
  const data = await doGetSessionById({
    BadRequestError,
    sequelize,
    SectionDetail,
    ClassSection,
    Teacher,
    StudentsSection,
    studentId,
    sessionId,
    Subject,
    SchoolSession,
    moment,
    SchoolSessionStudent,
    Student,
    User,
    FavouriteSession,
    userId,
    SessionReview,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetch Session By ID successfully!',
      data,
    },
  };
};

const bookPrivateSession = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doBookPrivateSession,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
  moment,
  StudentTeacherPrivateSession,
  validatePrivateSessionData,
}) => async (httpRequest) => {
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const privateSessionData = httpRequest.body;
  const {
    error,
  } = validatePrivateSessionData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  const { teacherId } = httpRequest.params;
  const data = await doBookPrivateSession({
    BadRequestError,
    sequelize,
    SectionDetail,
    ClassSection,
    Teacher,
    StudentsSection,
    studentId,
    teacherId,
    Subject,
    SchoolSession,
    moment,
    StudentTeacherPrivateSession,
    privateSessionData,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Booked Private class successfully!',
      data,
    },
  };
};

const getCountOfUpcomingSessions = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetCountOfUpcomingSessions,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
  moment,
  Op,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const { teacherId } = httpRequest.params;
  const data = await doGetCountOfUpcomingSessions({
    BadRequestError,
    sequelize,
    SectionDetail,
    ClassSection,
    Teacher,
    StudentsSection,
    studentId,
    teacherId,
    Subject,
    SchoolSession,
    moment,
    Op,
    page,
    perPage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'count Upcoming students session successfully!',
      data,
    },
  };
};

const getCountOfPrivateSessions = ({
  BadRequestError,
  doGetCountOfPrivateSessions,
  StudentTeacherPrivateSession,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetCountOfPrivateSessions({
    BadRequestError,
    studentId,
    StudentTeacherPrivateSession,
    page,
    perPage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched count of private session successfully!',
      data,
    },
  };
};

const getProfile = ({
  BadRequestError,
  doGetProfile,
  User,
  Student,
  QualificationDetail,
  StudentQualification,
  School,
}) => async (httpRequest) => {
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetProfile({
    BadRequestError,
    studentId,
    User,
    Student,
    QualificationDetail,
    StudentQualification,
    School,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Profile, About, Education Detail  successfully!',
      data,
    },
  };
};

const getAllHomeworkCount = ({
  BadRequestError,
  doGetAllHomeworkCount,
  MarkHomework,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetAllHomeworkCount({
    BadRequestError,
    studentId,
    MarkHomework,
    page,
    perPage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Homework Count successfully!',
      data,
    },
  };
};

const getAllExtraCurricularCount = ({
  BadRequestError,
  doGetAllExtraCurricularCount,
  ExtracurricularStudent,
  ExtracurricularActivity,
  Student,
  Teacher,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetAllExtraCurricularCount({
    BadRequestError,
    studentId,
    ExtracurricularStudent,
    ExtracurricularActivity,
    Student,
    perPage,
    page,
    Teacher,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched extra curricular Count successfully!',
      data,
    },
  };
};

const getUpcomingAndPrivateSessionByDate = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetUpcomingAndPrivateSessionByDate,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
  moment,
  Op,
  StudentTeacherPrivateSession,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    date,
  } = httpRequest.params;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetUpcomingAndPrivateSessionByDate({
    BadRequestError,
    SectionDetail,
    ClassSection,
    Teacher,
    sequelize,
    StudentsSection,
    Subject,
    SchoolSession,
    moment,
    Op,
    StudentTeacherPrivateSession,
    studentId,
    date,
    page,
    perPage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Upcoming & Private Session By Date successfully!',
      data,
    },
  };
};

const getCountSchoolClassesByParams = ({
  doGetCountSchoolClassesByParams,
  SchoolSession,
  SchoolSessionStudent,
  SchoolRecordSession,
  moment,
  Op,
  Teacher,
}) => async (httpRequest) =>{
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const type = httpRequest.query.type || 'session';
  const date_start = httpRequest.query.date_start || '';
  const date_end = httpRequest.query.date_end || '';
  const { userRoleId: studentId } = httpRequest.user;
  const data = await doGetCountSchoolClassesByParams({
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
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Upcoming & Private Session By Date successfully!',
      data,
    },
  };
}

const getAllRecommendedCount = ({
  BadRequestError,
  Teacher,
  doGetAllRecommendedCount,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
  moment,
  Op,
  Recommend,
  RecommendedStudent,
  Student,
  SchoolRecordSession,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetAllRecommendedCount({
    BadRequestError,
    Teacher,
    sequelize,
    StudentsSection,
    Subject,
    SchoolSession,
    moment,
    Op,
    Recommend,
    RecommendedStudent,
    Student,
    page,
    perPage,
    studentId,
    SchoolRecordSession,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Students recommended successfully!',
      data,
    },
  };
};

const getAllFilteredPreviousSessionsBySubject = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  moment,
  Op,
  doGetAllFilteredPreviousSessionsBySubject,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
  Student,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const { subjectId } = httpRequest.params;
  const data = await doGetAllFilteredPreviousSessionsBySubject({
    BadRequestError,
    Teacher,
    sequelize,
    StudentsSection,
    Subject,
    SchoolSession,
    moment,
    Op,
    Student,
    page,
    perPage,
    studentId,
    SectionDetail,
    ClassSection,
    subjectId,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Students Previous session By subject successfully!',
      data,
    },
  };
};

const getSchoolProfile = ({
  BadRequestError,
  doGetSchoolProfile,
  sequelize,
  StudentsSection,
  Subject,
  School,
  SchoolSession,
  Student,
  User,
}) => async (httpRequest) => {
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const data = await doGetSchoolProfile({
    BadRequestError,
    sequelize,
    StudentsSection,
    Subject,
    School,
    studentId,
    SchoolSession,
    Student,
    User,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Students school info successfully!',
      data,
    },
  };
};

const getNotifications = ({
  doGetNotifications,
  Notifications,
  ChatMessage,
}) => async (httpRequest) => {
  const { userId } = httpRequest.user;
  const data = await doGetNotifications({
    userId,
    Notifications,
    ChatMessage,
  });
  return {
    statusCode: 200,
    body: {
      success: true,

      message: 'Fetched notification successfully!',
      data,
    },
  };
};


const getNotificationsCheck = ({
  doGetNotificationsCheck,
  Notifications,
  ChatParticipant,
  ChatMessageRead,
}) => async (httpRequest) => {
  const { userId } = httpRequest.user;
  const data = await doGetNotificationsCheck({
    userId,
    Notifications,
    ChatParticipant,
    ChatMessageRead,
  });
  return {
    statusCode: 200,
    body: {
      success: true,

      message: 'Fetched notification successfully!',
      data,
    },
  };
};

const getStudentAllExpense = ({
  doGetStudentAllExpense,
  Transaction,
  sequelize,
  Op,
}) => async (httpRequest) => {
  const { userRoleId } = httpRequest.user;
  const data = await doGetStudentAllExpense({
    userRoleId,
    Transaction,
    sequelize,
    Op,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched all expense successfully!',
      data,
    },
  };
};

const addTutorReviewByStudent = ({
  BadRequestError,
  doAddTutorReviewByStudent,
  TeacherReview,
}) => async (httpRequest) => {
  const { userRoleId, userId } = httpRequest.user;
  const { teacherId, description, rating, recommend } = httpRequest.body;
  const data = await doAddTutorReviewByStudent({
    BadRequestError,
    userRoleId,
    userId,
    TeacherReview,
    teacherId,
    description,
    rating,
    recommend,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Add Student review for the tutor successfully!',
      data,
    },
  };
};


const getSchoolRecordPrevious = ({
  doGetSchoolRecordPrevious,
  SchoolRecordSession,
  SchoolRecordSessionStudent,
  Student,
  User,
  Teacher,
  Subject,
  TeacherSubject,
  Op,
  moment,
}) => async (httpRequest) => {
  const { userRoleId: studentId, userId } = httpRequest.user;
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const data = await doGetSchoolRecordPrevious({
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
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Student Recorded Classes Successfully!',
      data,
    },
  };
};


const getSchoolRecordPreviousById = ({
  doGetSchoolRecordPreviousById,
  SchoolRecordSession,
  SchoolRecordSessionStudent,
  Student,
  User,
  Teacher,
  Subject,
  TeacherSubject,
  FavouriteSession,
  SessionReview,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const { userRoleId: studentId, userId } = httpRequest.user;
  const data = await doGetSchoolRecordPreviousById({
    studentId,
    userId,
    SchoolRecordSession,
    SchoolRecordSessionStudent,
    Student,
    User,
    Teacher,
    id,
    Subject,
    TeacherSubject,
    FavouriteSession,
    SessionReview,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Student Recorded Classes Details Successfully!',
      data,
    },
  };
};


const createNotifications = ({
  doCreateNotifications,
  Notifications,
  sequelize
}) => async (httpRequest) => {
  const { userId } = httpRequest.user;
  const { topic, description } = httpRequest.body;
  const data = await doCreateNotifications({
    Notifications,
    sequelize,
    userId,
    description,
    topic
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched notification successfully!',
      data,
    },
  };
};

const getAllFilteredUpcomingSessionsAndExtraCurricularBySubject = ({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  moment,
  Op,
  doGetAllFilteredUpcomingSessionsAndExtraCurricularBySubject,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
  Student,
  ExtracurricularStudent,
  ExtracurricularActivity,
}) => async (httpRequest) => {
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 5;
  const {
    userRoleId: studentId,
  } = httpRequest.user;
  const { subjectId } = httpRequest.params;
  const data = await doGetAllFilteredUpcomingSessionsAndExtraCurricularBySubject({
    BadRequestError,
    Teacher,
    sequelize,
    StudentsSection,
    Subject,
    SchoolSession,
    moment,
    Op,
    Student,
    page,
    perPage,
    studentId,
    SectionDetail,
    ClassSection,
    subjectId,
    ExtracurricularStudent,
    ExtracurricularActivity,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Students Upcoming session & extracurricular By subject successfully!',

      data,
    },
  };
};

const getMessageRequest = ({
  doGetMessageRequest,
  MessageNotification,
}) => async (httpRequest) => {
  const { userId } = httpRequest.user;
  const data = await doGetMessageRequest({
    userId,
    MessageNotification,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched message notification successfully!',
      data,
    },
  };
};

const getAllHomeworkStatus = ({
  doGetAllHomeworkStatus,
  BadRequestError,
  MarkHomework,
  Homework,
  Op,
  Teacher,
  Subject,
}) => async (httpRequest) => {
  const { userRoleId: studentId } = httpRequest.user;
  const data = await doGetAllHomeworkStatus({
    studentId,
    MarkHomework,
    Homework,
    BadRequestError,
    Op,
    Teacher,
    Subject,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Homework status successfully!',
      data,
    },
  };
};

const getAllHomeworkStatusBySubject = ({
  doGetAllHomeworkStatusBySubject,
  BadRequestError,
  MarkHomework,
  Homework,
  Op,
  Teacher,
  Subject,
}) => async (httpRequest) => {
  const { userRoleId: studentId } = httpRequest.user;
  const { subjectId } = httpRequest.params;
  const data = await doGetAllHomeworkStatusBySubject({
    studentId,
    MarkHomework,
    Homework,
    BadRequestError,
    Op,
    subjectId,
    Teacher,
    Subject,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched Homework status by subject successfully!',
      data,
    },
  };
};
const deleteNotifications = ({
  doDeleteNotifications,
  Notifications,
}) => async (httpRequest) => {
  const { userId } = httpRequest.user;
  const data = await doDeleteNotifications({
    Notifications,
    userId,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'deleted notification successfully!',
      data,
    },
  };
};

const getStudentExamResults = ({
 doGetStudentExamResults,
 Student,
 Subject,
 Term,
 Exam,
 moment,
 Op,
 Teacher,
 ExamStudent,
 User,
 sequelize,
}) => async (httpRequest) => {
  const { userRoleId: studentId } = httpRequest.user;
  const page = httpRequest.query.page || 0;
  const perPage = httpRequest.query.perPage || 10;
  const month_start = httpRequest.query.month_start || "";
  const month_end = httpRequest.query.month_end || "";
  const data = await doGetStudentExamResults({
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
  });

  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Student Exam Results successfully!',
      data,
    },
  };
};

const getStudentExamResultsById = ({
  doGetStudentExamResultsById,
  Student,
  Subject,
  Term,
  Exam,
  Teacher,
  ExamStudent,
  User,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doGetStudentExamResultsById({
    Student,
    Subject,
    Term,
    Exam,
    Teacher,
    ExamStudent,
    User,
    id,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Student Exam Result successfully!',
      data,
    },
  };
};

const getAllTimeTable = ({
  doGetAllTimeTable,
  BadRequestError,
  Period,
  Timetable,
  StudentTimetable,
  Department,
  Section,
  Class,
  ClassSection,
  Op,
  Teacher,
  Subject,
  SectionDetail,
  moment,
  User,
}) => async (httpRequest) => {
  const { userId, userRoleId: studentIdRole } = httpRequest.user;
  const { date, studentId } = httpRequest.query;
  let studentIdRoleValue;
  if (studentId) {
    studentIdRoleValue = studentId;
  }else{
    studentIdRoleValue = studentIdRole;
  }
  const data = await doGetAllTimeTable({
    userId,
    BadRequestError,
    Period,
    Timetable,
    StudentTimetable,
    Department,
    Section,
    Class,
    ClassSection,
    Op,
    Teacher,
    Subject,
    SectionDetail,
    date,
    studentIdRoleValue,
    moment,
    User,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Fetched timetable successfully!',
      data,
    },
  };
};

const getAllTimeTableClassByDate = ({
  doGetAllTimeTableClassByDate,
  BadRequestError,
  Period,
  TimeTable,
  Timetable,
  StudentTimetable,
  Department,
  Section,
  Class,
  ClassSection,
  Op,
  Teacher,
  Subject,
  SectionDetail,
  moment,
  sequelize,
  User,
}) => async (httpRequest) => {
  const { userId, userRoleId: studentId } = httpRequest.user;
  const { date } = httpRequest.params;
  const sort_title = httpRequest.query.sort_title || 'startDate';
  const sort_order = httpRequest.query.sort_order || 'asc';
  const data = await doGetAllTimeTableClassByDate({
    userId,
    studentId,
    BadRequestError,
    Period,
    TimeTable,
    Timetable,
    StudentTimetable,
    Department,
    Section,
    Class,
    ClassSection,
    Op,
    Teacher,
    Subject,
    SectionDetail,
    date,
    moment,
    sequelize,
    User,
    sort_title,
    sort_order,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched timetable successfully!',
      data,
    },
  };
};

const getHomeworkDetail = ({
  doGetHomeworkDetail,
  BadRequestError,
  MarkHomework,
  Homework,
  Op,
  Teacher,
  Subject,
  StudentHomework,
}) => async (httpRequest) => {
  const { userId, userRoleId: studentId } = httpRequest.user;
  const { id: homeworkId } = httpRequest.params;
  const data = await doGetHomeworkDetail({
    userId,
    studentId,
    BadRequestError,
    StudentHomework,
    MarkHomework,
    Homework,
    Op,
    Teacher,
    homeworkId,
    Subject,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'fetched Homework successfully!',
      data,
    },
  };
};

const submitHomeworkPhysically = ({
  doSubmitHomeworkPhysically,
  BadRequestError,
  MarkHomework,
  Homework,
  Op,
  Teacher,
  Subject,
}) => async (httpRequest) => {
  const { userId, userRoleId: studentId } = httpRequest.user;
  const { id: homeworkId } = httpRequest.params;
  const { isSubmitted } = httpRequest.body;
  const data = await doSubmitHomeworkPhysically({
    userId,
    studentId,
    BadRequestError,
    isSubmitted,
    MarkHomework,
    Homework,
    Op,
    Teacher,
    homeworkId,
    Subject,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'homework submitted physically successfully!',
      data,
    },
  };
};

const acceptRecommendation = ({
  BadRequestError,
  doAcceptRecommendation,
  moment,
  Op,
  Recommend,
  RecommendedStudent,
  Student,
}) => async (httpRequest) => {
  const { userId, userRoleId: studentId } = httpRequest.user;
  const { id: recommendId } = httpRequest.params;
  const { status } = httpRequest.body;
  const data = await doAcceptRecommendation({
    BadRequestError,
    moment,
    Op,
    Recommend,
    RecommendedStudent,
    Student,
    recommendId,
    studentId,
    status,
    userId,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Accept or Reject Recommendation successfully!',
      data,
    },
  };
};


const getStudentAllComments = ({
  Teacher,
  Student,
  Feedback,
  User,
  doGetStudentAllComments,
}) => async (httpRequest) => {
  const { type } = httpRequest.query;
  const { userRoleId } = httpRequest.user;
  const data = await doGetStudentAllComments({
    Teacher,
    Student,
    Feedback,
    User,
    userRoleId,
    type,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Student Profile Comments get successfully!',
      data,
    },
  };
};

const updateStudentComments = ({
  Feedback,
  doUpdateStudentComments,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const updateBody = httpRequest.body;
  const data = await doUpdateStudentComments({
    Feedback,
    id,
    updateBody,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Student Profile Comments get successfully!',
      data,
    },
  };
};

const updateRecommendationComments = ({
  RecommendedStudent,
  doUpdateRecommendationComments,
}) => async (httpRequest) => {
  const { recommendId } = httpRequest.params;
  const updateBody = httpRequest.body;
  const data = await doUpdateRecommendationComments({
    RecommendedStudent,
    recommendId,
    updateBody,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Student Recommendation Comments update successfully!',
      data,
    },
  };
};

module.exports = {
  addQualification,
  getQualification,
  updateQualification,
  deleteQualification,
  getHomeworkBySubjectId,
  getStudentHomeworkSubject,
  getUpcomingEvents,
  uploadHomework,
  getAllFeaturedSubjects,
  getAllUpcomingSessions,
  getAllPreviousSessions,
  getAllFeaturedTeachers,
  getAllFilteredTeachersBySubject,
  getAllFilteredSessionsBySubject,
  getCountFromFilter,
  getSessionById,
  bookPrivateSession,
  getCountOfUpcomingSessions,
  getCountOfPrivateSessions,
  getProfile,
  getAllHomeworkCount,
  getAllExtraCurricularCount,
  getUpcomingAndPrivateSessionByDate,
  getCountSchoolClassesByParams,
  getAllRecommendedCount,
  getAllFilteredPreviousSessionsBySubject,
  getSchoolProfile,
  getAllFilteredUpcomingSessionsAndExtraCurricularBySubject,
  getNotifications,
  getNotificationsCheck,
  getStudentAllExpense,
  addTutorReviewByStudent,
  getSchoolRecordPrevious,
  getSchoolRecordPreviousById,
  createNotifications,
  getMessageRequest,
  getAllHomeworkStatus,
  getAllHomeworkStatusBySubject,
  deleteNotifications,
  getAllTimeTable,
  getAllTimeTableClassByDate,
  getHomeworkDetail,
  submitHomeworkPhysically,
  acceptRecommendation,
  getStudentExamResults,
  getStudentExamResultsById,
  getStudentAllComments,
  updateStudentComments,
  updateRecommendationComments,
};
