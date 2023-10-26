import React, { useEffect, useState } from "react";
import config from "../../../../config/config";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";

export default function PropertyTypeAdd() {
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const updateTextDescription = async (state) => {
    await setEditorState(state)
    const data = convertToRaw(editorState.getCurrentContent());
    console.log(data);
  };

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState({
    name: false,
    description: false,


  });
  const Add= async (event) => {
    event.preventDefault();

    const body = {
      name: name,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    const apiUrl = config.API_URL + 'propertyTypes/add';

    await axios.post(apiUrl, body,options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/propertyType', { replace: true });
        console.log("=>>", res);
      }).catch((err) => console.log(err));
  }
 


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
                        onSubmit={Add}
                        className="form-horizontal needs-validation"
                        
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            <i className=""></i> PROPERTY TYPE ADD
                          </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Name">Name</label>
                                <textarea
                                  type="text"
                                  id="name"
                                  className="form-control"
                                  name="name"
                                  required
                                  value={name}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setName(e.target.value);
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
                                <label htmlFor="content">Description</label>
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
                                />
                              </div>
                            </div>

                          </div>
                            <div className="form-actions">

                              <button
                                type="submit"

                                className="btn btn-primary pull-right"
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
