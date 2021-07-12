import { TableCell, withStyles } from '@material-ui/core';

export default withStyles(() => ({
    head: {
        fontWeight: 'bold',
        border: '0.5px solid #ddd',
        fontSize: '12px'
    },
    body: {
        border: '0.5px solid #ddd',
        fontSize: '12px'
    }
}))(TableCell);