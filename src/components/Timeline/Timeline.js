import React, { useContext, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import { ProjectContext } from '../../contexts/ProjectContext';
import ElementLifecycle from './ElementLifecycle/ElementLifecycle';
import TimelineCursor from './TimelineCursor/TimelineCursor';
import { ImageElement, Keyframe } from '../../scene';
import { useDrop } from 'react-dnd';
import { inspect } from 'util';


const Timeline = () => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const { project, setProject } = useContext(ProjectContext);

	const [duration, setDuration] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [progress, setProgress] = useState(0);


	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: 'image_asset',
			canDrop: () => true,
			drop: (item, monitor) => {
				const new_asset = new ImageElement(project.scene, item.metadata.dimentions[0], item.metadata.dimentions[1], item.image);
				const k = [
					{
						top: "50%",
						left: "50%",
						opacity: 0.9,
						transform: "rotate(0deg) translate3D(-50%, -50%, 0)"
					},
					{
						top: "50%",
						left: "50%",
						opacity: 0.9,
						transform: "rotate(30deg) translate3D(-50%, -50%, 0)"
					},
					{
						top: "50%",
						left: "50%",
						opacity: 1,
						transform: "rotate(-30deg) translate3D(-50%, -50%, 0)"
					},
					{
						top: "20%",
						left: "80%",
						opacity: 1,
						transform: "rotate(180deg) translate3D(-50%, -50%, 0)"
					}
				]

				new_asset.lifecycle.addKeyFrame(new Keyframe(0, k[0]));
				new_asset.lifecycle.addKeyFrame(new Keyframe(1250, k[1]));
				new_asset.lifecycle.addKeyFrame(new Keyframe(2500, k[2]));
				new_asset.lifecycle.addKeyFrame(new Keyframe(3000, k[3]));
				new_asset.scale = (Math.random() / 3);

				project.scene.addChild(new_asset);

				setProject((prevProject) => {
					return { ...prevProject };
				});
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		})
	);

	useEffect(() => {
		if (project.remote && project.remote.animations[0]) {
			setDuration(project.remote.animations[0].effect.getTiming().duration);

			const updateProgress = () => {
				setCurrentTime(project.remote.animations[0].currentTime);
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

	return (
		<Box
			sx={{
				display: 'block',
				width: '100%',
				height: '100%',
				background: colors.redAccent[900],
				overflow: "auto",
				position: "relative"
			}}

			ref={drop}
		>

			<TimelineCursor pos={progress} />

			{project.scene.children && project.scene.children.map((e) =>
				<ElementLifecycle element={e} key={e.id} />
			)}

			<Box>
				{inspect(project)}
			</Box>

		</Box>
	);
};

export default Timeline;
