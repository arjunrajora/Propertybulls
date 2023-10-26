import { React, useState, useEffect } from "react";
import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'
import config from "../../config/config"


const Termspages = config.API_URL + "clint/staticpage/viewTerms&Conditions";
export default function TermsCondition() {

  const [terms, setTerms] = useState([]);


  useEffect(() => {
    fetch(Termspages)
      .then((response) => response.json())
      .then((value) => {
        setTerms(value.data);
      });

  }, []);

  return (
    <div>
      <Header />

      {terms.map((value) => {
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
