import { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { Stack, TextField } from "@mui/material";
import { Editor } from "react-draft-wysiwyg";

import { EditorState, convertFromRaw, ContentState, convertToRaw } from 'draft-js';

import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";

export default function ArticleEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  const [title, setTitle] = useState(lineData.title);
  const [image, setImage] = useState("");
  const [content, setContent] = useState(lineData.content);

  const UpdateArticle = async (event) => {
    event.preventDefault();

    //view data
    var options = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        'Content-Type': 'multipart/form-data',
      },
    };





    const body = {
      title: title,
      image: image,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    };
    const apiUrl = config.API_URL + 'article/' + id;
    await axios
      .put(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/article", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => console.log(err));
  };

  const onChange = (content) => {
    setContent({ content });
  };
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(lineData.content))
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
                        action="/add"
                        method="post"
                        className="form-horizontal needs-validation"
                        noValidate
                        encType="multipart/form-data"
                        onSubmit={UpdateArticle}
                      >
                        <div className="form-body">
                          <h2 className="form-section">EDIT ARTICLE</h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="title">Title</label>
                                <input
                                  className="form-control"
                                  type="text"
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
                                <label htmlFor="image">Upload Image</label>
                                <input
                                  type="file"
                                  id="description"
                                  className="form-control"
                                  name="image"
                                  required
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setImage(e.target.files[0])
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div><br />
                                <div>
                                  {
                                    <img alt="Image" src={config.Image_URL + lineData.image} height="100px" width="100px" />
                                  }
                                </div>
                              </div>

                            </div>
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="content">Content</label>
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
                                    width: 1400,
                                    border: "1px solid black",
                                  }}
                                  value={content}
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
