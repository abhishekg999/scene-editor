import React, { useState, useEffect, useLayoutEffect, useContext, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../theme';
import SceneController from '../SceneController/SceneController';
import { ProjectContext } from '../../contexts/ProjectContext';
import { ScenePreviewBuilder } from '../../Project';
import { Keyframe, ImageElement } from '../../scene';
import _debounce from 'lodash/debounce';

function SceneImage({ src, top, left }) {
	return (
		<Box sx={{
			display: 'inline-flex',
			flexGrow: '0',
			flexShrink: '1',
			top: top,
			left: left,
			position: 'relative'
		}}>
			<img width="100px" aspectRatio="600/480" src={src} alt='' />
		</Box>
	);
}


const resizeInnerToFitOuter = (outer, inner) => {
	// Get the dimensions of the outer and inner elements
	const outerWidth = outer.clientWidth;
	const outerHeight = outer.clientHeight;
	const innerWidth = inner.offsetWidth;
	const innerHeight = inner.offsetHeight;

	// Calculate the scale factor to fit the inner element within the outer element
	let scaleFactor = Math.min(outerWidth / innerWidth, outerHeight / innerHeight);

	// Scale the inner element
	inner.style.transform = `scale(${scaleFactor})`;
	inner.style.position = "absolute";
	inner.style.margin = "0";
	inner.style.top = "";
};



const SceneDisplay = () => {
	const { project, setProject } = useContext(ProjectContext);

	const [images, setImages] = useState([]);
	const [{ isOver, canDrop }, drop] = useDrop(
		() => ({
			accept: 'image_asset',
			canDrop: () => true,
			drop: (item, monitor) => {
				// Add the dropped image to the images array
				const delta = monitor.getSourceClientOffset();
				const left = Math.round(item.left + delta.x);
				const top = Math.round(item.top + delta.y);

				setProject((prevProject) => {
					prevProject.scene.setBackgroundImage(item.image);
					return { ...prevProject };
				});


				setImages((prevImages) => [...prevImages, { src: item.image, top: top, left: left }]);
			},
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		})
	);

	const sceneContainer = useRef();

	useEffect(() => {
		;
	}, [images]);

	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	// bad :(
	useLayoutEffect(() => {
		// Access the DOM element using the reference
		const container = sceneContainer.current;

		if (!container.firstChild) {
			window.addEventListener("resize", handleResize, false);
		}
		// clear whatever is there 
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		// rebuild scene
		const [remote, element] = ScenePreviewBuilder(project.scene);
		project.remote = remote;
		project.HTMLElement = element;
		container.appendChild(element);

		resizeInnerToFitOuter(container, element);
		resizeInnerToFitOuter(container, element);
	}, [project]);

	const [dimensions, setDimensions] = useState({
		width: window.innerWidth,
		height: window.innerHeight,
	});


	const handleResize = _debounce(() => {
		setDimensions({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	}, 100);

	useEffect(() => {
		resizeInnerToFitOuter(sceneContainer.current, project.HTMLElement);
	}, [dimensions]);


	return (
		<Box sx={{
			width: '100%',
			height: '100%',
			display: 'flex',
			flexDirection: 'column',

		}}>
			<Box ref={drop} sx={{
				flexGrow: 1,
				backgroundColor: isOver && canDrop ? colors.primary[400] : colors.primary[500],
			}}>
				<Box ref={sceneContainer} sx={{
					width: "100%",
					height: "100%",
					p: "2px",
					position: "relative",
					display: "grid",
					placeItems: "center"

				}} >

				</Box>
			</Box>

			<SceneController />
		</Box>

	);
};

export default SceneDisplay;
