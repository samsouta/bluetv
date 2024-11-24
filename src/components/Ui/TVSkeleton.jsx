import React from 'react'
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';


const TVSkeleton = () => {
  return (
    <Box sx={{ width: '100%', marginRight: 0.5,bgcolor: '#6b8784' }}>
      <Skeleton animation="wave" variant="rectangular" width={'100%'} height={"250px"} />
      <Box sx={{ pt: 0.5 }}>
        <Skeleton animation="wave" />
        <Skeleton animation="wave" width="60%" />
      </Box>
    </Box>

  )
}

export default TVSkeleton;