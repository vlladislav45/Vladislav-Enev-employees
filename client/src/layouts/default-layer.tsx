
import {Box, Toolbar } from '@mui/material';

type DefaultLayerProps = {
    children: React.ReactNode; // 👈️ type children
};

const DefaultLayer = (props: DefaultLayerProps) => {
  return (
    <>
      <Box sx={{ display: 'flex', flex: 'column' }}>

        <Box component='main' sx={{ flexGrow: 1 }}>
          <Toolbar />
          {props.children}
        </Box>
                
      </Box>
    </>
  );
};

export default DefaultLayer;
