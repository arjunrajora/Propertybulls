import { React, useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import { Link as RouterLink, Link ,useParams} from "react-router-dom";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import config from "../../../config/config";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { Padding } from "@mui/icons-material";
const viewAllFaq = config.API_URL + "clint/faq/url";
const viewCategoryByid = config.API_URL + "clint/faq/viewCatgory/id";
export default function Subscription() {
  const {url}=useParams();
  const [Faqlist, setFaqlist] = useState('')
  const [Categorylist, setCategorylist] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const body={
          page_saluge:url
        }
        const response = await axios.post(viewAllFaq,body);
        setFaqlist(response.data.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);
  return (
    <div>
      <Header />

      <section id="faqall">
        <br />
        <div className="about_border_deta">

          <h4>Frequently Asked Questions (FAQ)
          </h4>
        </div>
          <div className="all">
        </div>
        {Faqlist !== null ? (
          <div className="users">
            <h4>1.{Faqlist.question}</h4>
            <p className="welcome" >{Faqlist.answer}</p>
            <div dangerouslySetInnerHTML={{ __html: Faqlist?Faqlist.description:"" }} />
            <hr className="lineone"></hr>

          </div>
           ) : (
            <p>No FAQ data available.</p>
          )}
      </section>

      <Footer />
    </div>
  );
}

