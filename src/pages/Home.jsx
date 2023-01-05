import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CustomListItem,
  FlexBox,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  FlexBoxWrap,
  Icon,
  List,
  ProgressIndicator,
  StandardListItem,
  Text,
  ValueState,
} from "@ui5/webcomponents-react";
import { spacing, ThemingParameters } from "@ui5/webcomponents-react-base";
import { BarChart, DonutChart } from "@ui5/webcomponents-react-charts";
import donutChartIcon from "@ui5/webcomponents-icons/dist/donut-chart.js";
import barChartIcon from "@ui5/webcomponents-icons/dist/horizontal-bar-chart.js";
import listIcon from "@ui5/webcomponents-icons/dist/list.js";
import AppBar from "../components/AppBar";

export function Home() {
  const [toggleCharts, setToggleCharts] = useState("barChart");
  const [loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);

  const getdata = () => {
    fetch(
      "https://services.odata.org/V4/Northwind/Northwind.svc/Category_Sales_for_1997"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setdata(responseJson.value);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleHeaderClick = () => {
    if (toggleCharts === "barChart") {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("donutChart");
      }, 1000);
    } else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setToggleCharts("barChart");
      }, 1000);
    }
  };
  const switchToChart =
    toggleCharts === "barChart" ? "Donut Chart" : "Bar Chart";

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <AppBar />
      <FlexBox
        justifyContent={FlexBoxJustifyContent.Center}
        wrap={FlexBoxWrap.Wrap}
        style={spacing.sapUiContentPadding}
      >
        <Card header={<CardHeader titleText="Dashboard" />}>
          <FlexBox
            justifyContent={FlexBoxJustifyContent.Center}
            wrap={FlexBoxWrap.NoWrap}
            style={spacing.sapUiContentPadding}
          >
            <Card
              header={
                <CardHeader
                  titleText="Sales tracker"
                  subtitleText={`Click here to switch to ${switchToChart}`}
                  interactive
                  onClick={handleHeaderClick}
                  avatar={
                    <Icon
                      name={
                        toggleCharts === "barChart"
                          ? barChartIcon
                          : donutChartIcon
                      }
                    />
                  }
                />
              }
              style={{ width: "40%", ...spacing.sapUiContentPadding }}
            >
              {toggleCharts === "barChart" ? (
                <BarChart
                  dataset={data}
                  dimensions={[{ accessor: "CategoryName" }]}
                  measures={[{ accessor: "CategorySales", label: "Sales" }]}
                  loading={loading}
                />
              ) : (
                <DonutChart
                  dataset={data}
                  dimension={{
                    accessor: "CategoryName",
                  }}
                  measure={{
                    accessor: "CategorySales",
                  }}
                />
              )}
            </Card>
            <Card
              header={
                <CardHeader
                  titleText="Order Progress"
                  subtitleText="List"
                  avatar={<Icon name={listIcon} />}
                  interactive
                />
              }
              style={{ width: "40%", ...spacing.sapUiContentPadding }}
            >
              <List>
                <StandardListItem
                  additionalText="finished"
                  additionalTextState={ValueState.Success}
                >
                  Activity 1
                </StandardListItem>
                <StandardListItem
                  additionalText="failed"
                  additionalTextState={ValueState.Error}
                >
                  Activity 2
                </StandardListItem>
                <CustomListItem>
                  <FlexBox
                    direction={FlexBoxDirection.Column}
                    style={{ width: "100%", ...spacing.sapUiContentPadding }}
                  >
                    <FlexBox
                      justifyContent={FlexBoxJustifyContent.SpaceBetween}
                    >
                      <Text
                        style={{ fontSize: ThemingParameters.sapFontLargeSize }}
                      >
                        Activity 3
                      </Text>
                      <Text
                        style={{
                          color: ThemingParameters.sapCriticalTextColor,
                        }}
                      >
                        in progress
                      </Text>
                    </FlexBox>
                    <ProgressIndicator
                      value={89}
                      valueState={ValueState.Success}
                      style={{ ...spacing.sapUiTinyMarginTop }}
                    />
                  </FlexBox>
                </CustomListItem>
                <CustomListItem>
                  <FlexBox
                    direction={FlexBoxDirection.Column}
                    style={{ width: "100%", ...spacing.sapUiContentPadding }}
                  >
                    <FlexBox
                      justifyContent={FlexBoxJustifyContent.SpaceBetween}
                    >
                      <Text
                        style={{ fontSize: ThemingParameters.sapFontLargeSize }}
                      >
                        Activity 4
                      </Text>
                      <Text
                        style={{
                          color: ThemingParameters.sapCriticalTextColor,
                        }}
                      >
                        in progress
                      </Text>
                    </FlexBox>
                    <ProgressIndicator
                      value={5}
                      valueState={ValueState.Error}
                      style={{ ...spacing.sapUiTinyMarginTop }}
                    />
                  </FlexBox>
                </CustomListItem>
              </List>
            </Card>
          </FlexBox>
        </Card>
      </FlexBox>
    </>
  );
}
