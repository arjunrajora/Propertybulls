import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";


export default function StaticPageAdd() {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // const updateTextDescription = async (state) => {
  //   await setEditorState(state)
  //   const data = convertToRaw(editorState.getCurrentContent());
  //   console.log(data);
  // };

  const convertToHtml = (contentState) => {
    const raw = convertToRaw(contentState);
    const html = draftToHtml(raw);
    return html.replace(/<p><\/p>/g, '<p></p>');
  }

  const updateTextDescription = async (state) => {
    await setEditorState(state)
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = rawContentState.blocks.map(block => (!block.text.trim() && '\n') || block.text).join('\n');
    console.log(html);
  };


  //data view

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
      'Content-Type': 'multipart/form-data',

    },
  };
  const AddStaticPage = async (event) => {
    event.preventDefault();
    const body = {
      title: title,
      image: image,
      content: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    const apiUrl = config.API_URL + 'static/add';
    await axios.post(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/static', { replace: true });
        console.log("=>>", res);
      }).catch((err) => console.log(err));
  }

  const onChange = (content) => {
    setContent({ content });
  };

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
                        action="/addcompanyuser"
                        method="post"
                        className="form-horizontal needs-validation"
                        noValidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            <i className=""></i> ADD STATIC PAGE
                          </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="title">Tittle</label>
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
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="content">Content</label>

                                <Editor
                                  editorState={editorState}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  onEditorStateChange={updateTextDescription}
                                  wrapperStyle={{
                                    width: 1400,
                                    border: "1px solid black",
                                  }}
                                  stripPastedStyles={true} // Add this option to remove any nested <p> tags
                                />
                              </div>
                            </div>


                          </div>

                          <div className="form-actions">
                            <button
                              type="submit"
                              onClick={AddStaticPage}

                              className="btn btn-primary pull-right"

                            >

                              Save
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