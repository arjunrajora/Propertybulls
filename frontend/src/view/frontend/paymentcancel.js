import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import config from "../../config/config";
import Header from "../../element/frontHeader";
import Footer from "../../element/frontFooter";


const apiUrl = config.API_URL + "clint/subscribe/confirmation";
export default function PaymentCancel() {
    return (
        <div>
            <Header />

            <section id="payment">
                <div class="paymentcancel">
                    {/* <img        src={config.SITE_URL + "images/paymentcancel.png"}       
               className="pt-4"        alt="payments-Page.png"       /> */}<img
                        src={config.SITE_URL + "images/paymentcancel-11.png"}
                        className="pt-4" alt="payments-Page.png" />

                    <h3 className="fw-bold">We were unable to process your payment.</h3>
                    <p className="contact">Contact your payment provider for further details, enter another card, or enter your PayPal details.</p>
                    <p className="help">If you continue to experience issues contact the Help Team.</p>
                <Link to='/subscription'><button className="btn rounded-3 pb-2">Try another Payment Method</button></Link>    
                    <hr className="pt-1 line"></hr>
                </div>
            </section>

            <Footer />
        </div>
    );
}
