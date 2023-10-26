import { useEffect, useState } from "react";
import config from "../../../config/config";
import * as Yup from "yup";
import { useFormik, Form, FormikProvider } from "formik";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";
import DOMPurify from "dompurify";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";

export default function ArticleAdd() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
  }, [editorState]);
  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const LoginSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    image: Yup.string().required("Image is required"),
    content: Yup.string().required("Content is required"),
  });

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = config.API_URL + "article/add";
    await axios
      .post(apiUrl, formik.values, options)
      .then((res) => {
        const { message, data, statusCode } = res.data;
        if (statusCode === "200") {
        } else {
          const msg = res.data.message;
          localStorage.setItem("staticAdded", msg);
          navigate("/admin/article", { replace: true });
        }
      })
      .catch((err) => {
        navigate("/admin/article/add", { replace: true });
      });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      content: editorState.toString("html"),
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      navigate("/admin/article", { replace: true });
      console.log("submitted!");
    },
  });

  // const AddArticle = async (event) => {
  //   event.preventDefault();
  //   const body = {
  //     title: title,
  //     image: image,
  //     content: editorState.toString("html"),
  //   };
  //   const apiUrl = config.API_URL + "article/add";
  //   await axios
  //     .post(apiUrl, body)
  //     .then((res) => {
  //       const msg = res.data.message;
  //       localStorage.setItem("staticAdded", msg);
  //       navigate("/admin/article", { replace: true });
  //       console.log("=>>", res);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const onChange = (content) => {
  //   setContent({ content });
  // };

  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <div className="content-body">
            {/* Table head options start  */}
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <FormikProvider value={formik}>
                        <Form
                          autoComplete="off"
                          noValidate
                          onSubmit={handleSubmit}
                          encType="multipart/form-data"
                        >
                          <div className="form-body">
                            <h2 className="form-section">ADD ARTICLE</h2>

                            <div className="form-group">
                              <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="title">Title</label>
                                <input
                                  type="text"
                                  id="title"
                                  className="form-control"
                                  name="title"
                                  required
                                  value={formik.values.title}
                                  onChange={formik.handleChange}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="logo">Upload Image</label>
                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="name"
                                  accept='image/*'
                                  required
                                  onChange={(e) =>
                                    formik.setFieldValue('image', e.target.files[0])
                                  }
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label htmlFor="content">Content</label>
                                  <Editor
                                    editorState={editorState}
                                    onEditorStateChange={setEditorState}
                                    wrapperClassName="wrapper-class"
                                    editorClassName="editor-class"
                                    toolbarClassName="toolbar-class"
                                  />
                                  <div
                                    className="preview"
                                    dangerouslySetInnerHTML={createMarkup(
                                      convertedContent
                                    )}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            <div className="form-actions">
                              <button
                                type="submit"
                                //  onClick={"spinner()"}
                                className="btn btn-primary pull-right d-flex align-items-center sub-btn"
                              >
                                <i className="la la-check-square-o"></i> Submit
                              </button>
                            </div>
                          </div>
                        </Form>
                      </FormikProvider>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Table head options end  */}
          </div>
        </div>
      </div>

      <AdminFooter />
    </div>
  );
}
