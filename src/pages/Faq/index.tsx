import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typo from 'components/Typo';
import { listFaq } from './constant';

const Faqs = () => {
  return (
    <div className="container my-10">
      <Typo size="max" isBold align="center">
        FAQS
      </Typo>
      <div className="mt-10">
        {listFaq.map((faq, index) => (
          <Accordion key={index}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              //   sx={{
              //     backgroundColor: 'primary.light',
              //   }}
            >
              <Typography>{faq.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typo className="px-4 text-justify">{faq.desc}</Typo>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
