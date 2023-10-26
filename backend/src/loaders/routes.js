// Routes
const {
  AuthRoutes,
} = require('../auth');
const {
  FaqRoutes,
} = require('../faq');
const {
  LocationRoutes,
} = require('../location/location');
const {
  StateRoutes,
} = require('../location/state');
const {
  CityRoutes,
} = require('../location/city');
const {
  SliderRoutes,
} = require('../slider');
const {
  SeoRoutes,
} = require('../seo');

const {
  EmailRoutes,
} = require('../emailTemplate');
const {
  BuilderRoutes,
} = require('../builder');
const {
  ArticleRoutes,
} = require('../article');
const {
  LetterRoutes,
} = require('../newsletter');
const {
  CustomerRoutes,
} = require('../customer');
const {
  StaticRoutes,
} = require('../staticPages');
const {
  AgentRoutes,
} = require('../agent');
const {
  LoanRoutes,
} = require('../loanManager');
const {
  ServiceCategoryRoutes,
} = require('../serviceProvider/serviceProviderCategory');
const {
  ServiceProviderRoutes,
} = require('../serviceProvider/serviceProvider');
const {
  RequirementRoutes,
} = require('../Requirement');
const {
  RoleRoutes,
} = require('../role');
const {
  FileUploadRoutes,
} = require('../file-upload/file-upload.module');

const {
  propertyRoutes,
} = require('../property/viewProperty');
const {
  PropertyFacing,
} = require('../property/viewPropertyFacing');
const {
  PropertyFeatures,
} = require('../property/viewPropertyFeatures');
const {
  propertyTypesRoutes,
} = require('../property/viewPropertyType');

const {
  TypeRoutes,
} = require('../featurestype');
// package Manager


const {
  AdvertisementPackage,
} = require('../advertisementpackageManager');


const {
  advertisementsubscription,
} = require('../advertisementsubscription');

const {
  SubscriptionRoutes,
} = require('../subscription');

const {
  VisibilityMatrixRoutes,
} = require('../Visibility Matrix');




const { ContactinquiryRoutes, } = require("../contactInquiry")
const { RequirementalertRoutes, } = require('../requirementAlert')
const { ProjectRoutes } = require("../projectmanager")




//...................clint Side Routes...................//
// const {
//   ClintSliderRoutes,
// } = require('../../src/frontend/slidermanager/index'); 
const {
  ClintHomeRoutes,
} = require('../frontend/home');



const {
  ClintSubscribeRoutes
} = require('../frontend/subscribemanager');
const {
  ClintEnquiryRoutes
} = require('../frontend/enquirymanager');
const {
  ClintPropertydetailRoutes
} = require('../frontend/propertydetailmanager');
const { ClintShortlistRoutes
} = require('../frontend/shortlistmanager');
const { ClintProjectenquiryRoutes
} = require('../frontend/projectenquirymanager');
const { ClintContactdetailRoutes
} = require('../frontend/contactdetailmanager');
const { ClintSimilarprojectRoutes
} = require('../frontend/similarprojectmanager')

const {
  seoManagerRoutes,
} = require('../frontend/seomanager');


const {
  CityclintRoutes,
} = require('../frontend/location/city');
const {
  StateclintRoutes,
} = require('../frontend/location/state');
const {
  ClintArticledetailRoutes,
} = require('../frontend/articledetail');
const {
  ClintStaticpageRoutes,
} = require('../frontend/staticpage');
const {
  ClintContactusRoutes,
} = require('../frontend/contactus');
const {
  ClintAllpropertyRoutes,
} = require('../frontend/property');


const {
  RequirementmanagerRoutes,
} = require('../frontend/Requirementmanager');


const {
  saveSearchRoutes,
} = require('../frontend/SaveSearch');




const Auth = require('../middlewares/auth');
const Authorize = require('../middlewares/authorize');
const {
  userloanRoutes,
} = require('../frontend/userloan');
const {
  locationclintRoutes,
} = require('../frontend/location/location');
const {
  faqclintRoutes,
} = require('../frontend/faqManager');

