import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import config from "../../../../config/config";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';


export default function Description() {
  const navigate = useNavigate();

  const { id } = useParams()
  console.log(">>", id);
  const [detail, setDetail] = useState([]);
  const [description, setDescription] = useState("");
  const [remark, setRemark] = useState("");
  const [editorState, setEditorState] = useState("");
  const [editorremark, setEditorRemark] = useState("");



  var options = {
    headers: {
      'Authorization': localStorage.getItem('accessToken')
    }
  }
  useEffect(() => {
    const apI = config.API_URL + "property/details/" + id;
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        console.log("kamal", value.data);
        setDetail(value.data);
        setDescription(value.data.description);
        setEditorState(EditorState.createWithContent(ContentState.createFromText(value.data.description)))
        setRemark(value.data.remark);
        setEditorRemark(EditorState.createWithContent(ContentState.createFromText(value.data.remark)))

      });
  }, [])

  const updateTextDescription = async (state) => {
    console.log(state);
    await setEditorState(state);
  };
  const updateTextRemark = async (state) => {
    console.log(state);
    await setEditorRemark(state);
  };

  const UpdatePropertyDescription = async (event) => {
    event.preventDefault();

    const body = {
      // remark: remark,
      // description: description
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      remark: draftToHtml(convertToRaw(editorremark.getCurrentContent()))

    }
    const apiUrl = config.API_URL + 'property/description/' + id;

    await axios.put(apiUrl, body)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/property', { replace: true });
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
                  <div className="card-header">
                    <h2 className="form-section">Property Description</h2>
                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                  </div>
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form
                        method="post"
                        className="form-horizontal needs-validation"
                        noValidate
                      >
                        <div className="form-body">
                          <div className="form-group">
                            <div className="row">

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="description">Property Full Description </label>
                                <Editor
                                  editorState={editorState}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  onEditorStateChange={updateTextDescription}
                                  wrapperStyle={{
                                    width: 1000,
                                    border: "1px solid black",
                                  }}
                                /><br />
                                {/* <input
                                  type="text"
                                  id="description"
                                  className="form-control"
                                  name="description"
                                  required
                                  value={description}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setDescription(e.target.value);
                                  }}
                                /> */}
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>
                            <div className="row">

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Description">Remark </label><br />
                                <Editor
                                  editorState={editorremark}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  onEditorStateChange={updateTextRemark}
                                  wrapperStyle={{
                                    width: 1000,
                                    border: "1px solid black",

                                  }}
                                />
                                {/* <input
                                  type="text"
                                  id="Description"
                                  className="form-control"
                                  name="Description"
                                  required
                                  value={remark}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setRemark(e.target.value);
                                  }}
                                />  */}
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                            </div>
                          </div>


                          <div className="form-actions">
                            <button
                              type="submit"
                              // onClick="spinner()"
                              onClick={UpdatePropertyDescription}

                              className="btn btn-primary pull-right"
                            >
                              <i className="la la-check-square-o"

                              ></i> submit
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
