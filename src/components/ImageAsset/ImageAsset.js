import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd'

function getMeta(url, cb) {
    const img = new Image();
    img.onload = () => cb(null, img);
    img.onerror = (err) => cb(err);
    img.src = url;
};

const ImageAssetStyle = {
	fontSize: 40,
	fontWeight: 'bold',
	cursor: 'move',
}
export const ImageAsset = ({ name, image }) => {
	const [metadata, setMetadata] = useState({ dimentions: [0, 0] });

	const [{ isDragging }, drag, preview] = useDrag(
		() => ({
			type: "image_asset",
			item: { image, metadata },
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
		}),
		[metadata],
	)

	useEffect(() => {
		getMeta(image, (err, img) => {
			setMetadata((prevMetadata) => {
				return { ...prevMetadata, dimentions: [img.naturalWidth, img.naturalHeight] }
			})
		});
	}, []);

	useEffect(() => {
		;
	}, [metadata])



	return (
		<>
			<DragPreviewImage sx={{
				background: "transparent"
			}} connect={preview} />
			<Box
				ref={drag}
				sx={{
					...ImageAssetStyle,
					opacity: isDragging ? 0.5 : 1,
					width: '100px',
					aspectRatio: "16/9",
					background: "transparent"
				}}
			>
				<img src={image} alt={`Image`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

				<Box sx={{
					fontSize: "12px",
					textAlign: "center"
				}}>
					{name}
				</Box>
			</Box>
		</>
	)
}
