import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './ledgerTable.css';

const LedgerTable = ({ data, columns }) => {
  const dataGridColumns = columns.map(column => ({
    field: column.accessor,
    headerName: column.Header,
    flex: 1,
    minWidth: 100,
  }));

  const dataGridData = data.map((row, index) => ({
    id: index,
    ...row,
  }));

  return (
    <div className="data-grid-container">
      <DataGrid
        className="data-grid"
        rows={dataGridData}
        columns={dataGridColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        disableExtendRowFullWidth={false}
      />
    </div>
  );
};

export default LedgerTable;