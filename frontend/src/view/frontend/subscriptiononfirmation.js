import { React, useState, useEffect } from "react";
import axios from "axios";
import config from "../../config/config";
import Header from "../../element/frontHeader";
import Footer from "../../element/frontFooter";
import { useParams } from 'react-router-dom';
import Moment from "react-moment";

const apiUrl = config.API_URL + "clint/subscribe/confirmation";
export default function SubscriptionConfirmation() {
    const { id } = useParams();
    const [confirmation, setConfirmation] = useState([])


    useEffect(() => {
        const Body = {
            user_id: id
        }
        axios.post(apiUrl, Body)
            .then((res) => {
                console.log(res.data.data);
                setConfirmation(res.data.data)
            }).catch((err) => console.log(err));
    }, []);
    console.log("confirmation", confirmation);

    return (
        <div>
            <Header />

            <section id="subscriptionconfirmation">
                <div className="container">
                    <div className="confirmation">
                        <div className="image text-center">
                            <img
                                src={config.SITE_URL + "images/Fees-and-payments-Page.png"}
                                className="pt-4"
                                alt="Fees-and-payments-Page.png"
                            />
                        </div>
                        <div className="name text-center">
                            {/* <p className="congratulations mb-1 mt-1">HI, {confirmation.User.name}, Congratulations !</p> */}
                            <p className="congratulations mb-1 mt-1">
                                HI, {confirmation.User ? confirmation.User.name : '---'}, Congratulations !
                            </p>

                            <h3 className="payment fw-bolder">Payment Successful !</h3>
                            <p className="fs-4">Total : {confirmation ? confirmation.amount : '---'}</p>
                        </div>

                        <div className="contacticon d-flex justify-content-start align-items-center;">
                            <div className="phone d-flex align-items-center">
                                <i className="fa-solid fa-phone"></i>
                                <p className="d-inline mb-0">1860-500-4488</p>
                            </div>
                            <div className="email d-flex align-items-center">
                                <i class="fa-solid fa-envelope mt-2"></i>
                                <p className="d-inline mb-0">contact@propertybull.com</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="ps-4">
                                <ul className="d-flex colleague fw-bold pt-3 m-1">
                                    <li className="w-50">Proposal No :</li>
                                    <li className="d-inline ps-2">11200000553068</li>
                                </ul>
                                {/* <h6 className="colleague fw-bold pt-4">
                   
                </h6> */}

                                <div className="points">
                                    <div>
                                        <ul className="d-flex">
                                            <li className="w-50">Package Name  :</li>
                                            <li className="d-inline">{confirmation.Subscription ? confirmation.Subscription.package_name : '---'}</li>
                                        </ul>
                                        <ul className="d-flex">
                                            <li className="w-50">Package Period  :</li>
                                            <li className="d-inline">{confirmation.Subscription ? confirmation.Subscription.package_validity : '---'} Days</li>
                                        </ul>
                                        <ul className="d-flex">
                                            <li className="w-50">Package Start  :</li>
                                            <li className="d-inline">   <Moment format="DD-MM-YYYY">
                                                {confirmation.createdAt}
                                            </Moment></li>
                                        </ul>
                                        <ul className="d-flex">
                                            <li className="w-50">Package End :</li>
                                            <li className="d-inline">   <Moment format="DD-MM-YYYY">
                                                {confirmation.pkg_expiredate}
                                            </Moment></li>
                                        </ul>
                                    </div>
                                    <div>

                                    </div>
                                </div>

                            </div>
                            {/* <div className="leaf">
                                <img
                                    src={config.SITE_URL + "images/leaf.png"}
                                    className="pe-4"
                                    alt="leaf.png"
                                />
                            </div> */}
                        </div>

                        <hr className=" payline"></hr>
                        {/* <h6 className="colleagues text-center fw-bolder pt-2">
                            How likely are you to recommend Religare to a friends or a
                            colleague?
                        </h6> */}
                        <p className="excellent text-center">1Bad-5Excellent</p>

                        {/* <div className="star text-center">

                            <i class="fa-solid fa-star yellow" style={{ color: "#ccd548;" }}></i>
                            <i class="fa-solid fa-star yellow" style={{ color: "#ccd548;" }}></i>
                            <i class="fa-solid fa-star yellow" style={{ color: "#ccd548;" }}></i>
                            <i class="fa-solid fa-star gray" style={{ color: "#dedfce;" }}></i>
                            <i class="fa-solid fa-star gray" style={{ color: "#dedfce;" }}></i>

                        </div> */}
                        <div className="con text-center">
                            <i class="fa-solid fa-thumbs-up"></i>

                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
