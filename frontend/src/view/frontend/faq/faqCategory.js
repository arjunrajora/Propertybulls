import { React, useState, useEffect } from "react";
import config from "../../../config/config";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import { Link as RouterLink, Link, useParams } from "react-router-dom";
import axios from "axios";
export default function Subscription() {
  const { category, id } = useParams();
  const [Categorylist, setCategorylist] = useState([])
  const [listView, setListView] = useState(true);
  const handleListView = () => { setListView(true) };
  const handleGridView = () => { setListView(false); };
  const viewCategoryByid = config.API_URL + "clint/faq/viewCatgory/id";
  useEffect(() => {
    const fetchcatgoryData = async () => {
      try {
        const body = {
          name:category
        }
        axios.post(viewCategoryByid, body)
          .then((response) => {
            setCategorylist(response.data.data!=null?response.data.data[0].Faqs:[]);
          })
      } catch (error) {
      }
    };
    fetchcatgoryData()
  }, []);



  const elementsStyle = {
    width: listView ? '100%' : '31.2%',
    height: listView ? 'auto' : '',
    margin: listView ? '0' : '',
    marginbottom: listView ? '' : "30px",
    border: listView ? '' : '1px solid #ccc',
  };
  const btnClassList = listView ? 'btn' : 'btn active';
  return (
    <div>
      <Header />

      <section id="category">
          <div class="question">
            <h1 className="faq_ttl">
              <div className="crumb">
                <Link to="/faq" className="">
                  {" "}
                  FAQ
                </Link>
                <span> / </span>
                <a href="#" className="text-dark fw-bold">
                  {" "}
                  Category
                </a>
                <span> / </span>
                <a href="#" className="text-dark fw-bold">
                  {" "}
                  {category}
                </a>
              </div>
              <i class="fa-regular fa-circle-question me-1"></i>
              {category}
            </h1>
          </div>

          <div id="btn">
            <div className={`btn ${!btnClassList && ''}`} onClick={handleListView}>
              <i className="fa fa-bars lists"></i></div>
            <div className={`btn ${!listView && 'btn active'}`} onClick={handleGridView}>
              <i className="fa fa-th-large grid "></i></div></div>
          <div>
            <div class="wrap">
              <section class="content">
              {Categorylist !== null ? (
                <div class="content">
                  {
                    Categorylist.map((value, index) => {
                      const encodedString = value.page_saluge;
                      const decodedString = decodeURIComponent(encodedString);
                      const replacedString = decodedString.replace(/ /g, '-');
                      return (
                        <article className="column" style={{ ...elementsStyle }} class="block-item">
                          <div class="entry-content">
                            <Link to={"/faq/" + replacedString} className="ancaker text-dark fw-bold mb-3">
                              {index + 1}.{value.question}{" "}
                            </Link>
                            <p className="executed mb-0">
                              {value.answer}
                            </p>
                            <Link to={"/faq/" + replacedString} className="see">
                              {" "}
                              See More{" "}
                            </Link>
                          </div>
                        </article>
                      )
                    })
                  }

                  {/* <article  style={{  ...elementsStyle }}   class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        What happens if I pre-purchase but do not utilize the
                        Rental Agreement?
                      </a>
                      <p className="executed mb-0">
                        We advise you to use the Rental Agreement Service from
                        99acres as Legal Experts approve our templates.
                        Moreover, the validity of Rental Agreement Service is up
                        to 12 Months, which means that you can utilize the
                        service anytime.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article  style={{  ...elementsStyle }}   class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        How much stamp duty should I pay on my rental agreement?
                      </a>
                      <p className="executed mb-0">
                        The online rent agreement is drafted on E-stamp paper
                        having denomination value of Rs 100. However, you can
                        choose higher denomination amount as well in the
                        multiples of 100. In case you require further
                        assistance, you can call us.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article  style={{  ...elementsStyle }}   class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        Is an online Rental Agreement valid or legal?{" "}
                      </a>
                      <p className="executed mb-0">
                        Online rental agreements that are executed on E-stamp
                        paper and signed by both the parties, are legally valid
                        documents. In case you require further assistance, you
                        can call us on our toll-free number i.e. 1800-41-99099
                        (09:00 AM to 07:00 PM, Monday to Saturday) or write to
                        services@99acres.com.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article  style={{  ...elementsStyle }}  class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        Is an online Rental Agreement valid or legal?{" "}
                      </a>
                      <p className="executed mb-0">
                        Online rental agreements that are executed on E-stamp
                        paper and signed by both the parties, are legally valid
                        documents. In case you require further assistance, you
                        can call us on our toll-free number i.e. 1800-41-99099
                        (09:00 AM to 07:00 PM, Monday to Saturday) or write to
                        services@99acres.com.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article  style={{  ...elementsStyle }}   class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        Is an online Rental Agreement valid or legal?{" "}
                      </a>
                      <p className="executed mb-0">
                        Online rental agreements that are executed on E-stamp
                        paper and signed by both the parties, are legally valid
                        documents. In case you require further assistance, you
                        can call us on our toll-free number i.e. 1800-41-99099
                        (09:00 AM to 07:00 PM, Monday to Saturday) or write to
                        services@99acres.com.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article style={{  ...elementsStyle }}    class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        Is an online Rental Agreement valid or legal?{" "}
                      </a>
                      <p className="executed mb-0">
                        Online rental agreements that are executed on E-stamp
                        paper and signed by both the parties, are legally valid
                        documents. In case you require further assistance, you
                        can call us on our toll-free number i.e. 1800-41-99099
                        (09:00 AM to 07:00 PM, Monday to Saturday) or write to
                        services@99acres.com.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article style={{  ...elementsStyle }}    class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        Is an online Rental Agreement valid or legal?{" "}
                      </a>
                      <p className="executed mb-0">
                        Online rental agreements that are executed on E-stamp
                        paper and signed by both the parties, are legally valid
                        documents. In case you require further assistance, you
                        can call us on our toll-free number i.e. 1800-41-99099
                        (09:00 AM to 07:00 PM, Monday to Saturday) or write to
                        services@99acres.com.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article style={{  ...elementsStyle }}    class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        Is an online Rental Agreement valid or legal?{" "}
                      </a>
                      <p className="executed mb-0">
                        Online rental agreements that are executed on E-stamp
                        paper and signed by both the parties, are legally valid
                        documents. In case you require further assistance, you
                        can call us on our toll-free number i.e. 1800-41-99099
                        (09:00 AM to 07:00 PM, Monday to Saturday) or write to
                        services@99acres.com.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article style={{  ...elementsStyle }}    class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        Is an online Rental Agreement valid or legal?{" "}
                      </a>
                      <p className="executed mb-0">
                        Online rental agreements that are executed on E-stamp
                        paper and signed by both the parties, are legally valid
                        documents. In case you require further assistance, you
                        can call us on our toll-free number i.e. 1800-41-99099
                        (09:00 AM to 07:00 PM, Monday to Saturday) or write to
                        services@99acres.com.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article  style={{  ...elementsStyle }}   class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        Is an online Rental Agreement valid or legal?{" "}
                      </a>
                      <p className="executed mb-0">
                        Online rental agreements that are executed on E-stamp
                        paper and signed by both the parties, are legally valid
                        documents. In case you require further assistance, you
                        can call us on our toll-free number i.e. 1800-41-99099
                        (09:00 AM to 07:00 PM, Monday to Saturday) or write to
                        services@99acres.com.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article>
                  <article  style={{  ...elementsStyle }}   class="block-item">
                    <div class="entry-content">
                      <a href="#" className="ancaker text-dark fw-bold mb-3">
                        Is an online Rental Agreement valid or legal?{" "}
                      </a>
                      <p className="executed mb-0">
                        Online rental agreements that are executed on E-stamp
                        paper and signed by both the parties, are legally valid
                        documents. In case you require further assistance, you
                        can call us on our toll-free number i.e. 1800-41-99099
                        (09:00 AM to 07:00 PM, Monday to Saturday) or write to
                        services@99acres.com.
                      </p>
                      <a href="#" className="see">
                        {" "}
                        See More{" "}
                      </a>
                    </div>
                  </article> */}
                  <div className="clear"></div>
                </div>
                ) : (
                  <p>No FAQ data available.</p>
                )}
              </section>
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}