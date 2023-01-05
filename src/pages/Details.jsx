import React, { useState, useEffect } from "react";
import {
  AnalyticalTable,
  Card,
  CardHeader,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Icon,
} from "@ui5/webcomponents-react";
import { spacing } from "@ui5/webcomponents-react-base";
import tableViewIcon from "@ui5/webcomponents-icons/dist/table-view.js";
import AppBar from "../components/AppBar";

const tableColumns = [
  {
    Header: "Order ID",
    accessor: "OrderID",
  },
  {
    Header: "Product ID",
    accessor: "ProductID",
  },
  {
    Header: "Unit Price",
    accessor: "UnitPrice",
  },
  {
    Header: "Quantity",
    accessor: "Quantity",
  },
  {
    Header: "Discount",
    accessor: "Discount",
  },
];

export function Details() {
  const [data, setdata] = useState([]);
  const [val, setVal] = useState(20);
  const [loading, setLoading] = useState(false);

  const getdata = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        setdata(responseJson.value);
        console.log(url);
        console.log(responseJson.value);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const onLoadMore = () => {
    setLoading(true);
  };

  useEffect(() => {
    getdata(
      "https://services.odata.org/V4/Northwind/Northwind.svc/Order_Details?$top=10"
    );
  }, []);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        const url =
          "https://services.odata.org/V4/Northwind/Northwind.svc/Order_Details?$top=" +
          val +
          "";
        getdata(url);
        setVal(val + 10);
        setLoading(false);
      }, 1000);
    }
  }, [loading, val, data]);

  return (
    <>
      <AppBar />
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        <Card
          header={
            <CardHeader
              titleText="Order Details"
              avatar={<Icon name={tableViewIcon} />}
            />
          }
          style={{ maxWidth: "80%", ...spacing.sapUiContentPadding }}
        >
          <AnalyticalTable
            data={data}
            columns={tableColumns}
            visibleRows={8}
            infiniteScroll={true}
            onLoadMore={onLoadMore}
            loading={loading}
          />
        </Card>
      </FlexBox>
    </>
  );
}
