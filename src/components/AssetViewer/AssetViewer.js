import { Box, useTheme, Grid } from "@mui/material";
import { tokens } from "../../theme";
import { ImageAsset } from "../ImageAsset/ImageAsset";
import styled from "@emotion/styled";


const AssetViewer = ({ images }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	return (
		<Box sx={{
			display: 'flex',
			flexGrow: 1,
			flexDirection: 'column',
			background: "transparent",
			padding: "20px",
		}}>

			<Grid container spacing={5}>
				{images.map((name_image, index) => (
					<Grid item key={index}>
						<ImageAsset image={name_image[1]} name={name_image[0]}/>
					</Grid>
				))}
			</Grid>


		</Box>
	)
}

export default AssetViewer;
