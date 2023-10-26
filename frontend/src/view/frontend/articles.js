import React, { useState, useEffect } from 'react'
import axios from "axios";
import Header from '../../element/frontHeader'
import Footer from '../../element/frontFooter'
import config from "../../config/config"
import { useParams } from "react-router-dom";

export default function Article() {
  const { url } = useParams();
  const [articledetail, setArticledetail] = useState([]);

  useEffect(() => {

    const articlesdetail = config.API_URL + "clint/articledetail/viewAll";
    const body = {
      url: url,
    }
    axios.post(articlesdetail, body)
      .then((res) => {
        console.log("=>>", res);
        console.log(res.data, ">>");
        setArticledetail(res.data.data)
      }).catch((err) => console.log(err));
  }, [fetch]);
  return (
    <div>
      <Header />
      <br/>
      <div className="articles">
        <h1>article</h1>
        <div className='articlecontent'>
          <img alt="Image" src={config.Image_URL + articledetail.image} />


          <h3 className="article_title">{articledetail.title}</h3>

          <p dangerouslySetInnerHTML={{ __html: articledetail.content }}></p>

        </div>
      </div>
      <Footer />

    </div>

  )
}
