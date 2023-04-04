import React, { useContext, useEffect, useRef, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { tokens } from '../../../theme';
import { ProjectContext } from '../../../contexts/ProjectContext';
import { Rnd } from 'react-rnd';



const ElementLifecycle = ({ element }) => {
	const theme = useTheme();
	const colors = tokens(theme.palette.mode);

	const outer = useRef(null);

	// TODO: FIX RATIO EVENT LISTENER
	const [timeToPixelRatio, setTimeToPixelRatio] = useState(0.22)

	useEffect(() => {
		//setTimeToPixelRatio((prev) => outer.current.offsetWidth / 5000);
	}, [])

	const { project, setProject } = useContext(ProjectContext);

	const [state, setState] = useState({
		width: timeToPixelRatio * element.length,
		height: 60,
		x: timeToPixelRatio * element.start,
		y: 0,
	});


	const onResizeStop = (e, direction, ref, delta, position) => {
		setState((prev) => {
			return {
				width: ref.offsetWidth,
				height: ref.offsetHeight,
				x: position.x,
				y: position.y
			}
		});
	}

	const onDragStop = (e, d) => {
		setState((prev) => {
			return { ...prev, x: d.x, y: d.y }
		});
	};

	useEffect(() => {
		element.start = state.x / timeToPixelRatio;
		element.length = state.width / timeToPixelRatio;

		console.dir(state)
		console.log("IN USE EFFECT");
		console.log(element.start);
		console.log(element.length);


		setProject((prevProject) => {
			return { ...prevProject }
		})
	}, [state])

	const dragHandlers = { onDragStop: onDragStop, onResizeStop: onResizeStop };

	return (
		<Box ref={outer} sx={{
			position: "relative",
			width: "100%",
			height: "60px",
			margin: "0px 00px 20px 0px"
		}}>

			<Rnd dragAxis="x"
				position={{ x: state.x, y: state.y }}
				size={{ width: state.width, height: state.height }}
				minHeight={state.height}
				maxHeight={state.height}
				bounds="parent"
				dragHandleClassName='Rnd__mainContent'
				resizeHandleStyles={{
					left: {
						width: '8px',
						height: '100%',
						background: colors.blueAccent[700],
					},
					right: {
						width: '8px',
						height: '100%',
						background: colors.blueAccent[700],
					}
				}}
				{...dragHandlers}
				style={{
					background: colors.grey[300]
				}}

				enableResizing={{
					top: false,
					right: true,
					bottom: false,
					left: true,
					topRight: false,
					bottomRight: false,
					bottomLeft: false,
					topLeft: false
				}}

			>

				<Box className="Rnd__mainContent" sx={{
					display: 'flex',
					flexGrow: 1,
					height: '100%',
					backgroundImage: `url(${element.src})`,
					backgroundSize: 'auto 90%',
					backgroundRepeat: 'repeat-x',
					overflow: 'auto',
					padding: '5px 5px',
					borderRadius: "20x 20px 20px 20px",
				}}
				>
				</Box >

			</Rnd >

		</Box>
	);
};

export default ElementLifecycle;
