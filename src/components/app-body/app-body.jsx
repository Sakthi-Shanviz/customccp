import { Component } from 'react';
import { TextField,Box,makeStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import StyledTableCell from '@material-ui/core/StyledTableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './app-body.module.sass';

import StyledTableCell from "../styled-components/table-cell";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

class AppBody extends Component {    

    render() {
        return(
            <Box className={styles.box}>
              <Table size="small" className={styles.table}>           
                <TableBody>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Caller ID</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="caller-id" variant="outlined" size="small" /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right">DNIS</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="dnis" variant="outlined" size="small" /></StyledTableCell>            
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>ANI</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField}  id="ani" variant="outlined" size="small" /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right">Callback Memo</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="callback memo" variant="outlined" size="small" /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                  <StyledTableCell className={styles.tableCell}>Service Name</StyledTableCell>
                  <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="service name" variant="outlined" size="small" /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>HIPAA Verification</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField}  id="hipaaverification" variant="outlined" size="small" /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right">Beneficiary ID</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="beneficiaryid" variant="outlined" size="small" /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>First Name</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField}  id="firstname" variant="outlined" size="small" /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right">Last Name</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="lastname" variant="outlined" size="small" /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                  <StyledTableCell className={styles.tableCell}>DOB</StyledTableCell>
                  <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="dob" variant="outlined" size="small" /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                  <StyledTableCell className={styles.tableCell}>Short Message</StyledTableCell>
                  <StyledTableCell className={styles.TextField} align="right"><TextField className={styles.TextField} id="shortmessage" variant="outlined" size="small" /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Provider ID</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField}  id="providerid" variant="outlined" size="small" /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right">IVR Transaction Number</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="ivrtransactionnumber" variant="outlined" size="small" /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Caller Type</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField}  id="callertype" variant="outlined" size="small" /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right">Caller Intent</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="callerintent" variant="outlined" size="small" /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                  <StyledTableCell className={styles.tableCell}>Bene Plan Code</StyledTableCell>
                  <StyledTableCell className={styles.tableCell} align="right"><TextField className={styles.TextField} id="beneplancode" variant="outlined" size="small" /></StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
        )
    }
}

export default AppBody;