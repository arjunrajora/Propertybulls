import React, { useEffect, useState } from "react";
import config from "../../../../config/config";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw,ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';


import { Link as RouterLink, useNavigate ,useLocation} from 'react-router-dom';
import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";

export default function PropertyFacingEdit() {
  const location = useLocation();
   const { lineData } = location.state;
   const { id } = location.state;
   const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(lineData.description))
  );


  const updateTextDescription = async (state) => {
    await setEditorState(state);
    const data = convertToRaw(editorState.getCurrentContent());
    console.log(data,"a");
  };


  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };

  const navigate = useNavigate();
  const [name, setName] = useState(lineData.name);
  const [description, setDescription] = useState(lineData.description);
  const [state, setState] = useState({
    name: false,
    description: false,
  });
  const AddFAQ = async (event) => {
    event.preventDefault();

    const body = {
      name: name,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    const apiUrl = config.API_URL + 'Facing/'+id;

    await axios.put(apiUrl, body,options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/propertyFacing', { replace: true });
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
                        onSubmit={AddFAQ}
                        className="form-horizontal needs-validation"
                        
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            <i className=""></i> PROPERTY FACING EDIT
                          </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Question">Name</label>
                                <textarea
                                  type="text"
                                  id="Name"
                                  className="form-control"
                                  name="Name"
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

                              {/* <div className="col-sm-6 col-md-4 col-5">
                                <label for="Description">Description</label>
                                <textarea
                                  type="text"
                                  id="Description"
                                  className="form-control"
                                  name="Description"
                                  required
                                  value={description}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setDescription(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div> */}
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
