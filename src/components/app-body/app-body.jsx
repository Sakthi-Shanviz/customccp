import { Component } from 'react';
import { TextField,Box,makeStyles, Divider, Table, TableBody, TableHead, TableRow, Button } from "@material-ui/core"
import styles from './app-body.module.sass';
import queryString  from "query-string";
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import callRecordMenuColortheme from "./call-record-menu-color-palette";
import StyledTableCell from "../styled-components/table-cell";
import AWSApi from "../../utilities/api";

const useStyles = makeStyles({
    table: {
      minWidth: 650,      
    },
  });

class AppBody extends Component {
  
    constructor(props) {
      super(props);

      this.state = {
      };
    }

    // componentDidMount() {
    //   this.setState({
    //     data: this.props.AWSContactAttributes
    //   })
    // }  

    handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      this.setState({
        name : value
      })
    }

    setCallRecordStatus = async (status) => {
      const data = {
        "operation": status,
        "contactId": this.props.AWSContactAttributes.contactId,
        "initialContactId": this.props.AWSContactAttributes.contactId,
        "voiceRecordingTrack": status==="START" ? "ALL" : null
      }
      const response = await AWSApi.api.post("/", data);  
        
    }

    render() {
        return(
            <Box className={styles.box}>
              {/* <p>{JSON.stringify(this.state)}</p> */}
              <Table size="small" className={styles.table}>           
                <TableBody>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Caller ID</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField value={this.props.AWSContactAttributes.callerId} fullWidth className={styles.TextField} id="caller-id" variant="outlined" size="small" disabled={this.props.AWSContactAttributes.callerId ? true : false} /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} >DNIS</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField value={this.props.AWSContactAttributes.dnis} fullWidth className={styles.TextField} id="dnis" variant="outlined" size="small" disabled={true} /></StyledTableCell>            
                  </TableRow>
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>ANI</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField value={this.props.AWSContactAttributes.ani} fullWidth className={styles.TextField}  id="ani" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                    <StyledTableCell className={styles.tableCell} >Callback Memo</StyledTableCell>
                    <StyledTableCell className={styles.tableCell} ><TextField value={this.props.AWSContactAttributes.callbackMemo} fullWidth className={styles.TextField} id="callback memo" variant="outlined" size="small" disabled={true} /></StyledTableCell>
                  </TableRow>                
                  <TableRow>
                    <StyledTableCell className={styles.tableCell}>Service Name</StyledTableCell>
                    <StyledTableCell className={styles.tableCell}  colSpan="3"><TextField fullWidth className={styles.TextField} id="servicename" name="serviceId" variant="outlined" size="small" disabled={this.props.AWSContactAttributes.serviceId ? true : false} onChange={this.handleChange}/></StyledTableCell>
                  </TableRow>                
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
                    <StyledTableCell className={styles.tableCell} colSpan="3" ><TextField fullWidth className={styles.TextField} id="shortmessage" variant="outlined" size="small" disabled={true} /></StyledTableCell>
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
              <Box m={2} style={{display: "flex", justifyContent: "space-around", width: "50%"}}>
                <ThemeProvider theme={callRecordMenuColortheme.startCallRecordMenuColortheme}>
                  <Button variant="contained" color="primary" onClick={(e) => this.setCallRecordStatus("START")} disabled={this.props.AWSContactAttributes.contactId ? false : false}>Start</Button>
                </ThemeProvider>
                <ThemeProvider theme={callRecordMenuColortheme.stopCallRecordMenuColortheme}>
                  <Button variant="contained" color="primary" onClick={(e) => this.setCallRecordStatus("STOP")} disabled={this.props.AWSContactAttributes.contactId ? false : false}>Stop</Button>
                </ThemeProvider>
                <ThemeProvider theme={callRecordMenuColortheme.pauseCallRecordMenuColortheme}>
                  <Button variant="contained" color="primary" onClick={(e) => this.setCallRecordStatus("PAUSE")} disabled={this.props.AWSContactAttributes.contactId ? false : false}>Pause</Button>
                </ThemeProvider>
                <ThemeProvider theme={callRecordMenuColortheme.resumeCallRecordMenuColortheme}>
                < Button variant="contained" color="primary" onClick={(e) => this.setCallRecordStatus("RESUME")} disabled={this.props.AWSContactAttributes.contactId ? false : false}>Resume</Button>
                </ThemeProvider>
              </Box>
            </Box>
        )
    }
}

export default AppBody;