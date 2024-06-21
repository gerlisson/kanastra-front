import { useState, useEffect } from 'react';
import { useFileContext, listFiles, FileHistory } from '../components/ui/file';
import { FileUploader, CallbackFunction } from '../components/ui/file-uploader';
import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import { renderTable } from '@/components/custom/MagicTable';
enum UploadStateType {
    Started = 0,
    FilesLoad = 1,
    FilesLoaded = 2
}

const Upload = () => {
    const { state, dispatch } = useFileContext();
    const [listFilesData, setListFilesData] = useState<FileHistory[] | null>(null);
    const [uploadState, setUploadState] = useState<UploadStateType>(UploadStateType.Started);

    const updateList: CallbackFunction = () => {
        listFiles(dispatch);
        setUploadState(UploadStateType.FilesLoad);
        console.log("UploadStateType.FilesLoad")
    }

    useEffect(() => {
        if (uploadState === UploadStateType.Started) {
            updateList()
        } else if(state.fileList){
            console.log("Uploaded", state.fileList)
            setListFilesData(state.fileList)
            setUploadState(UploadStateType.FilesLoaded);
        }
    }, [uploadState, state])

    return (
        <Container component="main" sx={{ border: "black", width: "100%", alignItems: "flex-end" }} >
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-center',
                    width: "100%",
                }}
            >
                <Card >
                    <CardContent>
                        <FileUploader callBack={updateList} />
                    </CardContent>
                </Card>
            </Box>
            <Box
                sx={{
                    marginTop: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-center',
                    width: "100%",
                }}
            >
                <Card >
                    <CardContent>
                        {listFilesData && renderTable(listFilesData)}
                    </CardContent>
                </Card>

            </Box>
        </Container>
    );
};

export { Upload };
