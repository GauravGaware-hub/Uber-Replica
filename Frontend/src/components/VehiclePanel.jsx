import React from "react";

const VehiclePanel = (props) => {
  return (
    <div>
      <h5
        className="p-1 text-center w-[93%] absolute top-0"
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-fill"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Choose a Vehicle</h3>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
      }} className="flex h-20 border-2 border-gray-300 active:border-black mb-2 rounded-xl w-full items-center p-3 justify-between">
        <img
          className="h-16"
          src="https://tb-static.uber.com/prod/udam-assets/50b5e341-5426-42fd-acfe-037d63333de5.png"
          alt=""
        />
        <div className="m1-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo{" "}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">2 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable, compact rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹193.20</h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
      }} className=" h-20 flex border-2 border-gray-300 active:border-black mb-2 rounded-xl w-full items-center p-3 justify-between">
        <img
          className="h-10"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85MjAwMTg5YS03MWMwLTRmNmQtYTlkZS0xYjZhODUyMzkwNzkucG5n"
          alt=""
        />
        <div className="m1-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto{" "}
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable motorcycle rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹65.60</h2>
      </div>
      <div onClick={() => {
        props.setConfirmRidePanel(true)
      }} className="flex h-20 border-2 border-gray-300 active:border-black mb-2 rounded-xl w-full items-center p-3 justify-between">
        <img
          className="h-17"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy9mYzEwMWZmOC04MWExLTQ2YzMtOTk1YS02N2I0YmJkMmYyYmYuanBn"
          alt=""
        />
        <div className="m1-2 w-1/2">
          <h4 className="font-medium text-base">
            Uber Auto{" "}
            <span>
              <i className="ri-user-3-fill">3</i>
            </span>
          </h4>
          <h5 className="font-medium text-sm">3 mins away</h5>
          <p className="font-normal text-xs text-gray-600">
            Affordable auto rides
          </p>
        </div>
        <h2 className="text-lg font-semibold">₹118.86</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
