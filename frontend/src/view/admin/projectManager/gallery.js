import React, { useEffect, useState } from "react";
import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import config from "../../../config/config";
import axios from "axios";
export default function Gallery() {
  const [projectimg, setprojectimg] = useState([])
  const viewProjectimg = config.API_URL + "project/projectimg";
  var options = {
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  };
  const { id} = useParams();
  console.log(id,'id');
  useEffect(() => {
    const body = {
      pro_id: id
    }
    axios.post(viewProjectimg,body)
      .then((res) => {
        console.log(res.data.data);
        setprojectimg(res.data.data)
      }).catch((err) => console.log(err));



  }, [])
  const deleteprjectsimg = config.API_URL + "project/deleteprojectimg/"

  const Deleteprojectimg = async (Id) => {
    const res = await axios.delete(deleteprjectsimg+Id,options);
    console.log(res);
    const body = {
      pro_id: id
    }
    console.log(id,"id");
    axios.post(viewProjectimg,body)
      .then((res) => {
        console.log(res,"view");
        console.log(res.data.data);
        setprojectimg(res.data.data)
      }).catch((err) => console.log(err));
}

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
                    <h4 className="card-title">PROJECT GALLERY</h4>
                  </div>
                  <hr />
                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table">
                        <div className="row">
                          { projectimg && projectimg.map((e) => {
                              return (
                                <div className="col-sm-6 col-md-3 col-5 mb-2" key={e.id}>
                                  <img
                                    alt="Image"
                                    src={config.Image_URL + e.img}
                                    height="100px"
                                    width="100px"
                                  />
               <Link><i className="fa fa-window-close" aria-hidden="true"  onClick={((value) => {
                                                                                console.log(e.id);

                                                                Deleteprojectimg(e.id);
                                                            })}></i></Link>          
                                </div>
                              )
                            }) 
                            }
                        </div>
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
