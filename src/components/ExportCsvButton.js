import React from 'react';
import { Button } from '@mui/material';
import { Download as DownloadIcon } from '@mui/icons-material';

const ExportCsvButton = ({ data, columns, filename = 'export.csv', buttonProps, children }) => {
  const buildCsv = () => {
    const headers = columns.map(c => c.header);
    const rows = data.map(item =>
      columns.map(c => {
        const raw = typeof c.value === 'function' ? c.value(item) : item?.[c.value];
        const str = raw == null ? '' : String(raw);
        return '"' + str.replace(/"/g, '""') + '"';
      })
    );

    return [headers.map(h => '"' + String(h).replace(/"/g, '""') + '"').join(',')]
      .concat(rows.map(r => r.join(',')))
      .join('\n');
  };

  const handleClick = () => {
    try {
      const csv = buildCsv();
      const blob = new Blob(["\uFEFF" + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      // no-op
    }
  };

  return (
    <Button
      variant="outlined"
      startIcon={<DownloadIcon />}
      onClick={handleClick}
      {...buttonProps}
    >
      {children || 'خروجی اکسل'}
    </Button>
  );
};

export default ExportCsvButton;
