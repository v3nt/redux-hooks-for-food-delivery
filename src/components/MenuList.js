import React from "react";
import MenuItem from "./MenuItem";

function PureMenuList(props) {
  console.log("MenuList Re-Render");
  const { menuList } = props;
  return (
    <ul className="menu-list">
      {menuList.map((item) => (
        <MenuItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

export const MenuList = React.memo(PureMenuList);
