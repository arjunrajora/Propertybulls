import React from 'react'
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
export default function forgot() {

    return (
        <div>
            <Header />

            <div className="forget_main">
                <div className="forget_box">
                    <h3>
                        FORGOT PASSWORD
                    </h3>
                    <div className="bor_box">

                        <div className="container-fluid">

                            <form >
                                <div className="row  mb-2">
                                    <div className="col-lg-4">
                                        <div className="left_sideform reactchangepassword">
                                            <label>
                                                new Password*<sup className="sub">*</sup></label>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="right_sideform">
                                            <input type="text" className="form-control" placeholder="" aria-label="First name" />

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="left_sideform reactchangepassword">
                                            <label>

                                                Confirm Password*<sup className="sub">*</sup></label>
                                        </div>
                                    </div>
                                    <div className="col-lg-8">
                                        <div className="right_sideform">
                                            <input type="text" className="form-control" placeholder="" aria-label="First name" />

                                            <br />
                                            <a className="model_but" href="#">submit</a>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>

            <Footer />

        </div>
    )
}
