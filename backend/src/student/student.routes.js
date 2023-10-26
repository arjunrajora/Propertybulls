module.exports = ({ StudentController, router, makeExpressCallback }) => {
  router.post('/qualification', makeExpressCallback(StudentController.addQualification));
  router.get('/qualification', makeExpressCallback(StudentController.getQualification));
  router.put('/qualification/:qualificationId', makeExpressCallback(StudentController.updateQualification));
  router.delete('/qualification/:qualificationId', makeExpressCallback(StudentController.deleteQualification));
  router.get('/homework/:subjectId', makeExpressCallback(StudentController.getHomeworkBySubjectId));
  router.get('/homework-subjects', makeExpressCallback(StudentController.getStudentHomeworkSubject));
  router.get('/upcoming/event', makeExpressCallback(StudentController.getUpcomingEvents));
  router.put('/homework/:homeworkId', makeExpressCallback(StudentController.uploadHomework));
  router.get('/feature/subject', makeExpressCallback(StudentController.getAllFeaturedSubjects));
  router.get('/upcoming/session', makeExpressCallback(StudentController.getAllUpcomingSessions));
  router.get('/previous/session', makeExpressCallback(StudentController.getAllPreviousSessions));
  router.get('/feature/teacher', makeExpressCallback(StudentController.getAllFeaturedTeachers));
  router.get('/filter/teacher/:subjectId', makeExpressCallback(StudentController.getAllFilteredTeachersBySubject));
  router.get('/filter/session/:subjectId', makeExpressCallback(StudentController.getAllFilteredSessionsBySubject));
  router.get('/filter/count/:subjectId', makeExpressCallback(StudentController.getCountFromFilter));
  router.get('/session/:id', makeExpressCallback(StudentController.getSessionById));
  router.post('/session/private/:teacherId', makeExpressCallback(StudentController.bookPrivateSession));
  router.get('/count/session/upcoming', makeExpressCallback(StudentController.getCountOfUpcomingSessions));
  router.get('/count/session/private', makeExpressCallback(StudentController.getCountOfPrivateSessions));
  router.get('/profile', makeExpressCallback(StudentController.getProfile));
  router.get('/count/homework', makeExpressCallback(StudentController.getAllHomeworkCount));
  router.get('/count/extraCurricular', makeExpressCallback(StudentController.getAllExtraCurricularCount));

  router.get('/count/school/classes', makeExpressCallback(StudentController.getCountSchoolClassesByParams));

  router.get('/count/session/upcoming&private/:date', makeExpressCallback(StudentController.getUpcomingAndPrivateSessionByDate));
  router.get('/count/recommend', makeExpressCallback(StudentController.getAllRecommendedCount));
  router.get('/filter/session/previous/:subjectId', makeExpressCallback(StudentController.getAllFilteredPreviousSessionsBySubject));
  router.get('/school/profile', makeExpressCallback(StudentController.getSchoolProfile));
  router.get('/filter/upcomingSession/extraCurricular/:subjectId', makeExpressCallback(StudentController.getAllFilteredUpcomingSessionsAndExtraCurricularBySubject));
  router.get('/notification', makeExpressCallback(StudentController.getNotifications));
  router.post('/notification', makeExpressCallback(StudentController.createNotifications));
  router.delete('/notification', makeExpressCallback(StudentController.deleteNotifications));
  router.get('/notification/message', makeExpressCallback(StudentController.getMessageRequest));
  router.get('/status/homework', makeExpressCallback(StudentController.getAllHomeworkStatus));
  router.get('/homework/detail/:id', makeExpressCallback(StudentController.getHomeworkDetail));
  router.get('/status/homework/:subjectId', makeExpressCallback(StudentController.getAllHomeworkStatusBySubject));
  router.get('/timetable', makeExpressCallback(StudentController.getAllTimeTable));
  router.get('/timetable/:date', makeExpressCallback(StudentController.getAllTimeTableClassByDate));
  router.put('/homework/physical/:id', makeExpressCallback(StudentController.submitHomeworkPhysically));
  router.put('/recommend/:id', makeExpressCallback(StudentController.acceptRecommendation));

  router.get('/notification/check', makeExpressCallback(StudentController.getNotificationsCheck));
  router.get('/statistic', makeExpressCallback(StudentController.getStudentAllExpense));
  //
  router.post('/review/tutor', makeExpressCallback(StudentController.addTutorReviewByStudent));
  //
  router.get('/record/previous', makeExpressCallback(StudentController.getSchoolRecordPrevious));
  router.get('/record/previous/:id', makeExpressCallback(StudentController.getSchoolRecordPreviousById));

  router.get('/exams', makeExpressCallback(StudentController.getStudentExamResults));
  router.get('/exams/:id', makeExpressCallback(StudentController.getStudentExamResultsById));
  router.get('/comments', makeExpressCallback(StudentController.getStudentAllComments));
  router.put('/comments/:id', makeExpressCallback(StudentController.updateStudentComments));
  router.put('/comments/recommend/:recommendId', makeExpressCallback(StudentController.updateRecommendationComments));

  return router;
};
