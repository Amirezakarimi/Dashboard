import React, { useRef } from 'react';
import { Button } from '@mui/material';
import { PictureAsPdf as PictureAsPdfIcon } from '@mui/icons-material';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import vazirTtfUrl from '../assets/fonts/Vazir-Regular.ttf';

/**
 * ExportPdfButton
 * props:
 * - title?: string (document title, shown at top)
 * - data: Array<any>
 * - columns: Array<{ header: string, value: string | ((row: any) => any) }>
 * - filename?: string (default: 'export.pdf')
 * - orientation?: 'p' | 'l' (portrait/landscape)
 * - buttonProps?: any (forwarded to MUI Button)
 */
let vazirLoaded = false;

const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  // btoa expects binary string
  return window.btoa(binary);
};

const ensureVazirFont = async (doc) => {
  if (vazirLoaded) return;
  const res = await fetch(vazirTtfUrl);
  const ab = await res.arrayBuffer();
  const base64 = arrayBufferToBase64(ab);
  doc.addFileToVFS('Vazir-Regular.ttf', base64);
  doc.addFont('Vazir-Regular.ttf', 'Vazir', 'normal');
  vazirLoaded = true;
};

const ExportPdfButton = ({ title = 'گزارش', data, columns, filename = 'export.pdf', orientation = 'p', buttonProps, children }) => {
  const buildTable = () => {
    const head = [columns.map(c => c.header)];
    const body = data.map(item => columns.map(c => {
      const raw = typeof c.value === 'function' ? c.value(item) : item?.[c.value];
      return raw == null ? '' : String(raw);
    }));
    return { head, body };
  };

  const handleClick = async () => {
    const doc = new jsPDF({ orientation, unit: 'pt', format: 'a4' });

    // load and set Vazir font for Persian text
    await ensureVazirFont(doc);
    doc.setFont('Vazir', 'normal');

    if (title) {
      doc.setFont('Vazir', 'normal');
      doc.setFontSize(16);
      doc.text(title, 40, 40, { align: 'left' });
    }

    const { head, body } = buildTable();

    autoTable(doc, {
      head,
      body,
      startY: title ? 60 : 40,
      styles: { font: 'Vazir', fontSize: 10 },
      headStyles: { fillColor: [102, 126, 234], textColor: 255 },
      alternateRowStyles: { fillColor: [245, 247, 250] },
      margin: { left: 40, right: 40 },
    });

    doc.save(filename);
  };

  return (
    <Button
      variant="outlined"
      color="error"
      startIcon={<PictureAsPdfIcon />}
      onClick={handleClick}
      {...buttonProps}
    >
      {children || 'خروجی PDF'}
    </Button>
  );
};

export default ExportPdfButton;
