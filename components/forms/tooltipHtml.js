import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { Grid, Icon } from "@mui/material";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f78d09",
    color: "#363636",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(13),
    border: "1px solid #ff8d00",
  },
}));

export default function TooltipHtml({
  children,
  label,
  position = "top-center",
}) {
  return (
    <HtmlTooltip
      placement={position}
      title={
        <>
          <Icon className="fas fa-info-circle" /> {label}
        </>
      }
    >
      {children}
    </HtmlTooltip>
  );
}
