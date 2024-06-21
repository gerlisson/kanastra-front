import { Breadcrumbs,  Container, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';

const Navigation = () => {
    const navigate = useNavigate();

    return <Container component="main" maxWidth="lg">
        <Box component="section" sx={{
            marginTop: 8,
        }}>
            <Container >
                <Breadcrumbs aria-label="breadcrumb">
                    <Button color="inherit" disabled={window.location.pathname == "/"} onClick={() => { navigate("/") }}>
                        Home
                    </Button>
                    <Button
                        color="inherit"
                        disabled={window.location.pathname == "/upload"}
                        onClick={() => { navigate("/upload") }}
                    >
                        Upload
                    </Button>
                </Breadcrumbs>
                <Box
                    sx={{ display: 'flex', alignItems: "center" }}
                >
                    <Typography gutterBottom variant="h5" component="div">
                        Sales Overview
                    </Typography>
                </Box>
            </Container>
        </Box>

    </Container>
}

export { Navigation }
