import { useState } from "react";
import config from "../../../../config/config";
import axios from "axios";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, ContentState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export default function ServiceProviderCategoryEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lineData } = location.state;
  const { id } = location.state;
  const [name, setName] = useState(lineData.name);
  const [image, setImage] = useState("");




  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(ContentState.createFromText(lineData.description))
  );

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
  const UpdateServiceProCat = async (event) => {
    event.preventDefault();
    const body = {
      name: name,
      image: image,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    };

    //data view
    var options = {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        'Content-Type': 'multipart/form-data',
      },
    };


    const apiUrl = config.API_URL + "serviceCategory/" + id;
    await axios
      .put(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem("staticAdded", msg);
        navigate("/admin/serviceProviderCategory", { replace: true });
        console.log("=>>", res);
      })
      .catch((err) => console.log(err));
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
                        //..
                        encType="multipart/form-data"

                        noValidate
                        onSubmit={UpdateServiceProCat}
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            SERVICE PROVIDER CATEGORY EDIT FORM
                          </h2>

                          <div className="form-group">
                            <div className="row">
                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="Name">Name</label>
                                <input
                                  type="text"
                                  id="Name"
                                  className="form-control"
                                  name="firstname"
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

                              <div className="col-sm-6 col-md-4 col-5">
                                <label htmlFor="logo">Image</label>
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
                                <img alt="Image" src={config.Image_URL + lineData.img} height="100px" width="100px" />
                              </div>


                              <div className="row">
                                <div className="col-sm-6 col-md-4 col-5">
                                  <label htmlFor="description">Description</label>
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
