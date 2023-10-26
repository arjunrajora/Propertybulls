import config from "../../../config/config";
import React, { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { useParams } from "react-router-dom";



export default function Newsletter() {
  const { id } = useParams()
  console.log(">>", id);
  const [preview, setPreview] = useState([]);

  var options = {
    headers: {
      'Authorization': localStorage.getItem('accessToken')
    }
  }
  useEffect(() => {
    const apI = config.API_URL + "letter/newsletter/" + id;
    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        // console.log("kamalData ", value.data);
        setPreview(value.data);
      });
  }, [])

  return (
    <div>
      <AdminHeader />

      <div className="app-content content">
        <div className="content-wrapper">
          <div className="content-body card p-2">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header p-0">
                    <h1 >NEWS LETTER PREVIEW </h1>
                    <br />

                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0">

                      </ul>
                    </div>
                  </div>

                  <hr />

                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="thead-default">
                          <tr>

                            <th scope="col">Preview</th>

                          </tr>
                        </thead>

                        <tr>
                          <td>{preview.title}</td>
                        </tr>

                        <tbody>

                        </tbody>
                      </table>
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
