import React from "react";
import { spacing } from "@ui5/webcomponents-react-base";
import {
  Card,
  CardHeader,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
} from "@ui5/webcomponents-react";
import { useForm } from "react-hook-form";

export function Signup() {
  const { register } = useForm();
  const onSubmit = () => {
    alert("Account created Successfully!!");
  };

  return (
    <>
      <div className="App-Header">
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          <Card
            header={<CardHeader titleText="Create Account" interactive />}
            style={{ width: "300px", ...spacing.sapUiContentPadding }}
          >
            <form>
              <fieldset>
                <label htmlFor="name">Enter your name: </label>
                <br />
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true, maxLength: 10 })}
                />

                <br />
                <br />
                <label htmlFor="age">Enter your age: </label>
                <br />
                <input type="number" id="age" min="1" />
                <br />
                <br />
                <label>Gender: </label>
                <select>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
                <br />
                <br />
                <label>Email: </label>
                <br />
                <input type="email"></input>
                <br />
                <br />
                <label>Password:</label>
                <br />
                <input type="password"></input>
                <br />
                <br />
                <label>Confirm Password:</label>
                <br />
                <input type="password"></input>
                <br />
                <br />
                <button onClick={onSubmit}>Submit</button>
              </fieldset>
            </form>
          </Card>
        </FlexBox>
      </div>
    </>
  );
}
