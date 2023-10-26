import { React, useState, useEffect } from "react";
import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'
import config from "../../config/config"

const Privacypages = config.API_URL + "clint/staticpage/viewPrivacy";
export default function Privacypolicy() {


  const [privacy, setPrivacy] = useState([]);


  useEffect(() => {
    fetch(Privacypages)
      .then((response) => response.json())
      .then((value) => {
        setPrivacy(value.data);
      });

  }, []);
  return (
    <div>
      <Header />
      {privacy.map((value) => {
        return (
          <div key={value.id} className="about_border_deta">
            <h4>{value.title}</h4>
            <p dangerouslySetInnerHTML={{ __html: value.content }}></p>
          </div>
        )
      })}
      <Footer />
    </div>
  )
}

