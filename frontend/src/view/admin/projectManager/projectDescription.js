import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, ContentState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import { Link as RouterLink, useNavigate, useParams,useLocation} from 'react-router-dom';
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
export default function FaqEdit() {
  const { id } = useParams()
  const navigate = useNavigate();

  const [detail, setDetail] = useState([]);
  const [description, setDescription] = useState("");
  var options = {
    headers: {
      'Authorization': localStorage.getItem('accessToken')
    }
  }
  useEffect(() => {
    const apI = config.API_URL + "property/details/"+id;
    fetch(apI,options)
      .then((response) => response.json())
      .then((value) => {
        console.log("🚀 ~ file: projectDescription.js:26 ~ .then ~ value:", value)
        setDescription(value.data.description);
        setEditorState(  EditorState.createWithContent(ContentState.createFromText(value.data.description)))

      });
  }, [])
   const [editorState, setEditorState] = useState();

  var options = { 
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
const updateTextDescription = async (state) => {
  console.log(state);
  await setEditorState(state);
};

  const [state, setState] = useState({
    description: false,
  });
  
  const UpdatePropertyDescription = async (event) => {
    event.preventDefault();
    const body = {
      description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    console.log(body,"body");
    const apiUrl = config.API_URL + 'property/description/' + id;

    await axios.put(apiUrl, body)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/project', { replace: true });
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
                        onSubmit={UpdatePropertyDescription}
                        className="form-horizontal needs-validation"
                        novalidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            <i className=""></i> Description
                          </h2>

                          <div className="form-group">
                            <div className="row">
                      
                            </div>
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label for="content">description</label>
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
                                />
                              </div>
                            </div>

                          </div>

                          <div className="form-actions">

                              <button
                                type="submit"
                                onclick="spinner()"

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
          </div>
        </div>
      </div>


      <AdminFooter />
    </div>
  );
}
