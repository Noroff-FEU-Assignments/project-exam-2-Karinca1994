import React from "react";

function Quoutes() {
  return (
    <>
      <div className="max-w-lg m-auto mt-10 border p-6 rounded-lg bg-gray-100">
        <div className="font-serif  md:text-xl leading-relaxed italic">
          <div className="text-6xl leading-none">“</div>
          <div className="px-6 -mt-6">
            Holidaze is the best sites to book accomodatios from, it made it
            easy for me and my family to visit Norway.
          </div>
        </div>
        <div className="flex items-center mt-4 ml-6">
          <img
            src="/images/persona-photo.jpg"
            alt="selfie"
            className="border rounded-full w-12 opacity-75 mr-2"
          />
          <span className="text-gray-600 block">Dina Eiriksdottir</span>
        </div>
      </div>
    </>
  );
}

export default Quoutes;
