import { React, useState, useEffect } from "react";
import OwlCarousel from 'react-owl-carousel';
import { Link as RouterLink, Link } from "react-router-dom";
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import config from "../../../config/config";
import Header from "../../../element/frontHeader";
import Footer from "../../../element/frontFooter";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
const viewAllFaq = config.API_URL + "clint/faq/viewAll";
const viewCategoryByid = config.API_URL + "clint/faq/viewCatgory/id";
export default function Subscription() {
  const [Faqlist, setFaqlist] = useState([])
  const [Categorylist, setCategorylist] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  let categorys;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(viewAllFaq);
        const value = await response.json();
        setFaqlist(value.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const fetchcatgoryData = async () => {
      try {
        const body = {
          name:"General-Questions"
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

  let catgory_id;
  const slideroptions = {
    loop: true,
    autoplay: false,
    autoplayTimeout: 5000,
    smartSpeed: 2500,
    dots: true,
    margin: 30,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 3
      },
      1000: {
        items: 4,
      },
      1900: {
        items: 5
      }
    }
  };


  return (
    <div>
      <Header />

      <section id="faqall">
      
        <div className="about_border_deta">

          <h4>Frequently Asked Questions (FAQ)
          </h4>
        </div>

        <div className="all">

          <div>
            {isLoading ? (
              <div className="loader inner-loader" colSpan={8}>
                <ClipLoader
                  loading={isLoading}
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <OwlCarousel   {...slideroptions}>
                {Faqlist.map((value, index) => {
                  let Category;
                  if (value.FaqCatgory != null) {
                    Category = value.FaqCatgory.name;
                  } else {
                    return null;
                  }
                  if (value.status === "Y") {
                    const encodedString = value.page_saluge;
                    const decodedString = decodeURIComponent(encodedString);
                    const replacedString = decodedString.replace(/ /g, '-');
                    const encodedStringtocatgory = Category;
                    const decodedStringcatgory = decodeURIComponent(encodedStringtocatgory);
                    categorys = decodedStringcatgory.replace(/ /g, '-');

                    let lastClassname = [];

                    for (let number = 1; number <= 3; number++) {
                      lastClassname.push(number);
                    }
                    let add = lastClassname.join()
                    return (
                      <div className={`box-${"1"}`} key={index}>
                        <div className="thumb-1 colar">
                          <div className="ttl">

                            <span>Category:</span>
                            <Link to={"/faq/category/" + categorys}>
                              <span>{Category}</span>
                            </Link>
                          </div>
                          <p className="name mb-0">
                            <Link to={"/faq/" + replacedString} className="text-dark">
                              {value.question}
                            </Link>
                          </p>
                        </div>
                      </div>
                    );
                  }

                  return null; // Return null for other cases
                })}

              </OwlCarousel>
            )}

          </div>
          <hr className="lineone"></hr>
        </div>



        <div class="question">
          <h1 className="faq_ttl">
            <i class="fa-regular fa-circle-question"></i>
            <i className="spriteFaq ">

            </i>  General Questions
          </h1>
          {Categorylist.slice(0, 5).map((e) => {
            const encodedString = e.page_saluge;
            const decodedString = decodeURIComponent(encodedString);
            const replacedString = decodedString.replace(/ /g, '-');
            catgory_id = e.faq_category;

            return (
              <ul key={e.id}>
                <Link to={"/faq/" + replacedString}>
                  <li>{e.question}</li>
                </Link>
              </ul>
            );
          })}

          {Categorylist.length > 5 && (
            <Link
              to={"/faq/category/General-Questions"}
              className="more fw-bold"
            >
              +{Categorylist.length} more questions
            </Link>
          )}
          <hr className="mt-4 mb-4"></hr>

        </div>
      </section>

      <Footer />
    </div>
  );
}

