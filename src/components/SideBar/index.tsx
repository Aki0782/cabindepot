import React from "react";
import {
  MdDashboard,
  MdOutlineShoppingCartCheckout,
  MdOutlineContacts,
  MdOutlineInsertDriveFile,
  MdOutlineShoppingCart
} from "react-icons/md";
import { TbUserCog } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import "./index.scss";
type SideBarProps = {
  getCompoentName: (a: string) => void;
};

const SideBar: React.FC<SideBarProps> = ({ getCompoentName }) => {
  const config = [
    {
      name: "Overview",
      path: "",
      icon: <MdDashboard />
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <MdOutlineShoppingCartCheckout />
    },
    {
      name: "Products",
      path: "/products",
      icon: <MdOutlineShoppingCart />
    },
    {
      name: "Assets",
      path: "/assets",
      icon: <MdOutlineInsertDriveFile />
    },
    {
      name: "Users",
      path: "/users",
      icon: <TbUserCog />
    },
    {
      name: "Contacts",
      path: "/contacts",
      icon: <MdOutlineContacts />
    }
  ];

  return (
    <div className="sidebarContainer">
      <nav className="list">
        {config.map((item) => (
          <NavLink
            className={({ isActive }) => {
              isActive && getCompoentName(item.name);

              return isActive ? "listitem active" : "listitem";
            }}
            to={item.path}
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
