import { Box, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import AssetSources from '../../components/AssetSources/AssetSources';
import AssetViewer from '../../components/AssetViewer/AssetViewer';

const AssetLibrary = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const images = [
        ['a', 'https://source.unsplash.com/random/900x700/?a'],
        ['b', 'https://source.unsplash.com/random/900x700/?b'],
        ['c', 'https://source.unsplash.com/random/900x700/?c'],
        ['d', 'https://source.unsplash.com/random/900x700/?d'],
        ['e', 'https://source.unsplash.com/random/900x700/?e'],
        ['f', 'https://source.unsplash.com/random/900x700/?f'],
        ['g', 'https://source.unsplash.com/random/900x700/?g'],
        ['h', 'https://source.unsplash.com/random/900x700/?h'],
        ['char', 'https://cdn.discordapp.com/attachments/842973413563432990/1090435603604193400/Untitled_Artwork.png'],
    ];

    return (
        <Box sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexGrow: 1,
                borderBottom: `1px solid ${colors.grey[500]}`,
                overflow: "hidden",
            }}>
       
                <AssetSources />
               
                <Box sx={{
                    overflowY: "auto",
                    background: colors.primary[500],
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <AssetViewer images={images} />
                </Box>
                
            </Box>

            <Box sx={{
                minHeight: "40px",
                display: 'flex',
                flexGrow: 0,
                flexDirection: 'row',
                background: colors.primary[500],
            }}>

            </Box>

        </Box>

    )
}

export default AssetLibrary;