import React from 'react';
import LedgerTable from './LedgerTable';

const Ledger = ({ ledgerData }) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Date',
        accessor: 'date',
        width: '10%',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        width: '10%',
      },
      {
        Header: 'Ledger Type',
        accessor: 'type',
        width: '15%',
      },
      {
        Header: 'Source Account Type',
        accessor: 'sourceType',
        width: '15%',
      },
      {
        Header: 'Source Description',
        accessor: 'sourceDescription',
        width: '10%',
      },
      {
        Header: 'Destination Account Type',
        accessor: 'destinationType',
        width: '15%',
      },
      {
        Header: 'Destination Description',
        accessor: 'destinationDescription',
        width: '15%',
      },
      {
        Header: 'Transaction Type',
        accessor: 'method',
        width: '10%',
      },
      {
        Header: 'Balance',
        accessor: 'balance',
        width: '10%',
      },
    ],
    []
  );

  const preprocessLedgerData = (data) => {
    const uniqueData = new Map();
    data.forEach((item) => {
      uniqueData.set(item.activity_id, item);
    });
    const uniqueDataArray = Array.from(uniqueData.values());
    uniqueDataArray.sort((a, b) => new Date(a.date) - new Date(b.date));

    let runningBalance = 0;
    const dataWithCorrectedBalance = uniqueDataArray.map((transaction) => {
        runningBalance += transaction.amount;
        return {
        ...transaction,
        balance: runningBalance,
        };
    });

    const dataWithAccessors = dataWithCorrectedBalance.map((transaction) => {
        console.log(transaction);
        return {
          ...transaction,
          destinationType: transaction.destination?.type,
          destinationDescription: transaction.destination?.description,
          sourceType: transaction.source?.type,
          sourceDescription: transaction.source?.description,
        };
      });

      const dataWithFormattedTypes = dataWithAccessors.map((transaction) => {
        const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        const removeUnderscores = (str) => str.replace(/_/g, ' ');
        return {
          ...transaction,
          ledgerType: capitalizeFirstLetter(transaction.type),
          sourceType: removeUnderscores(capitalizeFirstLetter(transaction.sourceType)),
          destinationType: removeUnderscores(capitalizeFirstLetter(transaction.destinationType)),
        };
      });
    
    return dataWithFormattedTypes;
  };

  const processedData = React.useMemo(() => preprocessLedgerData(ledgerData), [ledgerData]);

  return <LedgerTable data={processedData} columns={columns} />;
};

export default Ledger;