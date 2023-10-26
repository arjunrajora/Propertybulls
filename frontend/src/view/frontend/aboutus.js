import { React, useState, useEffect } from "react";
import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'
import config from "../../config/config"

const Abouturl = config.API_URL + "clint/staticpage/viewAboutus";


export default function About() {

  const [about, setAbout] = useState([]);

  useEffect(() => {
    fetch(Abouturl)
      .then((response) => response.json())
      .then((value) => {
        setAbout(value.data);
      });

  }, []);

  return (
    <div>
      <Header />
      {about.map((value) => {
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
