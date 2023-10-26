import React from "react";
import { useRoutes, Navigate ,Router,Routes,Route} from 'react-router-dom';
//screens
import AdminLoginView from './view/account/adminLogin';
import DashboardView from './view/admin/dashboardManager/index';
import CustomerView from './view/admin/customerManager/index';
import CustomerEdit from './view/admin/customerManager/edit';
import ViewDetails from "./view/admin/customerManager/viewDetails"
import CustomerAllDetails from "./view/admin/customerManager/allDetails";
import Requirments from "./view/admin/customerManager/requirments";
import ChangePassword from "./view/admin/customerManager/changePassword";
import AddedProperty from "./view/admin/customerManager/addedproperty";
import AgentView from './view/admin/agentManager/index'
import AgentAdd from './view/admin/agentManager/add'
import AgentEdit from './view/admin/agentManager/edit'
import Massage from "./view/admin/agentManager/message";
import BuilderView from './view/admin/builderManager/index';
import BuilderAdd from './view/admin/builderManager/add';
import BuilderEdit from './view/admin/builderManager/edit';
import BuilderMessage from './view/admin/builderManager/message';
import BuilderAllDetails from './view/admin/builderManager/projectDetails';
import BuilderDetails from './view/admin/builderManager/builderDetails';
import ServiceProviderCategoryView from './view/admin/serviceProviderManager/serviceProviderCategory/index';
import ServiceProviderCategoryAdd from './view/admin/serviceProviderManager/serviceProviderCategory/add';
import ServiceProviderCategoryEdit from './view/admin/serviceProviderManager/serviceProviderCategory/edit';
import ServiceProviderView from './view/admin/serviceProviderManager/viewServiceProvider/index';
import ServiceProviderAdd from './view/admin/serviceProviderManager/viewServiceProvider/add';
import ServiceProviderEdit from './view/admin/serviceProviderManager/viewServiceProvider/edit';
import PropertyView from "./view/admin/PropertyManager/viewProperty/index";
import PropertyAdd from "./view/admin/PropertyManager/viewProperty/add";
import Propertycsv from "./view/admin/PropertyManager/viewProperty/propertycsv";
import PropertyEdit from "./view/admin/PropertyManager/viewProperty/edit";
import PropertyType from "./view/admin/PropertyManager/viewPropertyTypes/index";
import PropertyTypeEdit from "./view/admin/PropertyManager/viewPropertyTypes/edit";
import PropertyTypeAdd from "./view/admin/PropertyManager/viewPropertyTypes/add";
import Propertyfeature from "./view/admin/PropertyManager/viewPropertyFeatures/index";
import PropertyfeatureAdd from "./view/admin/PropertyManager/viewPropertyFeatures/add";
import PropertyfeatureEdit from "./view/admin/PropertyManager/viewPropertyFeatures/edit";
import PropertyFacing from "./view/admin/PropertyManager/viewPropertyFacing/index";
import PropertyFacingAdd from "./view/admin/PropertyManager/viewPropertyFacing/add";
import PropertyFacingEdit from "./view/admin/PropertyManager/viewPropertyFacing/edit";
import PropertyGallery from "./view/admin/PropertyManager/viewProperty/Gallery";
import PropertyDescription from "./view/admin/PropertyManager/viewProperty/Description";
import Propertyupload_video from "./view/admin/PropertyManager/viewProperty/upload_video";
import ProjectView from './view/admin/projectManager/index';
import ProjectAdd from './view/admin/projectManager/add';
import ProjectEdit from './view/admin/projectManager/edit';
import Gallery from './view/admin/projectManager/gallery';
import ProjectDescription from './view/admin/projectManager/projectDescription';
import ViewPropertyes from "./view/admin/projectManager/viewpropertyes";
import RequirementView from "./view/admin/requirementManager/index";
import RequirementAdd from "./view/admin/requirementManager/add";
import ContactInquiryView from "./view/admin/contactInquiryManager/index";
import RequirementAlertsView from "./view/admin/requirementAlertsManager/index";
import RequirementAlertResponse from "./view/admin/requirementAlertsManager/response"
import StateView from './view/admin/locationManager/stateManager/index';
import StateAdd from './view/admin/locationManager/stateManager/add';
import StateEdit from './view/admin/locationManager/stateManager/edit';
import CityView from './view/admin/locationManager/cityManager/index';
import CityAdd from './view/admin/locationManager/cityManager/add';
import CityEdit from './view/admin/locationManager/cityManager/edit';
import LocationView from './view/admin/locationManager/locationManager/index';
import LocationAdd from './view/admin/locationManager/locationManager/add';
import LocationEdit from './view/admin/locationManager/locationManager/edit';
import SliderView from './view/admin/sliderManager/index'
import SliderAdd from './view/admin/sliderManager/add'
import SliderEdit from './view/admin/sliderManager/edit'
import StaticView from "./view/admin/staticPageManager/index";
import StaticAdd from "./view/admin/staticPageManager/add"
import StaticEdit from "./view/admin/staticPageManager/edit"
import FaqView from "./view/admin/faqManager/index";
import FaqAdd from "./view/admin/faqManager/add";
import FaqDescription from "./view/admin/faqManager/faqDescription";
import FaqEdit from "./view/admin/faqManager/edit";
import ArticleView from './view/admin/articalManager/index';
import ArticleAdd from './view/admin/articalManager/add';
import ArticleEdit from './view/admin/articalManager/edit';
import SeoView from './view/admin/seoManager/index'
import SeoAdd from "./view/admin/seoManager/add";
import SeoEdit from "./view/admin/seoManager/edit";
import NewsletterView from "./view/admin/newsletterManager/index"
import NewsletterAdd from "./view/admin/newsletterManager/add"
import NewsletterEdit from "./view/admin/newsletterManager/edit";
import NewsletterPreview from "./view/admin/newsletterManager/preview"
import EmailTemplateView from './view/admin/emailManager/index';
import EmailTemplateAdd from './view/admin/emailManager/add';
import EmailTemplateEdit from './view/admin/emailManager/edit';
import LoanView from "./view/admin/loanManager/index";
import Profile from "./view/account/MyProfile/MyProfile"
import Forget from "./view/account/MyProfile/ChangePasswords"
import Edit from "./view/account/MyProfile/EditProfile"
import ErrorPage from "./view/error/error404"
import Descriptions from "./view/admin/emailManager/description";
import Prodetail from "./view/admin/agentManager/pro_detail";
import AgentDetail from "./view/admin/agentManager/agentDetail";
// Subscription Manager
import SubscriptionView from './view/admin/SubscriptionManager/index';
import SubscriptionAdd from './view/admin/SubscriptionManager/add';
import SubscriptionEdit from "./view/admin/SubscriptionManager/edit";

