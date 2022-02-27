import React from "react";
import { EyeIcon, primary } from "../../constants/stylement";
import { ButtonLink2 } from "../common/Button";

function Types() {
  return (
    <div>
      <div className="py-8 px-5 bg-gray-100 dark:bg-gray-800 2xl:mx-auto 2xl:container px-4 md:px-6 2xl:px-0 flex justify-center">
        <div className="flex flex-col justify-center items-center">
          <div className="flex items-center ">
            <p className="text-3xl lg:text-4xl font-semibold leading-9 text-gray-800 dark:text-gray-50">
              Explore Accomodations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-between mt-8 gap-y-8">
            <div className="flex items-start flex-col">
              <div className="relative flex justify-center items-center bg-gray-100 dark:bg-gray-800">
                <div className="flex flex-col items-start jusitfy-start mt-3 space-y-3">
                  <div>
                    <h2 className="secondary-h2"> Hotels In Bergen</h2>
                  </div>

                  <div>
                    <img src="/images/hotels/people-1.jpg" alt="hotel image" />

                    <ButtonLink2 link="/accomodations">
                      <EyeIcon colour={primary} />
                    </ButtonLink2>
                  </div>
                  <p className="text-lg leading-4 text-gray-600 dark:text-white">
                    Find the best hotels in Bergen.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start flex-col">
              <div className="relative flex justify-center items-center bg-gray-100 dark:bg-gray-800">
                <div className="flex flex-col items-start jusitfy-start mt-3 space-y-3">
                  <div>
                    <h2 className="secondary-h2"> Bed and Breakfast</h2>
                  </div>

                  <div>
                    <img src="/images/b&b/bb-5.jpg" alt="hotel image" />

                    <ButtonLink2 link="/accomodations">
                      <EyeIcon colour={primary} />
                    </ButtonLink2>
                  </div>
                  <p className="text-lg leading-4 text-gray-600 dark:text-white">
                    Find the best B&B´s in Bergen.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start flex-col">
              <div className="relative flex justify-center items-center bg-gray-100 dark:bg-gray-800">
                <div className="flex flex-col items-start jusitfy-start mt-3 space-y-3">
                  <div>
                    <h2 className="secondary-h2"> Guesthouses In Bergen</h2>
                  </div>

                  <div>
                    <img src="/images/guestrooms/gr-4.jpg" alt="hotel image" />

                    <ButtonLink2 link="/accomodations">
                      <EyeIcon colour={primary} />
                    </ButtonLink2>
                  </div>
                  <p className="text-lg leading-4 text-gray-600 dark:text-white">
                    Find the best guesthouses in Bergen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Types;
