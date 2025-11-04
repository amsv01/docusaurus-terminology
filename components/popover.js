import React from "react";
import { Popover, Typography } from '@mui/material'
import Link from "@docusaurus/Link";

function getPopoverId(reference) {
  if (!reference) {
    return undefined;
  }
  const safeId = reference.replace(/[^a-zA-Z0-9_-]/g, '-');
  return `term-popover-${safeId}`;
}

export default function Term(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const closeTimeout = React.useRef();

  const cancelClose = React.useCallback(() => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
      closeTimeout.current = undefined;
    }
  }, []);

  const scheduleClose = React.useCallback(() => {
    cancelClose();
    closeTimeout.current = setTimeout(() => {
      setAnchorEl(null);
    }, 100);
  }, [cancelClose]);

  const openWithAnchor = React.useCallback(
    (event) => {
      cancelClose();
      setAnchorEl(event.currentTarget);
    },
    [cancelClose]
  );

  React.useEffect(() => {
    return () => {
      cancelClose();
    };
  }, [cancelClose]);

  const open = Boolean(anchorEl);
  const id = open ? getPopoverId(props.reference) : undefined;

  return (
    <span className={props.wrapperClass}>
      <Link
        to={props.reference}
        className={props.linkClass}
        onMouseEnter={openWithAnchor}
        onFocus={openWithAnchor}
        onMouseLeave={scheduleClose}
        onBlur={scheduleClose}
      >
        <span className={props.textClass}>{props.children}</span>
      </Link>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={scheduleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableRestoreFocus
        slotProps={{
          paper: {
            className: props.popupClass
          }
        }}
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
      >
        <Typography sx={{ p: 1 }} className={props.popupClass}>
          {props.popup}
        </Typography>
      </Popover>
    </span>
  );
}
