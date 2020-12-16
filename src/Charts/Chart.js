import React from 'react'

const Chart = (props) => {
    const styles = {height:'400px', width: '700px'}

    return (
        <div style={styles}>
            {props.children}
        </div>
    )
}

export default Chart;