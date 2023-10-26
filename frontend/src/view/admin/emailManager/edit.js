import { useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
// import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import { EditorState, convertFromRaw, ContentState, convertToRaw } from 'draft-js';

import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";

export default function EmailTemplateAdd() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  const [title, setTitle] = useState(lineData.title);
  const [subject, setSubject] = useState(lineData.subject);
  const [description, setDescription] = useState(lineData.description);

  const UpdateEmail = async (event) => {
    event.preventDefault();
    const body = {
      title: title,
      subject: subject,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    };
    var options = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    };
    const apiUrl = config.API_URL + 'email/' + id;
    await axios
      .put(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/emailTemplate", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => console.log(err));
  };

  const onChange = (description) => {
    setDescription({ description });
  };

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(lineData.description))
  );
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
                      <form
                        method="post"
                        className="form-horizontal needs-validation"
                        noValidate
                        onSubmit={UpdateEmail}
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            EDIT TEMPLATE
                          </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="title">Title</label>
                                <input
                                  type="text"
                                  id="title"
                                  className="form-control"
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

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="subject">Subject</label>
                                <input
                                  type="text"
                                  id="subject"
                                  className="form-control"
                                  required
                                  value={subject}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setSubject(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="content">Description/Format</label>
                                <Editor
                                  editorState={editorState}
                                  onEditorStateChange={setEditorState}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  input
                                  type="file"
                                  id="myFile"
                                  name="filename"
                                  wrapperStyle={{
                                    width: 1050,
                                    border: "1px solid black",
                                  }}
                                  value={description}
                                  onChange={onChange}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="form-actions">
                            <button
                              type="submit"
                              // onClick={"spinner()"}
                              className="btn btn-primary pull-right d-flex align-items-center sub-btn"
                            >
                              <i className="la la-check-square-o"></i> Submit
                            </button>
                          </div>
                        </div>
                      </form>
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
