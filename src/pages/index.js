import React, { useState } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";
import catAndHumanIllustration from "../images/cat-and-human-illustration.svg";
import { graphql } from "gatsby";
import { Hero } from "../components/hero";
import Img from "gatsby-image";
import Modal from "../components/modal";
const IndexPage = ({ data }) => {
  const [videoModalActive, setVideomodalactive] = useState(false);
  const [video, setVideo] = useState("");

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };
  const youtube_parser = (url) => {
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    } else {
      //error
      console.log(match);
    }
  };

  const handleDivClicked = (ev) => {
    // Retrieve the passed parameter from 'div_id' dataset
    let id = youtube_parser(ev.currentTarget.dataset.videourl);

    console.log(`Div ${id} clicked`);
    setVideo(`https://www.youtube.com/embed/${id}`);
    setVideomodalactive(true);
  };

  return (
    <Layout>
      <SEO
        keywords={[
          `producthunt`,
          `video`,
          `inspiration`,
          `product hunt launch video`,
        ]}
        title="Product Hunt Video Inspiration"
      />

      <Hero />

      <Modal
        id="video-modal"
        show={videoModalActive}
        handleClose={closeModal}
        video={video}
        videoTag="iframe"
      />
      <section className="container grid-cols-1 sm:grid-cols-2 md:grid-cols-3  mx-auto md:row-gap-24 row-gap-12 px-4 py-10 grid md:gap-10 ">
        {data.allGoogleSheetSheet1Row.nodes

          .filter((item) => item.localFeaturedImage !== null)
          .filter((item) => item.localFeaturedImage.childImageSharp !== null)
          .filter((item) =>
            item.videourl.includes("https://www.youtube.com/embed/")
          )
          .filter(
            (item, i, array) =>
              array.findIndex((item, index) => item.productname !== index) !== i
          )

          .sort((a, b) => b.votescount - a.votescount)

          .map((item, key) => (
            <div
              className="md:flex flex-col"
              onClick={handleDivClicked}
              data-videourl={item.videourl}
              key={item.id}
            >
              <div className="md:flex-shrink-0 overflow-hidden	">
                <Img
                  fixed={item.localFeaturedImage.childImageSharp.fixed}
                  objectFit="cover"
                  objectPosition="50% 50%"
                />
              </div>
              <div className="mt-4 md:mt-3 ">
                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">
                  {item.topic}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  className="block mt-2 text-lg leading-tight font-semibold text-gray-900 hover:underline"
                >
                  {item.productname}
                </a>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
      </section>
    </Layout>
  );
};

export default IndexPage;
export const query = graphql`
  {
    allGoogleSheetSheet1Row {
      nodes {
        featuredimage
        productname
        topic
        url
        votescount
        videourl
        id
        description
        localFeaturedImage {
          childImageSharp {
            # Specify the image processing specifications right in the query.
            # Makes it trivial to update as your page's design changes.
            fixed(width: 400, height: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`;
