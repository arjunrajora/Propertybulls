import React, { useEffect, useState } from "react";
import config from "../../../config/config";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { ToastContainer, toast, Zoom } from 'react-toastify';

export default function FaqAdd() {

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  const updateTextDescription = async (state) => {
    await setEditorState(state)
    const data = convertToRaw(editorState.getCurrentContent());
    console.log(data);
  };




  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [description, setDescription] = useState("");
  const [answer, setAnswer] = useState("");
  const [faqCatgory, setfaqCatgory] = useState([]);
  const [faq_category, setfaq_category] = useState('');
  const [page_saluge, setpage_saluge] = useState('');
  const [state, setState] = useState({
    question: false,
    description: false,
    page_saluge: false,
    faq_category: false,
    answer: false

  });
  useEffect(() => {
    const url = config.API_URL + 'faq/viewAllCatgory';

    fetch(url, options)
      .then((response) => response.json())
      .then((value) => {
        setfaqCatgory(value.data);
      });


  }, [fetch]);




  const AddFAQ = async (event) => {
    event.preventDefault();

    const body = {
      question: question,
      description: draftToHtml(convertToRaw(editorState.getCurrentContent())),
      faq_category: faq_category,
      page_saluge: page_saluge,
      answer: answer,
    }
    const apiUrl = config.API_URL + 'faq/add';

    await axios.post(apiUrl, body, options)
      .then((res) => {
        const msg = res.data.message;
        localStorage.setItem(
          "staticAdded",
          msg
        );
        navigate('/admin/faq', { replace: true });
        console.log("=>>", res);
      }).catch((err) => {
        const message = err.response.data.message
        toast.error(message, {
          position: "top-right",
          autoClose: 2000,
          type: "error",
          transition: Zoom,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",

        })
      })

  }



  return (
    <div>
      <AdminHeader />


      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-wrapper-before"></div>
          <div className="content-header row"></div>
          <div className="content-body">
            <ToastContainer />
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-content collapse show">
                    <div className="card-body">
                      <form

                        method="post"
                        onSubmit={AddFAQ}
                        className="form-horizontal needs-validation"
                        novalidate
                      >
                        <div className="form-body">
                          <h2 className="form-section">
                            <i className=""></i> ADD FAQ
                          </h2>

                          <div className="form-group">
                            <div className="row">

                              <div className="col-sm-6 col-md-5 col-5">
                                <label htmlFor="loc_ids">Faq Category</label>
                                <div className="input select">
                                  <select
                                    required
                                    name="role_id"
                                    className="form-control"
                                    value={faq_category}
                                    onChange={(e) => {
                                      console.log(e.target.value);
                                      setfaq_category(e.target.value);
                                    }}
                                  >
                                    <option value="">Faq Category</option>
                                    {faqCatgory.map((value) => {
                                      return <option key={value.id} value={value.id}>{value.name}</option>;
                                    })}
                                  </select>
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-5 col-5">
                                <label for="Question">Question</label>
                                <textarea
                                  type="text"
                                  id="Question"
                                  className="form-control"
                                  name="Question"
                                  required
                                  value={question}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setQuestion(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-5 col-5">
                                <label for="Question">Answer</label>
                                <input
                                  type="text"
                                  id="answer"
                                  className="form-control"
                                  name="answer"
                                  required
                                  value={answer}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setAnswer(e.target.value);
                                  }}
                                />
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">
                                  Please fill out this field.
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-5 col-5">
                                <label for="Question">Page Url</label>
                                <input
                                  type="text"
                                  id="Question"
                                  className="form-control"
                                  name="Question"
                                  required
                                  value={page_saluge}
                                  onChange={(e) => {
                                    console.log(e.target.value);
                                    setpage_saluge(e.target.value);
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
            {/* Table head options end  */}
          </div>
        </div>
      </div>


      <AdminFooter />
    </div>
  );
}
