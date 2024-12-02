import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function AcordeonForm({ data }) {
  return (
    <div>
      {data?.map((item) => (
        <Accordion key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            // aria-controls="panel1a-content"
            // id="panel1a-header"
          >
            <Typography sx={{ fontWeight: "bold" }} variant="overline">
              {item.titulo}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {item.texto && <Typography>{item.texto}</Typography>}
            {item.children && item.children}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
