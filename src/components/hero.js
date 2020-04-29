import { graphql, useStaticQuery, Link } from "gatsby";
import React, { useState } from "react";
import Header from "./header";

export const Hero = () => {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-screen-xl mx-auto ">
        <div className="rrelative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32 text-center">
          <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 text-center">
            <div className="sm:text-center lg:text-center">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                Discover{" "}
                <span className="text-indigo-600">the best product videos</span>
                <br />
                on Product Hunt
              </h2>
              <p className="mt-3 text-center text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:my-8 md:text-xl ">
                Curated product hunt launch videos to get inspiration for your
                next PH launch and stay current on the latest video trends
                <br />
                <span className="text-indigo-600 mt-2 block">
                  {" "}
                  Note: click on the product image to watch the PH launch video
                </span>
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Discover Videos
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
