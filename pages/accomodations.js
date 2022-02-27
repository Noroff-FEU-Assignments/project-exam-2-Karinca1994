import React from "react";
import { useState, useEffect } from "react";
import Loader from "../components/layout/Loader";
import Heading from "../components/layout/Heading";
import {
  TITLE_ACCOMODATIONS,
  KEY_ACCOMODATIONS,
  META_ACCOMODATIONS,
} from "../constants/meta";
import axios from "axios";
import { RESULTS_URL } from "../constants/api";
import Link from "next/link";
import Image from "next/image";
import Layout from "../components/layout/Layout";
import FeedbackMessage from "../components/common/FeedbackMessage";
import { Button2 } from "../components/common/Button";
import SearchResult from "../components/accomodations/Search/SearchResult";
import { StarIcon } from "../constants/stylement";

export default function accomodations() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  useEffect(function () {
    async function getAccomodations() {
      try {
        const response = await axios.get(RESULTS_URL);
        setResults(response.data.data);
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    getAccomodations();
  }, []);

  const searchResult = results.filter((e) =>
    e.attributes.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <Layout
        page="accomodations"
        title={TITLE_ACCOMODATIONS}
        keywords={KEY_ACCOMODATIONS}
        description={META_ACCOMODATIONS}
      >
        <article className="bg-gray-100">
          <div className="px-2">
            <Heading title="Our Accomodations" type="h1" />
          </div>
          <div>
            {!error && !loading ? (
              <div className="container m-4">
                <div className="flex justify-left">
                  <div className="xl:w-96">
                    <div className="input-group relative flex items-stretch w-full mb-4">
                      <input
                        className="form-control relative flex-auto min-w-0 w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Search by name..."
                        aria-label="Search hotels, B and B, and guesthouses."
                        onChange={(e) => {
                          setSearchValue(e.attributes.target.value);
                        }}
                      />
                      <button
                        className="btn inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
                        type="button"
                        id="button-addon2"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="search"
                          className="w-4"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                {searchResult.length > 0 ? (
                  searchResult.map((e) => <SearchResult key={e.id} e={e} />)
                ) : (
                  <FeedbackMessage message="No results. Please try again." />
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex sm:flex-colum grid md:grid-cols-2 justify-center">
            {error && (
              <FeedbackMessage
                type="error"
                message="An error occurred while loading the page."
              />
            )}
            {loading && <Loader />}

            {results.map(function (accomodation, index) {
              return (
                <div className="sm:w-full md:min-w-max" key={index}>
                  <Link
                    key={accomodation.id}
                    href={`accomodation/${accomodation.id}`}
                  >
                    <div className="relative md:my-5 md:mx-4 lg:flex sm:mt-5 sm:m-auto">
                      <div className="relative">
                        {accomodation.attributes.image.data.map((image) => (
                          <div className="block lg:w-56 md:h-64 h-56 md:w-56 md:h-56 flex-none">
                            <Image
                              className="lg:rounded-l-lg sm:rounded-t-lg shadow bg-cover"
                              src={image.attributes.url}
                              alt={accomodation.attributes.name}
                              key={accomodation.id}
                              layout="fill"
                            />
                          </div>
                        ))}
                      </div>
                      <div className="shadow w-90 px-6 lg:w-1/2 rounded lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-center">
                        <div className="mb-10">
                          <span className="uppercase tracking-wide inline-block px-2 rounded-full text-xs bg-gray-300 text-gray-600">
                            {accomodation.attributes.category}
                          </span>

                          <h1 className="text-gray-900 font-bold text-xl mb-2">
                            {accomodation.attributes.name}
                          </h1>
                          <div className="block text-gray-700">
                            <p className="text-gray-900">
                              Rating: {accomodation.attributes.rating}
                            </p>
                          </div>
                          <div className="block text-gray-700">
                            <p className="text-gray-900">
                              Price: {accomodation.attributes.price} Nok
                            </p>
                          </div>
                          {/* legg til stjernene func her */}
                          <div>
                            <div className="mt-1 inline-flex">
                              {accomodation.attributes.stars} stars <StarIcon />
                            </div>
                          </div>
                          <div className="mt-1">
                            <Button2>
                              <Link href={`accomodation/${accomodation.id}`}>
                                <a>See more</a>
                              </Link>
                            </Button2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </article>
      </Layout>
    </>
  );
}