// Package Manager
import PackageView from './view/admin/PackageManager/index';
import PackageAdd from './view/admin/PackageManager/add';
import PackageEdit from "./view/admin/PackageManager/edit";
import AdvertisementPackage  from "./view/admin/Advertisement Package Manager/index";
import AdvertisementAdd from "./view/admin/Advertisement Package Manager/add";
import AdvertisementEdit  from "./view/admin/Advertisement Package Manager/edit";
import Advertisementsubscription from './view/admin/Advertisement Subscription Manager/index'
import AdvertisementsubscriptionAdd from './view/admin/Advertisement Subscription Manager/add'
import Visibilitymatrix  from './view/admin/visibilitymatrix/visibilitymatrix.js'


// frontend
import HomeView from './view/frontend/home/index';
import Login from "./view/frontend/users/login";
import HomeLoan from "./view/frontend/homeloan";
import About from "./view/frontend/aboutus";
import Privacypolicy from "./view/frontend/privacypolicy";
import TermsCondition from "./view/frontend/termscondition";
import Help from "./view/frontend/help";
import RecentProjects from "./view/frontend/recentprojects";
import Buy from "./view/frontend/buy";
import AllResidential from "./view/frontend/allresidential";
import AllCommercial from "./view/frontend/allcommercial";
import Residentialplot from "./view/frontend/residentialplot";
import Rent from "./view/frontend/rent";
import SandEmail from "./view/frontend/users/sandEmail";
import Forgot from "./view/frontend/users/forgotmyaccount";
import Shortlist from "./view/frontend/shortlist";
import CommercialLand from "./view/frontend/commercialland";
import ResidentialHouse from "./view/frontend/residentialhouse";
import CommercialShop from "./view/frontend/commercialshop";
import Sell from "./view/frontend/sell";
import MyAccountDashboard from "./view/frontend/myaccount/dashboard";
import Myproperties from "./view/frontend/myaccount/myproperties";
import MyRequirement from "./view/frontend/myaccount/myrequirements";
import MySearches from "./view/frontend/myaccount/mysearches";
import Article from "./view/frontend/articles";
import Propertydetail from "./view/frontend/propertydetail";
import AddProject from "./view/frontend/project/projectadd";
import PropertyImage from "./view/frontend/property/propertyImage";
import ProjectImage from "./view/frontend/project/ProjectImage";
import Editproject from "./view/frontend/project/editproject";
import Editproperty from "./view/frontend/property/editproperty";
import BuyAllproperties from "./view/frontend/buyallproperties";
import BuyProjects from "./view/frontend/buyprojects";
import PostedByAgents from "./view/frontend/buypostedbyagents";
import AddRequriment from "./view/frontend/myaccount/addRequriment";
import MyAccount from "./view/frontend/myaccount/myaccount";
import ProjectDetails from "./view/frontend/projectdetail";
import MysubscriptionDetail from "./view/frontend/myaccount/Mysubscription";
// ..... rent page
import FilterSerch from "./view/frontend/filtersearch";
import RentAllproperties from "./view/frontend/rentallproperties";
import RentAllprojects from "./view/frontend/rentallprojects";
// frontend
// import Privacypolicy from "./view/frontend/privacypolicy";
// .....
import FaqViewAll from "./view/frontend/faq/viewAllfaq"
import FaqCategory from "./view/frontend/faq/faqCategory"
import FaqViewDetails from "./view/frontend/faq/faqdetail"
import Subscription from "./view/frontend/subscription"
import SubscriptionConfirmation from "./view/frontend/subscriptiononfirmation"
import PaymentCancel from "./view/frontend/paymentcancel";
export default function Routers() {
  const roleId = localStorage.getItem("roleId");

  return useRoutes([
    {
      path: "/",
      children: [
        { path: "/", element: <HomeView /> },
        { path: "users/login", element: <Login /> },
        { path: "homeloan-for-Property", element: <HomeLoan /> },
        { path: "dashboard/filter/*", element: <FilterSerch /> },
        { path: "about", element: <About /> },
        { path: "privacy-policy", element: <Privacypolicy /> },
        { path: "term-conditions", element: <TermsCondition /> },
        { path: "static/help", element: <Help /> },
        { path: "real-estate-projects-in-Jaipur", element: <RecentProjects /> },
        { path: "property/search/buy-property-in-Jaipur", element: <Buy /> },
        { path: "*", element: <ErrorPage /> },
        { path: "property/search/real-estate-buy-rent-residential", element: <AllResidential /> },
        { path: "property/search/real-estate-buy-rent-commercial", element: <AllCommercial /> },
        { path: "/property/search/residential-plot-land-for-sale-in-Jaipur", element: <Residentialplot /> },
        { path: "property/search/rent-property-in-Jaipur", element: <Rent /> },
        { path: "users/forget", element: <SandEmail /> },
        { path: "forgot", element: <Forgot /> },
        { path: "shortlist", element: <Shortlist /> },
        { path: "subscription", element: <Subscription /> },
        { path: "faq", element: <FaqViewAll /> },
        { path: "faq/category/:category", element: <FaqCategory /> },
        { path: "faq/:url", element: <FaqViewDetails /> },
        { path: "subscription", element: <Subscription /> },
        { path: "subscription/confirmation/:id", element: <SubscriptionConfirmation /> },
        { path: "subscription/paymentcancelled", element: <PaymentCancel /> },
        { path: "property/search/commercial-land-for-sale-in-Jaipur", element: <CommercialLand /> },
        { path: "property/search/residential-house-for-sale-in-Jaipur", element: <ResidentialHouse /> },
        { path: "property/search/commercial-shop-for-sale-in-Jaipur", element: <CommercialShop /> },
        { path: "dashboard/addproperty", element: <Sell /> },
        { path: "dashboard/account", element: <MyAccount /> },
        { path: "dashboard/myproperties", element: <Myproperties /> },
        { path: "dashboard/mysubscription", element: <MysubscriptionDetail /> },
        { path: "dashboard/myrequirement", element: <MyRequirement /> },
        { path: "dashboard/AddRequriment", element: <AddRequriment /> },
        { path: "dashboard/search", element: <MySearches /> },
        { path: "dashboard/", element: <MyAccountDashboard /> },
        { path: "article/index/:url", element: <Article /> },
        { path: "propertyshow/:url", element: <Propertydetail /> },
        { path: "projectshow/:url", element: <ProjectDetails /> },
        { path: "dashboard/addporject", element: <AddProject /> },
        { path: "dashboard/propertyimg/:id", element: <PropertyImage /> },
        { path: "dashboard/projectimg/:id", element: <ProjectImage /> },
        { path: "dashboard/edit_project/:id", element: <Editproject /> },
        { path: "dashboard/edit_property/:id", element: <Editproperty /> },
        { path: "property/search/1/all-property-buy", element: <BuyAllproperties /> },
        { path: "property/search/1/project-buy/", element: <BuyProjects /> },
        { path: "property/search/1/agent/", element: <PostedByAgents /> },
        // .......Rent page
        { path: "property/search/1/all-property-rent", element: <RentAllproperties /> },
        { path: "property/search/1/project-rent/", element: <RentAllprojects /> },
      ],
    },
    {
      path: '/admin',
    children: [
        { path: "/admin", element: <AdminLoginView /> },
        { path: "dashboard", element: <DashboardView /> },
        { path: "users/customer", element: <CustomerView /> },
        { path: "customer/edit", element: <CustomerEdit /> },
        { path: "users/customerdetail/:id", element: <ViewDetails /> },
        { path: "users/detail/:id", element: <AddedProperty /> },
        { path: "customer/alldetails", element: < CustomerAllDetails /> },
        { path: "users/detailreq/:id", element: <Requirments /> },
        { path: "customer/changepassword/:id", element: <ChangePassword /> },
        { path: "role", element: <AgentView /> },
        { path: "role/add", element: <AgentAdd /> },
        { path: "role/edit", element: <AgentEdit /> },
        { path: "role/message", element: <Massage /> },
        { path: "users/Pro_detail/:id", element: <Prodetail /> },
        { path: "users/customerdetail/detail/:id", element: <AgentDetail /> },
        { path: "builder", element: <BuilderView /> },
        { path: "builder/add", element: <BuilderAdd /> },
        { path: "builder/edit", element: <BuilderEdit /> },
        { path: "builder/message", element: <BuilderMessage /> },
        { path: "users/details/:id", element: <BuilderAllDetails /> },
        { path: "users/customerdetail/:id", element: <BuilderDetails /> },
        { path: "serviceProviderCategory", element: <ServiceProviderCategoryView /> },
        { path: "serviceProviderCategory/add", element: <ServiceProviderCategoryAdd /> },
        { path: "serviceProviderCategory/edit", element: <ServiceProviderCategoryEdit /> },
        { path: "serviceProvider", element: <ServiceProviderView /> },
        { path: "serviceProvider/add", element: <ServiceProviderAdd /> },
        { path: "serviceProvider/edit", element: <ServiceProviderEdit /> },
        { path: "property", element: <PropertyView /> },
        { path: "property/add", element: <PropertyAdd /> },
        { path: "property/csv", element: <Propertycsv /> },
        { path: "property/edit/:id", element: <PropertyEdit /> },
        { path: "propertyType", element: <PropertyType /> },
        { path: "propertyType/edit", element: <PropertyTypeEdit /> },
        { path: "propertyType/add", element: <PropertyTypeAdd /> },
        { path: "propertyFeature", element: <Propertyfeature /> },
        { path: "propertyFeature/add", element: <PropertyfeatureAdd /> },
        { path: "propertyFeature/edit", element: <PropertyfeatureEdit /> },
        { path: "propertyFacing", element: <PropertyFacing /> },
        { path: "propertyFacing/add", element: <PropertyFacingAdd /> },
        { path: "property/gallery/:id", element: <PropertyGallery /> },
        { path: "property/Description/:id", element: <PropertyDescription /> },
        { path: "propertyFacing/edit", element: <PropertyFacingEdit /> },
        { path: "property/gallery", element: <PropertyGallery /> },
        { path: "property/Description", element: <PropertyDescription /> },
        { path: "property/upload_video", element: <Propertyupload_video /> },
        { path: "project", element: <ProjectView /> },
        { path: "project/add", element: <ProjectAdd /> },
        { path: "project/edit/:id", element: <ProjectEdit /> },
        { path: "project/gallery/:id", element: <Gallery /> },
        { path: "project/description/:id", element: <ProjectDescription /> },
        { path: "project/propertyes/:id", element: <ViewPropertyes /> },
        { path: "requirement", element: <RequirementView /> },
        { path: "requirement/add", element: <RequirementAdd /> },
        { path: "contactInquiry", element: <ContactInquiryView /> },
        { path: "requirementAlert", element: <RequirementAlertsView /> },
        { path: "requirementAlertResponse", element: <RequirementAlertResponse /> },
        { path: "state", element: <StateView /> },
        { path: "state/add", element: <StateAdd /> },
        { path: "state/edit", element: <StateEdit /> },
        { path: "city", element: <CityView /> },
        { path: "city/add", element: <CityAdd /> },
        { path: "city/edit", element: <CityEdit /> },
        { path: "location", element: <LocationView /> },
        { path: "location/add", element: <LocationAdd /> },
        { path: "location/edit", element: <LocationEdit /> },
        { path: "slider", element: <SliderView /> },
        { path: "slider/add", element: <SliderAdd /> },
        { path: "slider/edit", element: <SliderEdit /> },
        { path: "static", element: <StaticView /> },
        { path: "static/add", element: <StaticAdd /> },
        { path: "static/edit", element: <StaticEdit /> },
        { path: "faq", element: <FaqView /> },
        { path: "faq/add", element: <FaqAdd /> },
        { path: "faq/edit", element: <FaqEdit /> },
        { path: "article", element: <ArticleView /> },
        { path: "article/add", element: <ArticleAdd /> },
        { path: "article/edit", element: <ArticleEdit /> },
        { path: "Seo", element: <SeoView /> },
        { path: "Seo/add", element: <SeoAdd /> },
        { path: "Seo/Edit", element: <SeoEdit /> },
        { path: "newsletter", element: < NewsletterView /> },
        { path: "newsletter/add", element: <NewsletterAdd /> },
        { path: "newsletter/edit", element: <NewsletterEdit /> },
        { path: "newsletter/preview", element: <NewsletterPreview /> },
        { path: "emailTemplate", element: <EmailTemplateView /> },
        { path: "emailTemplate/add", element: <EmailTemplateAdd /> },
        { path: "emailTemplate/edit", element: <EmailTemplateEdit /> },
        { path: "emailTemplate/descriptions/:id", element: <Descriptions /> },
        { path: "faq/description/:id", element: <FaqDescription /> },
        { path: "consultant/add", element: <ServiceProviderCategoryAdd /> },
        { path: "loan", element: <LoanView /> },
        { path: "users/current", element: <Profile /> },
        { path: "users/changepasswords", element: <Forget /> },
        { path: "users/Edit", element: <Edit /> },
        { path: "newsletter/preview/:id", element: <NewsletterPreview /> },
        { path: "subscription", element: <SubscriptionView /> },
        { path: "subscription/add", element: <SubscriptionAdd /> },
        { path: "subscription/edit/:id", element: <SubscriptionEdit /> },
        { path: "package", element: <PackageView /> }, 
           { path: "package/add", element: <PackageAdd /> },   
            { path: "package/edit/:id", element: <PackageEdit /> },
            { path: "advertisement/edit", element: <AdvertisementEdit /> },
            { path: "advertisement/add", element: <AdvertisementAdd /> },
            { path: "advertisement/index", element: <AdvertisementPackage /> },
            { path: "advertisementsubscription", element: <Advertisementsubscription /> },
            { path: "Advertisementsubscription/add", element: <AdvertisementsubscriptionAdd /> },
            { path: "visibilitymatrix", element: <Visibilitymatrix /> },

      ],
    },

  ]);
}
