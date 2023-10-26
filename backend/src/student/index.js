const router = require('express').Router();
const Sequelize = require('sequelize');
const moment = require('moment');

const {
  Op,
} = Sequelize;
const {
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
  doGetSchoolRecordPrevious,
  doGetSchoolRecordPreviousById,
  doGetStudentExamResults,
  doGetStudentExamResultsById,
  doGetStudentAllComments,
  doUpdateStudentComments,
  doUpdateRecommendationComments,
} = require('./student.service');
const {
  Student,
  StudentQualification,
  QualificationDetail,
  Homework,
  StudentHomework,
  sequelize,
  Event,
  EventInvited,
  Subject,
  SchoolSession,
  SchoolSessionRoutine,
  StudentsSection,
  SectionDetail,
  ClassSection,
  Teacher,
  StudentTeacherPrivateSession,
  User,
  MarkHomework,
  ExtracurricularStudent,
  ExtracurricularActivity,
  Recommend,
  RecommendedStudent,
  School,
  Notifications,
  MessageNotification,
  Period,
  TimeTable,
  Timetable,
  StudentTimetable,
  Department,
  Section,
  Class,
  ClassGroup,
  Location,
  SchoolRecordSession,
  ChatParticipant,
  ChatMessageRead,
  Transaction,
  TeacherReview,
  SchoolSessionStudent,
  FavouriteSession,
  SchoolRecordSessionStudent,
  TeacherSubject,
  SessionReview,
  Exam,
  Term,
  ExamStudent,
  Feedback,
} = require('../db');
const {
  validateAddQualificationData,
  validatePrivateSessionData,
  validateStudentReviewTutor,
} = require('./student.validator');
const makeExpressCallback = require('../utils/express-callback');

const {
  BadRequestError,
} = require('../utils/api-errors');

// controller
const controller = require('./student.controller');

const addQualification = controller.addQualification({
  BadRequestError,
  doAddQualification,
  validateAddQualificationData,
  Student,
  QualificationDetail,
  StudentQualification,
});
const getQualification = controller.getQualification({
  BadRequestError,
  doGetQualification,
  Student,
  QualificationDetail,
  StudentQualification,
});
const updateQualification = controller.updateQualification({
  BadRequestError,
  validateAddQualificationData,
  Student,
  QualificationDetail,
  StudentQualification,
  doUpdateQualification,
});
const deleteQualification = controller.deleteQualification({
  BadRequestError,
  Student,
  QualificationDetail,
  StudentQualification,
  doDeleteQualification,
});

const getHomeworkBySubjectId = controller.getHomeworkBySubjectId({
  BadRequestError,
  Student,
  doGetHomeworkBySubjectId,
  Homework,
  StudentHomework,
  sequelize,
});

const getStudentHomeworkSubject = controller.getStudentHomeworkSubject({
  doGetStudentHomeworkSubject,
  BadRequestError,
  Homework,
  MarkHomework,
  Subject,
  sequelize,
});
const getUpcomingEvents = controller.getUpcomingEvents({
  BadRequestError,
  doGetUpcomingEvents,
  Event,
  Student,
  EventInvited,
  Op,
  moment,
});

const uploadHomework = controller.uploadHomework({
  BadRequestError,
  Student,
  doUploadHomework,
  Homework,
  MarkHomework,
  sequelize,
  StudentHomework,
});

const getAllFeaturedSubjects = controller.getAllFeaturedSubjects({
  BadRequestError,
  Subject,
  doGetAllFeaturedSubjects,
  sequelize,
});

const getAllUpcomingSessions = controller.getAllUpcomingSessions({
  BadRequestError,
  SchoolSession,
  doGetAllUpcomingSessions,
  sequelize,
  SchoolSessionRoutine,
  Op,
  Teacher,
  Subject,
  StudentsSection,
  moment,
  SchoolRecordSession,
  SchoolRecordSessionStudent,
  SchoolSessionStudent,
});

const getAllPreviousSessions = controller.getAllPreviousSessions({
  BadRequestError,
  SchoolSession,
  doGetAllPreviousSessions,
  sequelize,
  SchoolSessionRoutine,
  Op,
  Teacher,
  Subject,
  StudentsSection,
});

const getAllFeaturedTeachers = controller.getAllFeaturedTeachers({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetAllFeaturedTeachers,
  sequelize,
  StudentsSection,
  User,
});

const getAllFilteredTeachersBySubject = controller.getAllFilteredTeachersBySubject({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetAllFilteredTeachersBySubject,
  sequelize,
  StudentsSection,
  Subject,
});

const getAllFilteredSessionsBySubject = controller.getAllFilteredSessionsBySubject({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetAllFilteredSessionsBySubject,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
});

const getCountFromFilter = controller.getCountFromFilter({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetCountFromFilter,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
});

const getSessionById = controller.getSessionById({
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
});

const bookPrivateSession = controller.bookPrivateSession({
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
});

const getCountOfUpcomingSessions = controller.getCountOfUpcomingSessions({
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
});

const getCountOfPrivateSessions = controller.getCountOfPrivateSessions({
  BadRequestError,
  SectionDetail,
  ClassSection,
  Teacher,
  doGetCountOfPrivateSessions,
  sequelize,
  StudentsSection,
  Subject,
  SchoolSession,
  moment,
  StudentTeacherPrivateSession,
});

