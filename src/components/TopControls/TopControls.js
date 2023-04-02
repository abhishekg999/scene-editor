import React from 'react';
import { Box, Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const StyledButton = styled(Button)({
    minWidth: 0,
    minHeight: 0,
    borderRadius: 0,
    padding: "4px 10px",
    borderRight: "0px solid grey",
    fontSize: "12px",
    justifyContent: "center",
    alignItems: "center",
    '&:hover': {
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
    },
});

const TopControlsUnstyled = () => {
    return (
        <Box display="flex" alignItems="flex-start" flexShrink="0" height="0%">
            <StyledButton color="inherit" disableRipple={true}>File</StyledButton>
            <StyledButton color="inherit" disableRipple={true}>Edit</StyledButton>
            <StyledButton color="inherit" disableRipple={true}>View</StyledButton>
            <StyledButton color="inherit" disableRipple={true}>Go</StyledButton>
            <StyledButton color="inherit" disableRipple={true}>Plugins</StyledButton>
            <StyledButton color="inherit" disableRipple={true}>Help</StyledButton>
        </Box>
            
    );
}

const TopControls = styled(TopControlsUnstyled)({
    height: "0%",

});

export default TopControls;
