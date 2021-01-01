import React, { Fragment, useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

import allActions from "./actions/";
import { CHANGE_DIET, CHANGE_DIET_VEGAN } from "./actions/types";

import { MenuList, Message, PaymentFooter } from "./Comps";

import useLoadFoodData from "./hooks/useLoadFoodData";

const App = (props) => {
  console.log("props", props);
  const diet = useSelector((state) => state.diet);
  const dispatch = useDispatch();

  const stateAPIStatus = useLoadFoodData();
  const menuList = useSelector(selectorMenu, shallowEqual);

  useEffect(() => {
    console.log("SERVER_EVENT: menu list changed");
  }, [menuList]);

  function handleVegToggle() {
    dispatch({
      type: CHANGE_DIET,
    });
  }
  function handleVeganToggle() {
    dispatch({
      type: CHANGE_DIET_VEGAN,
    });
  }

  return (
    <div className="food-app">
      <header>
        <h1>Ordux</h1>
        <div>
          <label>
            <input
              type="checkbox"
              name="vegan-checkbox"
              value={diet}
              checked={diet === "vegan"}
              onChange={handleVeganToggle}
            />
            Vegan
          </label>
          <label>
            <input
              type="checkbox"
              name="veg-checkbox"
              value={diet}
              checked={diet === "veg"}
              onChange={handleVegToggle}
            />
            Veg
          </label>
        </div>
      </header>
      <Message status={stateAPIStatus} />
      {stateAPIStatus === "success" && (
        <Fragment>
          <main>
            <MenuList menuList={menuList} />
          </main>
          <PaymentFooter />
        </Fragment>
      )}
    </div>
  );
};

export default connect(null, allActions)(App);

function selectorMenu(state) {
  const { diet, menuIdList, menuById } = state;
  const menuId = menuIdList[diet];
  const menuList = [];

  menuId.forEach((id) => {
    menuList.push(menuById[id]);
  });

  return menuList;
}