const { ProjectManagerRoutes } = require("../frontend/projectmanager")
const {
  advertisementsubscriptionRoutes,
} = require('../frontend/advertisementsubscription');
module.exports = function getRoutes(app) {
  // ........................ Auth Routes ........................

  app.use('/api/v1/auth', AuthRoutes);
  app.use('/api/v1/faq', FaqRoutes);
  app.use('/api/v1/builder', Auth, BuilderRoutes);
  app.use('/api/v1/location', LocationRoutes);
  app.use('/api/v1/email', Auth, EmailRoutes);
  app.use('/api/v1/article', Auth, ArticleRoutes);
  app.use('/api/v1/agent', AgentRoutes);
  app.use('/api/v1/serviceCategory', Auth, ServiceCategoryRoutes);
  app.use('/api/v1/serviceProvider', Auth, ServiceProviderRoutes);
  app.use('/api/v1/requirement', Auth, RequirementRoutes);
  app.use('/api/v1/slider', SliderRoutes);
  app.use('/api/v1/state', Auth, StateRoutes);
  app.use('/api/v1/city', Auth, CityRoutes);
  app.use('/api/v1/seo', Auth, SeoRoutes);
  app.use('/api/v1/letter', Auth, LetterRoutes);
  app.use('/api/v1/static', Auth, StaticRoutes);
  app.use('/api/v1/loan', Auth, LoanRoutes);
  app.use('/api/v1/customer', Auth, CustomerRoutes);
  app.use('/api/v1/role', Auth, RoleRoutes);
  app.use('/api/v1/uploads', FileUploadRoutes);

  app.use('/api/v1/property', propertyRoutes);
  app.use('/api/v1/propertyTypes', Auth, propertyTypesRoutes);
  app.use('/api/v1/Facing', Auth, PropertyFacing);
  app.use('/api/v1/Features', Auth, PropertyFeatures);
  app.use('/api/v1/Type', Auth, TypeRoutes);
  app.use('/api/v1/contactinquiry', ContactinquiryRoutes);
  app.use('/api/v1/requirementalert', RequirementalertRoutes);
  app.use('/api/v1/project', ProjectRoutes);
  app.use('/api/v1/advertisementpackage', Auth,AdvertisementPackage);
  app.use('/api/v1/advertisementsubscription',advertisementsubscription);
  app.use('/api/v1/subscription', Auth, SubscriptionRoutes);
  app.use('/api/v1/visibilitymatrix', VisibilityMatrixRoutes);

  // app.use('/api/v1/user', Auth, UserRoutes);
  // app.use('/api/v1/file-upload', Auth, FileUploadRoutes);
  // app.use('/api/v1/superadmin', Auth, Authorize(['SuperAdmin']), SuperAdminRoutes);
  //..................Package Routes.............................../



  //..................Clint Routes.............................../
  
  app.use('/api/v1/clint/loan', userloanRoutes);
  app.use('/api/v1/clint/faq', faqclintRoutes);
  app.use('/api/v1/clint/savesearch', saveSearchRoutes);
  app.use('/api/v1/clint/home', ClintHomeRoutes);
  app.use('/api/v1/clint/subscribe', ClintSubscribeRoutes);
  app.use('/api/v1/clint/enquiry', ClintEnquiryRoutes);
  app.use('/api/v1/clint/seo', seoManagerRoutes);
  app.use('/api/v1/clint/details', ClintPropertydetailRoutes);
  app.use('/api/v1/clint/shortlist', ClintShortlistRoutes);
  app.use('/api/v1/clint/projectenquiry', ClintProjectenquiryRoutes);
  app.use('/api/v1/clint/contactenquiry', ClintContactdetailRoutes);
  app.use('/api/v1/clint/similarproject', ClintSimilarprojectRoutes);
  app.use('/api/v1/clint/city', CityclintRoutes);
  app.use('/api/v1/clint/state', StateclintRoutes);
  app.use('/api/v1/clint/location', locationclintRoutes);
  app.use('/api/v1/clint/articledetail', ClintArticledetailRoutes);
  app.use('/api/v1/clint/staticpage', ClintStaticpageRoutes);
  app.use('/api/v1/clint/contactus', ClintContactusRoutes);
  app.use('/api/v1/clint/property', ClintAllpropertyRoutes);
  app.use('/api/v1/clint/requirement', RequirementmanagerRoutes);
  app.use('/api/v1/clint/project', ProjectManagerRoutes);
  app.use('/api/v1/clint/advertisementsubscription', advertisementsubscriptionRoutes);












};
