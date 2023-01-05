import React, { useRef } from "react";
import {
  ShellBar,
  Avatar,
  StandardListItem,
  Menu,
  MenuItem,
} from "@ui5/webcomponents-react";
import { useLocation, useNavigate } from "react-router-dom";
import employee from "@ui5/webcomponents-icons/dist/employee.js";
import journeyarrive from "@ui5/webcomponents-icons/dist/journey-arrive.js";
import personnelview from "@ui5/webcomponents-icons/dist/personnel-view.js";
import actionsettings from "@ui5/webcomponents-icons/dist/action-settings.js";

function AppBar() {
  const menuRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  const handleProfileClick = (e) => {
    menuRef.current.showAt(e.detail.targetRef);
  };
  const handleItemClick = (e) => {
    navigate("/" + e.detail.item.id, {
      state: {
        pg: e.detail.item.id,
        id: location.state.id,
      },
    });
  };

  const handleMenuClick = () => {
    navigate("/");
  };

  return (
    <>
      <ShellBar
        logo={<img src="sapicon.png" alt="SAP Icon" />}
        primaryTitle={location.state.pg}
        menuItems={
          <>
            <StandardListItem id="Home">Home</StandardListItem>
            <StandardListItem id="Details">Details</StandardListItem>
            <StandardListItem id="Services">Services</StandardListItem>
          </>
        }
        notificationsCount="10"
        secondaryTitle={"Welcome " + location.state.id}
        profile={<Avatar icon={employee}></Avatar>}
        showNotifications="true"
        onNotificationsClick={function noRefCheck() {}}
        onLogoClick={handleLogoClick}
        onProfileClick={handleProfileClick}
        onMenuItemClick={handleItemClick}
      ></ShellBar>
      <Menu ref={menuRef} onItemClick={handleMenuClick}>
        <MenuItem icon={personnelview} text="Profile" />
        <MenuItem icon={actionsettings} startsSection text="Preferences" />
        <MenuItem icon={journeyarrive} text="Logout" />
      </Menu>
    </>
  );
}

export default AppBar;
