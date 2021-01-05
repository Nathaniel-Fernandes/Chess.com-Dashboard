import React from 'react'
import { Histogram, withParentSize } from '@data-ui/histogram'

const ResponsiveHistogram = withParentSize(({width, height, ...rest}) => {

    return (
      <Histogram
        width={width}
        height={height}
        {...rest}
      />
    );
    
});

ResponsiveHistogram.whyDidYouRender = true

export default ResponsiveHistogram;