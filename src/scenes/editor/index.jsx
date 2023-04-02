import { Box, useTheme } from '@mui/material';
import { tokens } from "../../theme";
import AssetLibrary from '../asset-library';
import SceneDisplay from '../../components/SceneDisplay/SceneDisplay';
import Timeline from '../../components/Timeline/Timeline';
import { ProjectContextProvider } from '../../contexts/ProjectContext';
import { Project } from '../../Project';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

const Editor = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <ProjectContextProvider init={new Project([], 3000)}>
            <DndProvider backend={HTML5Backend}>
                <Box sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: colors.primary[800],
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        height: '50%',
                        flex: '0 0 50%',
                        borderBottom: `1px solid ${colors.grey[500]}`

                    }}>
                        <Box sx={{
                            flex: 1,
                            borderRight: `1px solid ${colors.grey[500]}`,
                            width: "40%"

                        }}>
                            <AssetLibrary />
                        </Box>

                        <Box sx={{ flex: 1, backgroundColor: colors.grey[800], }}>

                            <SceneDisplay />
                        </Box>

                    </Box>

                    <Box sx={{
                        flex: 1,
                        backgroundColor: colors.primary[700],
                        height: '50%',
                        flex: '0 0 50%',
                    }}>
                        <Timeline />
                    </Box>
                </Box>
            </DndProvider>
        </ProjectContextProvider>
    )
}

export default Editor;