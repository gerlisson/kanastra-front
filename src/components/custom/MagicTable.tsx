import { Table, TableBody, TableHeader, TableRow, TableCell } from '../ui/table';

const renderTable = (data: any[]): React.ReactElement => {
    console.log("renderTable")
    return (
      <Table>
        <TableHeader>
          <TableRow>
            {Object.keys(data[0]).map((key) => { return <TableCell>{key}</TableCell> })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              {Object.keys(item).map((key, ki) => { return <TableCell key={ki + key + "key"}>{String(item[key])}</TableCell> })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  export {renderTable}