import { Component } from 'react';
import { TextField,Box,makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './app-body.module.sass';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

class AppBody extends Component {    

    render() {
        return(
            <Box>
                <Table size="small">           
            <TableRow>
            <TableCell>Caller ID</TableCell>
            <TableCell align="right"><TextField className={styles.TextField} id="caller-id" label="Caller ID" variant="outlined" size="small" margin="dense" /></TableCell>
            <TableCell align="right">DNIS</TableCell>
            <TableCell align="right"><TextField className={styles.TextField} id="dnis" label="DNIS" variant="outlined" size="small" margin="dense" /></TableCell>            
            </TableRow>
            <TableRow>
            <TableCell>ANI</TableCell>
            <TableCell align="right"><TextField className={styles.TextField}  id="ani" label="ANI" variant="outlined" size="small" /></TableCell>
            <TableCell align="right">Callback Memo</TableCell>
            <TableCell align="right"><TextField className={styles.TextField} id="callback memo" label="Callback Memo" variant="outlined" size="small" /></TableCell>
          </TableRow>
          </Table> 
            </Box>
        )
    }
}

export default AppBody;