import React from "react";
import { Tooltip } from '@mui/material'
import Link from "@docusaurus/Link";

const popupStyle = {
  fontSize: "14px",
};
const textStyle = {
  fontWeight: "bold",
};

export default function Term(props) {
  return (
    <span className={props.wrapperClass}>
      <Tooltip
        title={
          <span style={popupStyle} className={props.popupClass}>
            {props.popup}
          </span>
        }
        arrow={true}
      >
        <Link to={props.reference} className={props.linkClass}>
          <span style={textStyle} className={props.textClass}>
            {props.children}
          </span>
        </Link>
      </Tooltip>
    </span>
  );
}
