import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { spacing } from "@ui5/webcomponents-react-base";
import {
  Button,
  BusyIndicator,
  Card,
  Input,
  Text,
  FlexBox,
  FlexBoxJustifyContent,
  FlexBoxWrap,
} from "@ui5/webcomponents-react";

const users = [
  {
    username: "i562831",
    password: "12345678",
  },
  {
    username: "i564584",
    password: "012345678",
  },
];

export function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const checkUser = () => {
    if (data.username === "" || data.password === "") {
      alert("Fill the empty fields.");
    } else {
      const usercheck = users.find(
        (user) =>
          user.username === data.username && user.password === data.password
      );
      if (usercheck) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          navigate("/home", {
            state: {
              pg: "Home",
              id: data.username,
            },
          });
        }, 3000);
      } else if (usercheck === undefined) {
        alert("Username and Password do not match");
      } else {
        alert("Wrong password or username");
      }
    }
  };

  return (
    <>
      <div className="App-header">
        <FlexBox
          justifyContent={FlexBoxJustifyContent.Center}
          wrap={FlexBoxWrap.Wrap}
          style={spacing.sapUiContentPadding}
        >
          <BusyIndicator active={loading}>
            <Card style={{ width: "300px", ...spacing.sapUiContentPadding }}>
              <img
                src="logo-SAP.jpg"
                className="App-logo"
                alt="SAP Logo"
                style={spacing.sapUiSmallMargin}
              />
              <FlexBox
                alignItems="Center"
                direction="Column"
                style={spacing.sapUiContentPadding}
              >
                <Input
                  type="text"
                  name="username"
                  value={data.username}
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend2"
                  required
                  onChange={changeHandler}
                  style={spacing.sapUiTinyMargin}
                />
                <Input
                  type="Password"
                  name="password"
                  value={data.password}
                  placeholder="Password"
                  aria-describedby="inputGroupPrepend2"
                  required
                  onChange={changeHandler}
                  style={spacing.sapUiTinyMargin}
                />
                <Button
                  onChange={changeHandler}
                  type="submit"
                  onClick={checkUser}
                  style={spacing.sapUiTinyMargin}
                >
                  Login
                </Button>
                <FlexBox direction="Row">
                  <Text style={spacing.sapUiTinyMargin}>
                    Don't have an account?
                  </Text>
                  <Link to="/signup" style={spacing.sapUiTinyMargin}>
                    Sign up
                  </Link>
                </FlexBox>
              </FlexBox>
            </Card>
          </BusyIndicator>
        </FlexBox>
      </div>
    </>
  );
}
