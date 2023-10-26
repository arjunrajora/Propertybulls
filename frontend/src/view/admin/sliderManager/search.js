import { useState } from "react";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const config = require("../../../config/config");


const SliderAdd = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [name, setName] = useState(null);

  // const [email, setemail] = useState("");
  // const [password, setpassword] = useState("");

  const LoginSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    name: Yup.string().required("Image is required"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = config.API_URL + "slider/add";
    await axios
      .post(apiUrl, formik.values)
      .then((res) => {
        const { message, data, statusCode } = res.data;
        if (statusCode === "200") {
        } else {
          navigate("/admin/slider", { replace: true });
        }
      })
      .catch((err) => {
        navigate("/admin/slider/add", { replace: true });
      });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      name: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      navigate("/admin/slider", { replace: true });
      console.log("submitted!");
      // handle submission
    },
  });


  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-content">
            {/* <div className="card-body">
              <a href="/">
                <img
                  style={{ width: "284px" }}
                  className="brand-logo"
                  alt="Admin logo"
                  src="theme-assets/images/logo/logo.png"
                />
              </a>
            </div> */}
            <div className="card-body">
              <div className="form-body">
                {/* <ToastContainer />
                <p className="form_h">
                  To keep connected with us please login with your
                  personal info
                </p> */}
                <div className="form-group">
                  <div className="col-sm-6 col-md-4 col-5">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      name="title"
                      required
                      value={title}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setTitle(e.target.value);
                      }}
                    />
                    <div className="valid-feedback">Valid.</div>
                    <div className="invalid-feedback">
                      Please fill out this field.
                    </div>
                  </div>


                </div>

                {/* <div className="form-group">
                  <label htmlFor="donationinput4" className="sr-only">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    className="form-control"
                    id="donationinput4"
                    name="password"
                    placeholder="Enter Password"
                    values={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <div className="valid-feedback">Valid.</div>
                  <div className="invalid-feedback">
                    Please fill out this field.
                  </div>
                </div> */}
              </div>
              {/* <ul className="d-flex justify-content-between align-items-center list-unstyled w-100">
                <li className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customCheck1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customCheck1"
                  >
                    Remember me
                  </label>
                </li>
                <li>
                  <a href="/">Forgot your password?</a>
                </li>
              </ul> */}

              {/* <div className="d-flex justify-content-between align-items-center list-unstyled w-100">
                <div className="form-actions center">
                  <button type="submit" className="btn btn-primary">
                    Login !
                  </button>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
};
export default SliderAdd;
