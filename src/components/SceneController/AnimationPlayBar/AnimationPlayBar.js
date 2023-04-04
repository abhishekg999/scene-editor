import { useContext, useState, useEffect, useLayoutEffect } from 'react';
import { ProjectContext } from '../../../contexts/ProjectContext';
import { Box } from '@mui/material';

const AnimationPlayBar = () => {
	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [progress, setProgress] = useState(0);

	const { project, setProject } = useContext(ProjectContext);

	useEffect(() => {
		if (project.remote && project.remote.animations[0]) {
			setDuration(project.remote.animations[0].effect.getTiming().duration);

			const updateProgress = () => {
				setCurrentTime(project.remote.animations[0].currentTime);
				project.cursorPos = project.remote.animations[0].currentTime;
				requestAnimationFrame(updateProgress);
			};

			requestAnimationFrame(updateProgress);
		}
	}, [project]);


	useEffect(() => {
		setProgress(currentTime / duration);
	}, [currentTime, duration]);

	const handleProgressClick = (event) => {
		const dist = event.pageX - event.currentTarget.offsetLeft;
		const clickedTime = (dist / event.currentTarget.offsetWidth) * duration;
		project.remote.seek(clickedTime);
	};

	const millisecondsToDisplayTime = (ms) => {
		const minutes = Math.floor(ms / 60000);
		const seconds = Math.floor((ms % 60000) / 1000);
		const milliseconds = Math.floor(ms % 1000);

		const formattedMinutes = String(minutes).padStart(2, '0');
		const formattedSeconds = String(seconds).padStart(2, '0');
		const formattedMilliseconds = String(milliseconds).padStart(3, '0');

		return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
	}

	return (
		<Box onClick={handleProgressClick} sx={{
			textAlign: "center",
			justifyContent: "center",
			alignItems: "center"
		}}>

			<Box sx={{
				backgroundColor: "red",
				height: "16px",
				width: `${progress * 100}%`,
				fontSize: "12px"
			}}>

				{millisecondsToDisplayTime(currentTime)}

			</Box>

		</Box>
	);
}

export default AnimationPlayBar;
