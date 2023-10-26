import { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default function NewsletterEdit() {

  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  const [title, setTitle] = useState(lineData.title);
  const [description, setDescription] = useState(lineData.description);

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(lineData.description))
  );

  const updateTextDescription = async (state) => {
    await setEditorState(state)
    const data = convertToRaw(editorState.getCurrentContent());
    console.log(data);
  };

  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };





  const UpdateNewsletter = async (event) => {
    event.preventDefault();
    const body = {
      title: title,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }
    const apiUrl = config.API_URL + 'letter/' + id;
    await axios.put(apiUrl, body, options)
      .then((res) => {

        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );

        navigate('/admin/newsletter', { replace: true });
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
                        action="/addcompanyuser"
                        method="post"
                        className="form-horizontal needs-validation"
                        noValidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">EDIT NEWS LETTER</h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="companyName">Tittle</label>
                                <input
                                  type="text"
                                  id="companyName"
                                  className="form-control"
                                  name="couponCode"
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
                                <label htmlFor="content">Content</label>
                                <Editor
                                  editorState={editorState}
                                  toolbarClassName="toolbarClassName"
                                  wrapperClassName="wrapperClassName"
                                  editorClassName="editorClassName"
                                  onEditorStateChange={updateTextDescription}
                                  wrapperStyle={{
                                    width: 700,
                                    border: "1px solid black",
                                  }}
                                />
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
                              onClick={UpdateNewsletter}
                              // onclick={"spinner()"}
                              className="btn btn-primary pull-right"
                            >
                              <i className=""></i> Save
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