const getProfile = controller.getProfile({
  BadRequestError,
  doGetProfile,
  User,
  Student,
  QualificationDetail,
  StudentQualification,
  School,
});

const getAllHomeworkCount = controller.getAllHomeworkCount({
  BadRequestError,
  doGetAllHomeworkCount,
  MarkHomework,
});

const getAllExtraCurricularCount = controller.getAllExtraCurricularCount({
  BadRequestError,
  doGetAllExtraCurricularCount,
  ExtracurricularStudent,
  ExtracurricularActivity,
  Student,
  Teacher,
});

const getUpcomingAndPrivateSessionByDate = controller.getUpcomingAndPrivateSessionByDate({
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
});

const getCountSchoolClassesByParams = controller.getCountSchoolClassesByParams({
  doGetCountSchoolClassesByParams,
  SchoolSession,
  SchoolSessionStudent,
  SchoolRecordSession,
  moment,
  Op,
  Teacher,

});

const getAllRecommendedCount = controller.getAllRecommendedCount({
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
});

const getAllFilteredPreviousSessionsBySubject = controller.getAllFilteredPreviousSessionsBySubject({
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
});
const createNotifications = controller.createNotifications({
  doCreateNotifications,
  Notifications,
  sequelize
});
const getNotifications = controller.getNotifications({
  doGetNotifications,
  Notifications,
});
const getNotificationsCheck = controller.getNotificationsCheck({
  doGetNotificationsCheck,
  Notifications,
  ChatParticipant,
  ChatMessageRead,
});
const getStudentAllExpense = controller.getStudentAllExpense({
  doGetStudentAllExpense,
  Transaction,
  sequelize,
  Op,
});
const addTutorReviewByStudent = controller.addTutorReviewByStudent({
  doAddTutorReviewByStudent,
  TeacherReview,
  sequelize,
  Op,
  validateStudentReviewTutor,
  BadRequestError
});
const getSchoolRecordPrevious = controller.getSchoolRecordPrevious({
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
});
const getSchoolRecordPreviousById = controller.getSchoolRecordPreviousById({
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
});


const getStudentExamResults = controller.getStudentExamResults({
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
});

const getStudentExamResultsById = controller.getStudentExamResultsById({
  doGetStudentExamResultsById,
  Student,
  Subject,
  Term,
  Exam,
  Teacher,
  ExamStudent,
  User,
});

const deleteNotifications = controller.deleteNotifications({
  doDeleteNotifications,
  Notifications,
});
const getSchoolProfile = controller.getSchoolProfile({
  BadRequestError,
  doGetSchoolProfile,
  sequelize,
  StudentsSection,
  Subject,
  School,
  SchoolSession,
  Student,
  User,
});

const getAllFilteredUpcomingSessionsAndExtraCurricularBySubject = controller.getAllFilteredUpcomingSessionsAndExtraCurricularBySubject({
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
});

const getMessageRequest = controller.getMessageRequest({
  doGetMessageRequest,
  MessageNotification,
});

const getAllHomeworkStatus = controller.getAllHomeworkStatus({
  doGetAllHomeworkStatus,
  BadRequestError,
  MarkHomework,
  Homework,
  Op,
  Teacher,
  Subject,
});

const getAllHomeworkStatusBySubject = controller.getAllHomeworkStatusBySubject({
  doGetAllHomeworkStatusBySubject,
  BadRequestError,
  MarkHomework,
  Homework,
  Op,
  Teacher,
  Subject,
});

const getAllTimeTable = controller.getAllTimeTable({
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
});

const getAllTimeTableClassByDate = controller.getAllTimeTableClassByDate({
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
});

const getHomeworkDetail = controller.getHomeworkDetail({
  doGetHomeworkDetail,
  BadRequestError,
  MarkHomework,
  Homework,
  Op,
  Teacher,
  Subject,
  StudentHomework,
});

const submitHomeworkPhysically = controller.submitHomeworkPhysically({
  doSubmitHomeworkPhysically,
  BadRequestError,
  MarkHomework,
  Homework,
  Op,
  Teacher,
  Subject,
});

const acceptRecommendation = controller.acceptRecommendation({
  BadRequestError,
  doAcceptRecommendation,
  moment,
  Op,
  Recommend,
  RecommendedStudent,
  Student,
});

const getStudentAllComments = controller.getStudentAllComments({
  BadRequestError,
  Teacher,
  Student,
  Feedback,
  User,
  doGetStudentAllComments,
});

const updateStudentComments = controller.updateStudentComments({
  Feedback,
  doUpdateStudentComments,
});

const updateRecommendationComments = controller.updateRecommendationComments({
  RecommendedStudent,
  doUpdateRecommendationComments,
});

const StudentController = {
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

// routes
const routes = require('./student.routes')({
  StudentController,
  router,
  makeExpressCallback,
});

module.exports = {
  StudentController,
  StudentService: {
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
    doGetSchoolRecordPrevious,
    doGetSchoolRecordPreviousById,
    doGetStudentExamResults,
    doGetStudentExamResultsById,
    doGetStudentAllComments,
    doUpdateStudentComments,
    doUpdateRecommendationComments,
  },
  StudentRoutes: routes,
};
