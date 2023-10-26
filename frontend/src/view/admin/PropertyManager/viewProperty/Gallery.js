import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import AdminHeader from "../../../../element/adminHeader";
import AdminFooter from "../../../../element/adminFooter";
import config from "../../../../config/config";
import { Link } from "react-router-dom";





export default function Propertydetail() {
  const { id } = useParams()
  console.log(">>", id);
  const [detail, setDetail] = useState([]);
  const [img, setImg] = useState([]);

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
        setImg(value.data.propertyImages);
      });
  }, [])



  const deleteprjectsimg = config.API_URL + "project/deleteprojectimg/"

  const Deleteprojectimg = async (Id) => {
    const res = await axios.delete(deleteprjectsimg + Id, options);
    console.log(res);
    const body = {
      pro_id: id
    }
    console.log(id, "id");
    const apI = config.API_URL + "property/details/" + id;

    fetch(apI, options)
      .then((response) => response.json())
      .then((value) => {
        console.log("kamal", value.data);
        setDetail(value.data);
        setImg(value.data.propertyImages);
      }).catch((err) => console.log(err));
  }











  return (
    <div>
      <AdminHeader />


      <div className="app-content content">
        <div className="content-wrapper">
          <div className="heading-elements">
          </div>
          <div className="content-body card p-2">
            <div className="row">
              <div className="col-12">

                <div>
                  <div className="card-header p-0">

                    <h4 className="card-title">PROPERTY GALLERY : </h4>

                    <a className="heading-elements-toggle">
                      <i className="la la-ellipsis-v font-medium-3"></i>
                    </a>
                    <div className="heading-elements">
                      <ul className="list-inline mb-0">

                      </ul>
                    </div>
                  </div>

                  <div className="card-content collapse show">
                    <div className="table-responsive">
                      <table className="table table-bordered table-hover">
                        {img && img.map((e) => {
                          return (
                            <div>
                              {/* <i class="fa-sharp fa-solid fa-xmark">X</i> */}

                              <img
                                src={config.Image_URL + e.img} height="100px"
                                width="100px"
                              /> <Link><i className="fa fa-window-close" aria-hidden="true" onClick={((value) => {
                                console.log(e.id);

                                Deleteprojectimg(e.id);
                              })}></i></Link>
                            </div>

                          )
                        })}
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
  )
}
