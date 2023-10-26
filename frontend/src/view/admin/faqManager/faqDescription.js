import AdminHeader from "../../../element/adminHeader";
import AdminFooter from "../../../element/adminFooter";
import config from "../../../config/config";
import { useNavigate, Link ,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { Collapse, Alert } from "@mui/material";

const apiUrl = config.API_URL + "auth/";

export default function Profile() {
    const navigate = useNavigate();
    const [allData, setallData] = useState('')
    const { id } = useParams();
    console.log("🚀 ~ file: description.js:14 ~ Profile ~ id:", id)
    const apI = config.API_URL + "faq/description/"+id;

    var options = {  
      headers: {
        'Authorization': localStorage.getItem('accessToken')
      }
    }
    useEffect(() => {
      fetch(apI,options)
        .then((response) => response.json())
        .then((value) => {
          setallData(value.data);
          console.log(value.data,"sass");
        });
   
    }, [fetch]);
  

    return (
        <div>
            <AdminHeader />

            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-body card p-2">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content collapse show">
                                       <div dangerouslySetInnerHTML={{ __html: allData?allData.description:"" }} />
                                    </div>
                                    <div className="card-header p-0">
                                        <div className="heading-elements">
                                            <ul className="list-inline mb-0 d-flex align-items-center">
                                              
                                            </ul>
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

// export default React.memo(Profile)
