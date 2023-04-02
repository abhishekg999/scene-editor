import React, { useContext } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { ProjectContext } from '../../../contexts/ProjectContext';

const TimelineCursor = ({pos}) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const { project } = useContext(ProjectContext);


	return (


		<Box sx={{
			position: "absolute",
			top: "0",
			width: "2px",
			height: "100%",
			backgroundColor: colors.grey[200],
			zIndex: "1",
			left: `${pos*100}%`
		}}>

		</Box>
		
	);
};

export default TimelineCursor;
