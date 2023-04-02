import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";


const AssetSources = () => {
	const theme = useTheme();
    const colors = tokens(theme.palette.mode);

	return (
			<Box sx={{
				display: 'flex',
				minWidth: "40px",
				flexGrow: 0,
				flexDirection: 'column',
				background: colors.primary[500],
				borderRight: `1px solid ${colors.grey[500]}`,
				padding: "0px 5px",
			}}>
			</Box>
	)
}

export default AssetSources;
