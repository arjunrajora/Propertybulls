import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from '../../../element/frontHeader'
import Footer from '../../../element/frontFooter'
import config from "../../../config/config"
import { Link, useNavigate, useParams } from 'react-router-dom'



const propertyfeatures = config.API_URL + "clint/property/ViewPropertyFeatures";

export default function PropertyImage() {
    const navigate = useNavigate()
    const { id } = useParams();
    // console.log("useridlocal", id);

    const [features, seFeatures] = useState([]);
    const [pro_id, setPro_id] = useState("");
    const [image, setImg] = useState([]);
    const [floor_img, setFloor_img] = useState([]);
    const [featureimage, setFeatureimage] = useState("");
    const [type, setType] = useState("1")
    const [check_list, setCheck_list] = useState([])

    console.log(check_list);
    const handleImageChange = (e, index) => {
        console.log(e.target.value)
        const file = e.target.files[0];
        const newImages = [...image];
        newImages[index] = file;
        console.log("ggggggggggg", file);
        // setImg((newImages) => [...newImages, file]);
        setImg(newImages);
        setFeatureimage(newImages[0]);
        console.log("#######", newImages)
    };


    const handlefloorImgChange = (e) => {
        const files = e.target.files;
        const imagesArray = [];
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                imagesArray.push(files[i]);
            }
        }
        console.log(imagesArray, "ff");
        setFloor_img(imagesArray);
    };






    var options = {
        headers: {
            'Content-Type': 'multipart/form-data',

        },
    };


    const AddProperty = async (event) => {
        event.preventDefault();
       
        const selectedLocationsString = check_list.join(',');
        if (image.length === 0 ) {
            alert('Please select images ');
          }
          if (selectedLocationsString.length === 0 ) {
            alert('Please select  features.');
          }
        const body = new FormData();
        body.append('pro_id', id);
        body.append('type', type);
        body.append('check_list', selectedLocationsString);
        body.append('featureimage', featureimage);
        image.forEach((images, index) => {
            body.append(`img`, images);
        });
        floor_img.forEach((images, index) => {
            body.append(`floor_img`, images);
        });
        console.log("bodydata", body);

        const url = config.API_URL + "clint/property/featurespropertyAdd";
        await axios
            .post(url, body, options)
            .then((res) => {
                const msg = res.data.message;
                // navigate("/dashboard/projectimg", { replace: true });
                localStorage.setItem("staticAdded", msg);
                // clear input
                setPro_id("");
                setType("");
                setCheck_list("");
                console.log("=>>", res);
                navigate("/dashboard/myproperties", { replace: true });

            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetch(propertyfeatures)
            .then((response) => response.json())
            .then((value) => {
                seFeatures(value.data);
            });

    }, []);
    // console.log("features data here ", features)


    return (
        <div><Header />
            <div className="property_pichurse">
                <div className="sell_top_part">
                    <h3>ADD PROJECT PICTURES</h3>
                    <Link to="/dashboard/account"><i className="fa fa-reply"></i>Back To Dashboard </Link>
                </div>

                <div className="pichurse_tabs">
                    <h6>PROPERTY PICTURES</h6>
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link active" id="pills-home-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home"
                                aria-selected="true">Gallery</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a href="#" className="nav-link" id="pills-profile-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile"
                                aria-selected="false">Floor Plan</a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                            <form method="post"
                                className="form-horizontal needs-validation"
                                noValidate >
                                <div className="row">

                                    {[...Array(6)].map((_, index) => (
                                        <div className="col-lg-4" key={index}>
                                            <div className="file_inner">
                                                <div className="upload_img">
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        name="img"
                                                        required
                                                        multiple
                                                        onChange={(e) => handleImageChange(e, index)}
                                                    />
                                                    <img
                                                        src={image[index] ? URL.createObjectURL(image[index]) : config.SITE_URL + "./images/uplloadimg.jpg"}
                                                        className="img-fluid"
                                                        alt="img"
                                                    />
                                                </div>
                                                <div className="upload_text">
                                                    <h5>Upload Photo</h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </form>
                        </div>
                        <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
                            <form>
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="file_inner">
                                            <div className="upload_img">
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="img"
                                                    required
                                                    onChange={(e) => handlefloorImgChange(e, 0)}
                                                />
                                                <img
                                                    src={floor_img[0] ? URL.createObjectURL(floor_img[0]) : config.SITE_URL + "./images/uplloadimg.jpg"}
                                                    className="img-fluid"
                                                    alt="img"
                                                />
                                            </div>
                                            <div className="upload_text">
                                                <h5>Upload Photo</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>



                <div className="Exterior_Features">
                    <p>
                        Heating System
                    </p><br /> <p>
                        Cooling System

                    </p><br />
                    <p>
                        Exterior Features
                    </p>
                    <form>
                        <ul>
                            {features
                                .filter((value) => value.type === 3)
                                .map((value) => {
                                    return (
                                        <li key={value.id}>
                                            <input
                                                className="pichur_chack"
                                                type="checkbox"
                                                id={value.id}
                                                value={value.id}
                                                onChange={(e) => {
                                                    const id = parseInt(e.target.value); // parse the value to integer

                                                    const isChecked = e.target.checked;
                                                    if (isChecked) {
                                                        setCheck_list((prevList) => [...prevList, id]); // add the integer to the array
                                                    } else {
                                                        setCheck_list((prevList) =>
                                                            prevList.filter((item) => item !== id) // remove the integer from the array
                                                        );
                                                    }
                                                }}
                                            />

                                            <label className="lables" htmlFor={`feature-${value.id}`}>
                                                {value.name}
                                            </label>
                                        </li>
                                    );
                                })}
                        </ul>

                        <p>
                            Interior Features
                        </p>
                        <ul>
                            {features
                                .filter((value) => value.type === 4)
                                .map((value) => {
                                    return (
                                        <li key={value.id}>
                                            <input
                                                className="pichur_chack"
                                                type="checkbox"
                                                id={value.id}
                                                value={value.id}
                                                onChange={(e) => {
                                                    const id = parseInt(e.target.value); // parse the value to integer

                                                    const isChecked = e.target.checked;
                                                    if (isChecked) {
                                                        setCheck_list((prevList) => [...prevList, id]); // add the integer to the array
                                                    } else {
                                                        setCheck_list((prevList) =>
                                                            prevList.filter((item) => item !== id) // remove the integer from the array
                                                        );
                                                    }
                                                }}
                                            />

                                            <label className="lables" htmlFor={`feature-${value.id}`}>
                                                {value.name}
                                            </label>
                                        </li>
                                    );
                                })}
                        </ul>
                        <p>
                            Outlook View
                        </p>
                        <input className="submit_btn" type="submit" value="submit "
                            onClick={AddProperty}

                        />
                    </form>
                </div>
            </div>


            <Footer />
        </div>
    )
}
