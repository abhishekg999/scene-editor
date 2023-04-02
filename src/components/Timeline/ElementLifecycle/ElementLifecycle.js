import React, { useContext, useEffect } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { ProjectContext } from '../../../contexts/ProjectContext';
import { ImageElement } from '../../../scene';
import { inspect } from 'util';


const ElementLifecycle = ({ element }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const { project, setProject } = useContext(ProjectContext);

	console.log(element);
	return (
		<Box sx={{
			display: 'flex',
			width: '100%',
			height: '60px',
			background: `${colors.grey[300]}`,
			margin: '10px 0px',
			overflow: 'none',
		}}>
			<Box
				sx={{
					display: 'flex',
					width: '100%',
					height: '100%',
					backgroundImage: `url(${element.src})`,
					backgroundSize: 'auto 90%',
					backgroundRepeat: 'repeat-x',
					overflow: 'auto',
					margin: '1px 1px',
				}}
			>
			</Box >
		</Box>

	);
};

export default ElementLifecycle;
