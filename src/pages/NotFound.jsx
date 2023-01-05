import React from "react";
import { Card, FlexBox, IllustratedMessage } from "@ui5/webcomponents-react";
import "@ui5/webcomponents-fiori/dist/illustrations/PageNotFound.js";
import { Link } from "react-router-dom";
import { spacing } from "@ui5/webcomponents-react-base";

function NotFound() {
  return (
    <Card>
      <FlexBox direction="Column" alignItems="Center">
        <IllustratedMessage name="PageNotFound">
          <Link to="/" style={spacing.sapUiTinyMargin}>
            Go to login
          </Link>
        </IllustratedMessage>
      </FlexBox>
    </Card>
  );
}

export default NotFound;
