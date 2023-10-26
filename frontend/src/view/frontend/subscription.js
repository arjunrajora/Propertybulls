import { React, useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import Header from "../../element/frontHeader";
import Footer from "../../element/frontFooter";
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { Link as RouterLink, useNavigate } from "react-router-dom";


import hmacSHA256 from 'crypto-js/hmac-sha256';
const SubscriptionView = config.API_URL + "clint/subscribe/subscription";
const PackagepurchageCount = config.API_URL + "clint/subscribe/packageCount";





export default function Subscription() {
  const navigate = useNavigate();
  const Id = JSON.parse(localStorage.getItem("userId"));
  console.log("user_id", Id)
  const [subscription, setSubscription] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [packagecount, setPackagecount] = useState([]);
  const colors = ["grey", "yellow mt-2", "white m-2 pt-3 ps-3 pe-3"];

  const RoleID = JSON.parse(localStorage.getItem("roleId"));
  console.log("RoleID", RoleID)
  const [id, setId] = useState("");



  useEffect(() => {
    fetch(SubscriptionView)
      .then((response) => response.json())
      .then((value) => {
        setSubscription(value.data);
      });

    // Package Count
    fetch(PackagepurchageCount)
      .then((response) => response.json())
      .then((value) => {
        setPackagecount(value.data);
      });
  }, []);
  console.log("Subscription", subscription);
  // console.log("PackagePurchageCount", packagecount)




  const BuyNow = async (event, packageId, package_validity, package_price, package_discount, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10) => {
    event.preventDefault();
    if (!Id) {
      // Assuming Id is the user_id
      navigate("/users/login", { replace: true });
      return;
    }
    if (package_price === 0) {

      const ammount = 0; // Set amount to 0 since it's a free package
      const body = {
        user_id: Id,
        package_id: packageId,
        validity: package_validity,
        amount: ammount,
        discount: package_discount,
        f1: f1,
        f2: f2,
        f3: f3,
        f4: f4,
        f5: f5,
        f6: f6,
        f7: f7,
        f8: f8,
        f9: f9,
        f10: f10,
        role_id: RoleID
      };
      // Send the data to the server
      const url = config.API_URL + "clint/subscribe/BuyNow";
      try {
        const res = await axios.post(url, body);
        console.log("response", res);

        const RazorpayorderUrl = config.API_URL + 'clint/subscribe/getRazorpay';
        const razorpayBody = {
          razorpay_order_id: res.data.data.id,
        }
        const sxdefvf = axios.post(RazorpayorderUrl, razorpayBody);
        navigate("/subscription/confirmation/" + Id, { replace: true });
      } catch (err) {
        var message = "Failed to process your request.";
        toast.error(message, {
          autoClose: 3000,
          type: "error",
          transition: Zoom,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          className: "custom-toast",
        });
      }
    } else {

      const ammount = Math.round(package_price - (package_price * package_discount / 100))
      const body = {
        user_id: Id,
        package_id: packageId,
        validity: package_validity,
        amount: ammount,
        discount: package_discount,
        f1: f1,
        f2: f2,
        f3: f3,
        f4: f4,
        f5: f5,
        f6: f6,
        f7: f7,
        f8: f8,
        f9: f9,
        f10: f10,
        role_id: RoleID
      };
      console.log("Body Data", body)
      const url = config.API_URL + "clint/subscribe/BuyNow";
      await axios
        .post(url, body)
        .then((res) => {
          console.log("response", res.data.data.id)
          const options = {
            key: 'rzp_test_ZL1wkQfxNIacl5',
            amount: ammount * 100, // Amount in paise (100 paise = 1 INR)
            order_id: res.data.data.id,
            name: 'Property bull',
            image: "https://stage.propertybull.com/images/logo.png",
            description: 'Test Payment',
            handler: function (response) {
              let razorpaysecret = 'WcApSUvwtcDKO6dFiCtLCshu';
              if (response.razorpay_order_id && response.razorpay_signature && response.razorpay_payment_id) {
                var generated_signature = hmacSHA256(res.data.data.id + "|" + response.razorpay_payment_id, razorpaysecret);
                if (generated_signature == response.razorpay_signature) {

                  const razorpay_order = {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                    razorpay_payment_id: response.razorpay_payment_id
                  }
                  const apiUrl = config.API_URL + 'clint/subscribe/CreateOrder';
                  axios.put(apiUrl, razorpay_order)
                    .then((res) => {
                      // fatch data
                      console.log(res, "@@@@@@@@@@@@@@@");

                      const RazorpayorderUrl = config.API_URL + 'clint/subscribe/getRazorpay';
                      const razorpayBody = {
                        razorpay_order_id: response.razorpay_order_id,
                      }
                      const sxdefvf = axios.post(RazorpayorderUrl, razorpayBody);
                      navigate("/subscription/confirmation/" + Id, { replace: true });
                      return;
                    }).catch((err) => console.log(err));
                } else {
                  //cancelled page
                  navigate("/subscription/paymentcancelled", { replace: true });
                  return;
                }
              } else {
                //cancelled page
                navigate("/subscription/paymentcancelled", { replace: true });
                return;

              }

            },
            prefill: {
              name: 'Property bull',
              email: 'john@example.com',
            },
            theme: {
              color: "#88ac2e"
            }
          };

          const rzp1 = new window.Razorpay(options);
          rzp1.on('payment.failed', function (response) {
            //cancelled page
            navigate("/subscription/paymentcancelled", { replace: true });
            return;
          });
          rzp1.open();
          // navigate("/subscription/confirmation/" + Id, { state: { user_id: Id }, replace: true });
          // var message = "Thank you for subscribing to our package! Were excited to provide you with benefits and services.";
          // toast.success(message, {
          //   autoClose: 3000,
          //   type: "success",
          //   transition: Zoom,
          //   hideProgressBar: true,
          //   closeOnClick: true,
          //   pauseOnHover: true,
          //   draggable: true,
          //   progress: undefined,
          //   theme: "dark",
          //   className: "custom-toast",
          // });
        })
        .catch((err) => {
          var message = " You Are Already Purchased This Package!!.";
          toast.success(message, {
            autoClose: 3000,
            type: "error",
            transition: Zoom,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            className: "custom-toast",
          });
        })
    }
  }



  // Owner package purchage count
  const Default = packagecount.filter(item => item.package_id == 21);
  const OwnerSilver = packagecount.filter(item => item.package_id == 13);
  const OwnerGold = packagecount.filter(item => item.package_id == 14);
  const OwnerTitanium = packagecount.filter(item => item.package_id == 12);
  // Agent package purchage count
  const AgentSilver = packagecount.filter(item => item.package_id == 17);
  const AgentGold = packagecount.filter(item => item.package_id == 16);
  const AgentTitanium = packagecount.filter(item => item.package_id == 15);
  // Builder package purchage count
  const BuilderSilver = packagecount.filter(item => item.package_id == 20);
  const BuilderGold = packagecount.filter(item => item.package_id == 19);
  const BuilderTitanium = packagecount.filter(item => item.package_id == 18);














  return (
    <div>
      <Header />

      <ToastContainer />

      <section ID="subscriction">
        <div className="">
          <div className="membership">
            <div className="guarantee pt-1 pb-3">
              <div className="i-guarantee ">
                <img
                  src={config.SITE_URL + "images/best-quality.png"}
                  alt="best-quality.png"
                />
              </div>


              <div className="a-guarantee">
                <h3 className="fw-bolder fs-3">Get guaranteed Responses with premium membership</h3>
              </div>
            </div>


            <ul className="nav nav-tabs mb-5 mt-4" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button className="nav-link active" id="Owner-tab" data-bs-toggle="tab" data-bs-target="#Owner" type="button" role="tab" aria-controls="Owner" aria-selected="true">Owner</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="Agent-tab" data-bs-toggle="tab" data-bs-target="#Agent" type="button" role="tab" aria-controls="Agent" aria-selected="false">Agent</button>
              </li>
              <li className="nav-item" role="presentation">
                <button className="nav-link" id="Builder-tab" data-bs-toggle="tab" data-bs-target="#Builder" type="button" role="tab" aria-controls="Builder" aria-selected="false">Builder</button>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div className="tab-pane fade show active" id="Owner" role="tabpanel" aria-labelledby="Owner-tab">
                <div className="row width pt-4">


                  {subscription
                    .filter((value) => value.role_id == 2)
                    .map((value, index) => {

                      let classNames = "";
                      let purchasedText = "";

                      if (index === 0) {
                        classNames = "green";
                        purchasedText = `${Default.length} purchased`;
                      } else if (index === 1) {
                        classNames = "grey";
                        purchasedText = `${OwnerSilver.length} purchased`;
                      } else if (index === 2) {
                        classNames = "yellow mt-2 ";
                        purchasedText = `${OwnerGold.length} purchased`;

                        <img src="http://localhost:3000/images/best-quality.png" alt="best-quality.png"></img>
                      }
                      else {
                        classNames = "white m-2 pt-3 ps-3 pe-3";
                        purchasedText = `${OwnerTitanium.length} purchased`;

                      }

                      return (
                        <div key={index} className="col-md-6 col-lg-3 silver">
                          <div className="s-box border rounded-2  respon mb-3">
                            <div className="bor ">
                              <div className={`${classNames}`}>
                                <h3 className="fw-bold kumar">{value.package_name}</h3>
                                {/* <p className="mb-0">{Default.length} purchased</p> */}
                                <p className="mb-0">{purchasedText}</p>
                                <div className="rupee d-inline">
                                  <i class="fa-solid fa-indian-rupee-sign pe-1"></i>{value.package_price}
                                </div>
                                <div className="c-rupee d-inline">
                                  <i class="fa-solid fa-indian-rupee-sign ps-2 pe-1"></i>
                                  <p className="d-inline fw-bold fs-5">{Math.round(value.package_price - (value.package_price * value.package_discount / 100))}</p>
                                </div>
                                <div className="off">
                                  <p className="fw-bold">{value.package_discount}% off</p>
                                </div>

                                <div className="Validity fw-bold">
                                  <p>Validity<span className="days"> {value.package_validity} Days</span></p>
                                </div>
                              </div>
                            </div>

                            <div className="e-button text-center mt-5 p-3">
                              <button type="button" class="btn rounded-pill w-75"
                                onClick={(event) => {
                                  if (RoleID) {
                                    if (RoleID == 2) {
                                      BuyNow(event, value.id, value.package_validity, value.package_price, value.package_discount, value.f1, value.f2, value.f3, value.f4, value.f5, value.f6, value.f7, value.f8, value.f9, value.f10
                                      );
                                    } else {
                                      // alert('You Are Not Eligible To Purchase This Package. Please Select Another Package That Your Eligibility!??');
                                      // Display the error alert
                                      var message = "You Are Not Eligible To Purchase This Package. Please Select Another Package That Your Eligibility!";
                                      toast.error(message, {
                                        autoClose: 3000,
                                        type: "error",
                                        transition: Zoom,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                        className: "custom-toast",
                                      });
                                    }
                                  } else {
                                    navigate("/users/login", { replace: true });

                                  }
                                }}
                              > BUY NOW </button>
                            </div>
                            <div className=" iicon pe-1 ps-1">
                              {value.f1 ? (
                                <div className="pt-1 pb-2">
                                  <p className="d-inline ps-1 mb-1 pt-1 pb-1 pb-1">
                                    No of property post {value.f1}
                                  </p>
                                </div>) : null}
                              {value.f2 ? (
                                <div className="dash">
                                  <p className=" ps-2">No of property featured {value.f2}</p>
                                </div>) : null}
                              {value.f3 ? (
                                <div className="dash mb-1">
                                  <p className="d-inline ps-1">
                                    No of contact enquiry {value.f3}
                                  </p>
                                </div>) : null}
                              {/* <div className="dash mb-1">
                                <p className="d-inline ps-1">300 Email Promotions</p>
                              </div> */}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
              {/* Agent */}
              <div className="tab-pane fade" id="Agent" role="tabpanel" aria-labelledby="Agent-tab">
                <div className="row width pt-4">
                  {subscription
                    .filter((value) => value.role_id == 3)
                    .map((value, index) => {
                      const purchasedTexts = index === 0 ? `${AgentSilver.length} purchased` : index === 1 ? `${AgentGold.length} purchased` : index === 2 ? `${AgentTitanium.length} purchased` : "Default Text";
                      const colorClass = colors[index % colors.length];
                      return (
                        <div key={index} className="col-md-4 col-sm-12 silver">
                          <div className="s-box border rounded-2  respon mb-3">
                            <div className="bor ">
                              <div className={colorClass}>
                                <h3 className="fw-bold kumar">{value.package_name}</h3>
                                {/* <p className="mb-0">1222 purchased</p> */}
                                <p className="mb-0">{purchasedTexts}</p>
                                <div className="rupee d-inline">
                                  <i class="fa-solid fa-indian-rupee-sign pe-1"></i>{value.package_price}
                                </div>
                                <div className="c-rupee d-inline">
                                  <i class="fa-solid fa-indian-rupee-sign ps-2 pe-1"></i>
                                  <p className="d-inline fw-bold fs-5">{Math.round(value.package_price - (value.package_price * value.package_discount / 100))}</p>
                                </div>
                                <div className="off">
                                  <p className="fw-bold">{value.package_discount}% off</p>
                                </div>

                                <div className="Validity fw-bold">
                                  <p>Validity<span className="days"> {value.package_validity} Days</span></p>
                                </div>
                              </div>
                            </div>

                            <div className="e-button text-center mt-5 p-3">

                              <button type="button" className="btn rounded-pill w-75"
                                onClick={(event) => {
                                  if (RoleID) {
                                    if (RoleID == 3) {
                                      BuyNow(event, value.id, value.package_validity, value.package_price, value.package_discount, value.f1, value.f2, value.f3, value.f4, value.f5, value.f6, value.f7, value.f8, value.f9, value.f10
                                      );
                                    } else {
                                      // alert('You Are Not Eligible To Purchase This Package. Please Select Another Package That Your Eligibility!??');
                                      var message = "You Are Not Eligible To Purchase This Package. Please Select Another Package That Your Eligibility!";
                                      toast.error(message, {
                                        autoClose: 3000,
                                        type: "error",
                                        transition: Zoom,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                        className: "custom-toast",
                                      });
                                    }
                                  } else {
                                    navigate("/users/login", { replace: true });
                                  }
                                }}
                              > BUY NOW </button>
                            </div>
                            <div className=" iicon pe-1 ps-1">
                              <div className=" iicon pe-1 ps-1">
                                {value.f1 ? (
                                  <div className="pt-1 pb-2">
                                    <p className="d-inline ps-1 mb-1 pt-1 pb-1 pb-1">
                                      No of property post {value.f1}
                                    </p>
                                  </div>) : null}
                                {value.f2 ? (
                                  <div className="dash">
                                    <p className=" ps-2">No of propety featured {value.f2}</p>
                                  </div>) : null}
                                {value.f3 ? (
                                  <div className="dash mb-1">
                                    <p className="d-inline ps-1">
                                      No of contact enquiry {value.f3}
                                    </p>
                                  </div>) : null}

                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
              {/* Builder */}
              <div className="tab-pane fade" id="Builder" role="tabpanel" aria-labelledby="Builder-tab">
                <div className="row width pt-4">
                  {subscription
                    .filter((value) => value.role_id == 4)
                    .map((value, index) => {
                      const colorClass = colors[index % colors.length];
                      const purchasedTextss = index === 0 ? `${BuilderSilver.length} purchased` : index === 1 ? `${BuilderGold.length} purchased` : index === 2 ? `${BuilderTitanium.length} purchased` : "Default Text";

                      return (
                        <div key={index} className="col-md-4 col-sm-12 silver">
                          <div className="s-box border rounded-2  respon mb-3">
                            <div className="bor ">
                              <div className={colorClass}>
                                <h3 className="fw-bold kumar">{value.package_name}</h3>
                                {/* <p className="mb-0">768 purchased</p> */}
                                <p className="mb-0">{purchasedTextss}</p>

                                <div className="rupee d-inline">
                                  <i className="fa-solid fa-indian-rupee-sign pe-1"></i>{value.package_price}
                                </div>
                                <div className="c-rupee d-inline">
                                  <i className="fa-solid fa-indian-rupee-sign ps-2 pe-1"></i>
                                  <p className="d-inline fw-bold fs-5">{Math.round(value.package_price - (value.package_price * value.package_discount / 100))}</p>
                                </div>
                                <div className="off">
                                  <p className="fw-bold">{value.package_discount}% off</p>
                                </div>

                                <div className="Validity fw-bold">
                                  <p>Validity<span className="days"> {value.package_validity} Days</span></p>
                                </div>
                              </div>
                            </div>
                            <div className="e-button text-center mt-5 p-3">
                              <button type="button" className="btn rounded-pill w-75"
                                onClick={(event) => {
                                  if (RoleID) {
                                    if (RoleID == 4) {
                                      BuyNow(event, value.id, value.package_validity, value.package_price, value.package_discount, value.f1, value.f2, value.f3, value.f4, value.f5, value.f6, value.f7, value.f8, value.f9, value.f10
                                      );
                                    } else {
                                      // alert('You Are Not Eligible To Purchase This Package. Please Select Another Package That Your Eligibility!??');
                                      var message = "You Are Not Eligible To Purchase This Package. Please Select Another Package That Your Eligibility!";
                                      toast.error(message, {
                                        autoClose: 3000,
                                        type: "error",
                                        transition: Zoom,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "dark",
                                        className: "custom-toast",
                                      });
                                    }
                                  } else {
                                    navigate("/users/login", { replace: true });

                                  }
                                }}
                              > BUY NOW </button>
                            </div>
                            <div className=" iicon pe-1 ps-1">
                              <div className=" iicon pe-1 ps-1">
                                {value.f1 ? (
                                  <div className="pt-1 pb-2">
                                    <p className="d-inline ps-1 mb-1 pt-1 pb-1 pb-1">
                                      No of property post {value.f1}
                                    </p>
                                  </div>) : null}
                                {value.f2 ? (
                                  <div className="dash">
                                    <p className=" ps-2">No of propety featured {value.f2}</p>
                                  </div>) : null}
                                {value.f3 ? (
                                  <div className="dash mb-1">
                                    <p className="d-inline ps-1">
                                      No of project post {value.f3}
                                    </p>
                                  </div>) : null}
                                {value.f4 ? (
                                  <div className="dash mb-1">
                                    <p className="d-inline ps-1">
                                      No of projct featured  {value.f4}
                                    </p>
                                  </div>) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
            </div>
            <div className="expert">
              <div className="border-call mt-4 mb-4">
                <div className="request  d-flex justify-content-between ">
                  <div className="suits p-2">
                    <h6 className="fw-bold m-0 ;">
                      Can’t deciede which plan suits your requirement best?
                    </h6>
                    <p className="m-0 ;">Consult with our property expert.</p>
                  </div>
                  <div className="red d-flex align-items-center justify-content-end fw-bold">
                    <div className="callback d-flex">
                      <i className="fa-solid fa-phone pt-1 ps-2"></i>
                      <a href="#" className="text-decoration: revert; ps-1">
                        Request Callback
                      </a>
                    </div>
                    <div className="chat d-flex">
                      <i class="fa-brands fa-rocketchat pt-1 ps-2"></i>
                      <a href="#" className="text-decoration: revert; ps-2">
                        Chat with Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="costumer">
              <div className="Sale d-flex justify-content-between">
                <div className="Response mb-5;">
                  <h5 className="fw-bold">Amazing Response for Sale</h5>
                  <p className="mb-1">
                    Buying a GOLD Ad Package was the last try. I was not too
                    hopeful. But, I was so happy with responses.
                  </p>
                  <p className="m-0">
                    I got & was able to close the deal in 15 days. Thanks you
                    guys.
                  </p>
                </div>


                <div className="i-commenter d-flex ms-3 me-3">
                  <div>
                    <img
                      src={config.SITE_URL + "images/commenter--.png"}
                      className="w-75" alt="commenter--.png"
                    />
                  </div>
                  <div className="ps-2 p">
                    <p className="fw-bold mb-0">Amit Arora</p>
                    <p>Gold User</p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        <div className="">
          <div className="col-12   mt-3 mb-2 ps-0 pe-0">
            <div className=" help ">
              <div className="message pt-3 pb-3 ps-2 pe-3 pe-3 ">
                {/* <hr></hr> */}
                <h6 className="stuck text-center pb-2 pt-1 ms-1">Need help or stuck somewhere?</h6>

                <div className="socialicon d-flex justify-content-center ms-1">
                  <div className="website text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-envelope-open" viewBox="0 0 16 16">
                      <path d="M8.47 1.318a1 1 0 0 0-.94 0l-6 3.2A1 1 0 0 0 1 5.4v.817l5.75 3.45L8 8.917l1.25.75L15 6.217V5.4a1 1 0 0 0-.53-.882l-6-3.2ZM15 7.383l-4.778 2.867L15 13.117V7.383Zm-.035 6.88L8 10.082l-6.965 4.18A1 1 0 0 0 2 15h12a1 1 0 0 0 .965-.738ZM1 13.116l4.778-2.867L1 7.383v5.734ZM7.059.435a2 2 0 0 1 1.882 0l6 3.2A2 2 0 0 1 16 5.4V14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V5.4a2 2 0 0 1 1.059-1.765l6-3.2Z" />
                    </svg>
                    <div className="">
                      <p className="Write">Write to us at </p>
                      <a href="#">support@propertybull.com </a>
                    </div>
                  </div>

                  <div className="helpcenter text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-chat-left-dots" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    <div className="">
                      <p className="Write">For any queries go to</p>
                      <a href="#">Help Centre</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      <Footer />
    </div>
  );
}
