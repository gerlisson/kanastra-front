import { ReactElement, useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Button, Container, ButtonGroup, Card, CardContent } from '@mui/material';
import { readData, useFileContext, DataSales, LinksResponseType } from '../components/ui/file';
import { renderTable } from "@/components/custom/MagicTable";
import { useNavigate } from "react-router-dom";

// type FileSummary = {
//   name: string;
//   size: number;
//   itemsCount: number | null;
// };


enum HomeStateType {
  Started = 0,
  FilesLoad = 1,
  FilesLoaded = 2
}

// const ItensPerPage = 5


function Home(): ReactElement {
  const { state, dispatch } = useFileContext();
  // const [filesCSV, setFilesCSV] = useState<FileSummary[]>([]);
  const [listSales, setListSales] = useState<DataSales[]>([]);
  const [homeState, setHomeState] = useState<HomeStateType>(HomeStateType.Started);
  const [tableRendered, setTableRendered] = useState<ReactElement>(<b>Loading...</b>);
  // const [page, setPage] = useState(0);
  const [pagination, setPagination] = useState<LinksResponseType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (homeState === HomeStateType.FilesLoad) {
      console.log("HomeStateType.FilesLoad")
      console.log(state)
      if (state.data?.data && (state.data && state.data?.data?.length > 0)) {
        const dataSales = state.data.data;
        console.log("Files list", dataSales)
        console.log("Array")
        setListSales(dataSales as Array<DataSales>)
        console.log(state.data.links.length)
        setPagination(state.data.links)
        setHomeState(HomeStateType.FilesLoaded);
      }
    }
  }, [state, homeState]);

  const updateList = (url: string = "") => {
    readData(dispatch, url);
    setHomeState(HomeStateType.FilesLoad);
    console.log("HomeStateType.FilesLoad")
  }

  useEffect(() => {
    if (homeState === HomeStateType.Started) updateList()
  }, [homeState, dispatch]);

  useEffect(() => {
    if (listSales && listSales.length > 0)
      setTableRendered(renderTable(listSales))
  }, [listSales, pagination])

  return (
    <>
      <Container component="main" sx={{ border: "black", width: "100%", alignItems: "flex-end" }} >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            width: "100%",
          }}
        >
          <Box>
            <Button color="info"
              variant="contained"
              onClick={() => { navigate("/upload") }}
            >Upload CSV</Button>
          </Box>
          <Box sx={{
            marginTop: 8
          }}>
            <Card >
              <CardContent>
                {tableRendered}
              </CardContent>
            </Card>
          </Box>

        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-center',
            width: "100%",
          }}
        >
          {tableRendered && <Card><CardContent><ButtonGroup>
            {pagination.map((bt, ib) => { return <Button key={ib + 'key'} color={(bt.active) ? "info" : "warning"} onClick={() => { updateList(bt.url); }} variant={"outlined"} disabled={bt.active}>{bt.label}</Button> })}
          </ButtonGroup></CardContent></Card>
          }</Box>
      </Container>
    </>
  );
}

export { Home };
