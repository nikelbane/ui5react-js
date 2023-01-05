import React, { useState, useEffect } from "react";
import AppBar from "../components/AppBar";

function Services() {
  const [data, setdata] = useState([]);

  const getdata = () => {
    fetch(
      "https://services.odata.org/V4/Northwind/Northwind.svc/Category_Sales_for_1997"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setdata(responseJson.value);
        console.log(responseJson.value);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <AppBar />
      <div>
        <ul>
          {data.map((dt) => (
            <li key={dt.CategoryName}>
              {dt.CategoryName + " " + dt.CategorySales}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Services;
