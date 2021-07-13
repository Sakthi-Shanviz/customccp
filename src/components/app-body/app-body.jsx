import { Component } from 'react';
import { TextField,Box,makeStyles, Divider } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import styles from './app-body.module.sass';
import queryString  from "query-string";

import StyledTableCell from "../styled-components/table-cell";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });

class AppBody extends Component {
  
    constructor(props) {
      super(props);

      this.state = {
        data: {}
      };
    }

    componentDidMount() {
      const hash = window.location.hash;
      const params = hash.substring(hash.indexOf("?") +1);
      if(Object.keys(params).length > 0) {
        this.setState({
          data: queryString.parse(params)
        })
      }

    }  

    render() {
        return(
            <Box className={styles.box}>
              <Table size="small" className={styles.table}>           
                <TableBody>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Caller ID</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField value={this.state.data.ani} fullWidth className={styles.TextField} id="caller-id" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} >DNIS</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField} id="dnis" variant="outlined" size="small" disabled={true} /></StyledTableCell>            
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>ANI</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField}  id="ani" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} >Callback Memo</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField} id="callback memo" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <br />
              <Divider />
              <br />
              <Table size="small" className={styles.table}>
                <TableHead>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Service Name</StyledTableCell>
                    <StyledTableCell className={styles.tableCell}  colSpan="3"><TextField fullWidth className={styles.TextField} id="service name" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>HIPAA Verification</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField}  id="hipaaverification" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} width="140px">Beneficiary ID</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField} id="beneficiaryid" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>First Name</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField}  id="firstname" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} >Last Name</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField} id="lastname" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell colSpan="2" />
                    <StyledTableCell className={styles.tableCell} >DOB</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField} id="dob" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Short Message</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField} id="shortmessage" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Provider ID</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField}  id="providerid" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} >IVR Transaction Number</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField} id="ivrtransactionnumber" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Caller Type</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField}  id="callertype" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} >Caller Intent</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField} id="callerintent" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Bene Plan Code</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField fullWidth className={styles.TextField} id="beneplancode" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                    <StyledTableCell colSpan="2"></StyledTableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
        )
    }
}

export default AppBody;