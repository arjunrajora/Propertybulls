import { React, useState, useEffect } from "react";
import config from "../../config/config"
import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'


const HelpPage = config.API_URL + "clint/staticpage/viewHelp";

export default function Help() {

  const [help, setHelp] = useState([]);


  useEffect(() => {
    fetch(HelpPage)
      .then((response) => response.json())
      .then((value) => {
        setHelp(value.data);
      });

  }, []);

  return (
    <div>
      <Header />
      {help.map((value) => {
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
