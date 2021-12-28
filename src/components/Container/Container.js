import React from "react";
import PropTypes from "prop-types";
import s from "./Container.module.css";

function Container({ children }) {
  return <div className={s.container}>{children}</div>;
}

Container.Propypes = {
  children: PropTypes.node,
};

export default Container;
