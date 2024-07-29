import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';

export default function TableUi({ data, columns, renderCellContent }) {
  const renderCell = React.useCallback(
    (data, columnKey) => {
      return renderCellContent(data, columnKey);
    },
    [renderCellContent]
  );

  console.log(data);

  return (
    <Table
      aria-label="Example with actions"
      className="w-full text-sm "
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === 'actions' ? 'center' : 'start'}
            className="bg-blue-200"
          >
            {column.title}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item) => (
          <TableRow
            key={item.id}
            className={`${item.index % 2 !== 0 ? 'bg-blue-100' : 'bg-white'} py-5`}
          >
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
