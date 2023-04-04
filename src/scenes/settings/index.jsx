import { Box, useTheme } from '@mui/material';
import { tokens } from "../../theme";


const Settings = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box>
            Settings
        </Box>
    )
}

export default Settings;