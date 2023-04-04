import { useContext, useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { ProjectContext } from '../../contexts/ProjectContext';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AnimationPlayBar from './AnimationPlayBar/AnimationPlayBar';

const SceneController = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const { project, setProject } = useContext(ProjectContext);
	const [playState, setPlayState] = useState(project.playState);

	function handlePlayClick() {
		project.remote?.play();
		setPlayState("running");
	}

	function handlePauseClick() {
		project.remote?.pause();
		setPlayState("paused");
	}

	return (
		<>
		
			<AnimationPlayBar />
		
			
			<Box
				sx={{
					flexGrow: 0,
					display: 'flex',
					justifyContent: "center",
					alignItems: "center",
					gap: "10px",
					width: '100%',
					minHeight: '41px',
					background: colors.primary[600],
					borderTop: `1px solid ${colors.grey[500]}`
				}}
			>
				
				{playState == "running" ? (
					<IconButton onClick={handlePauseClick} disableRipple>
						<PauseCircleOutlineIcon fontSize='large' />
					</IconButton>

				) :
					<IconButton onClick={handlePlayClick} disableRipple>
						<PlayCircleOutlineIcon fontSize='large' />
					</IconButton>
				}

			</Box>
		</>
	);
};

export default SceneController;
