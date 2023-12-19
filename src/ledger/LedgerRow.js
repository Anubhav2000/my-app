import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import LedgerCell from './LedgerCell';

const LedgerRow = ({ row }) => {
  return (
    <TableRow>
      {Object.values(row).map((cell, i) => (
        <LedgerCell key={i} value={cell} />
      ))}
    </TableRow>
  );
};

export default LedgerRow;