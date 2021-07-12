import { Component, Fragment } from 'react';
import { TableRow, IconButton, Collapse, Box, Card, CardContent, Typography } from '@material-ui/core';
import { KeyboardArrowUp, KeyboardArrowDown, FiberManualRecord, ChevronRightOutlined, DeviceHubOutlined, PhoneForwarded, Chat, Phone } from '@material-ui/icons';

import StyledTableCell from '../styled-components/table-cell'

import styles from './agent-status-table-row.module.sass';

class TableCollapseRow extends Component {

    constructor(props){
        super(props);
        this.state = { open: false };

        this.setOpen = this.setOpen.bind(this);
    }

    setOpen(open) {
        this.setState({open})
    }

    timeDifference(date) {
        const diff = (new Date() - new Date(date))/(1000*60*60);
        return diff < 1 ? (diff*60 < 1 ? `${(diff*60*60).toFixed(0)} s` : `${(diff*60).toFixed(0)} m` ) : `${diff.toFixed(0)} h`;
    }

    camelCase(str){
        return  str.split('').map((s, i) => (i === 0 ? s.toUpperCase() : s.toLowerCase())).join('')
    }

    render() {
        return(
            <Fragment>
                <TableRow>
                    <StyledTableCell>
                        <IconButton aria-label="expand row" size="small" onClick={() => this.setOpen(!this.state.open)}>
                            {this.state.open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                        </IconButton>
                    </StyledTableCell>
                    {
                        this.props.columns.map((col) => {
                            if(col === 'status') {
                                return <StyledTableCell>
                                    <FiberManualRecord
                                        fontSize="inherit"
                                        htmlColor={{
                                            'Available': '#86bc25',
                                            'Offline': '#7d7d7d',
                                            'In Call': 'red',
                                            'After Call Work': 'red'
                                        }[this.props.data[col]] || 'orange'}
                                    />
                                    <span style={{marginLeft: '5px'}}>{this.props.data[col]}</span>
                                </StyledTableCell>;
                            } else if (col === 'lastUpdatedAt') {
                                return <StyledTableCell>{this.props.data[col]} ago</StyledTableCell>
                            } else {
                                return <StyledTableCell>{this.props.data[col]}</StyledTableCell>;
                            }
                        })
                    }
                </TableRow>
                <TableRow>
                    <StyledTableCell className={styles.collapseContainer} colSpan={this.props.columns.length + 1}>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <Box margin={1}>
                                <div className={styles.paramsContainer}>
                                    {
                                        <div className={styles.dataCard}>
                                            <div className={styles.head}>
                                                <DeviceHubOutlined />
                                                <Typography variant="body1" component="h5">Hierarchy</Typography>
                                            </div>
                                            {
                                                this.props.data.hierarchy && this.props.data.hierarchy.length > 0 &&
                                                <Box className={styles.hierarchyOrder}>
                                                    {
                                                        this.props.data.hierarchy
                                                            .map((i) => <Typography component="h6">{i}</Typography>)
                                                            .reduce((prev, curr) => <Fragment>
                                                                {prev}
                                                                <ChevronRightOutlined />
                                                                {curr}
                                                            </Fragment>)
                                                    }
                                                </Box>
                                            }
                                        </div>
                                    }{
                                        <div className={styles.dataCard}>
                                            <div className={styles.head}>
                                                <PhoneForwarded />
                                                <Typography variant="body1" component="h5">Routing Profile</Typography>
                                            </div>
                                            {
                                                this.props.data.routingProfile &&
                                                <Typography>{this.props.data.routingProfile}</Typography>
                                            }
                                        </div>
                                    }
                                </div>
                                <div className={styles.paramsContainer}>
                                    {
                                        this.props.data.contacts && this.props.data.contacts.length > 0 &&
                                        <div className={styles.dataCard}>
                                            <div className={styles.head}>
                                                <Typography component="h5">Contacts</Typography>
                                            </div>
                                            <div className={styles.contactsContainer}>
                                                {
                                                    this.props.data.contacts.map((contact) =>
                                                        <Card component="div">
                                                            <CardContent>
                                                                {
                                                                    <div className={[styles.iconText, styles.mb15p].join(' ')}>
                                                                        {
                                                                            {
                                                                                "VOICE": <Phone/>,
                                                                                "CHAT": <Chat />
                                                                            }[contact.channel] || ''
                                                                        }
                                                                        <Typography component="h5">{this.camelCase(contact.channel)}</Typography>
                                                                    </div>
                                                                }
                                                                {
                                                                    contact.channel !== "VOICE" && <div className={styles.iconText}>
                                                                        <Typography component="h5">{this.camelCase(contact.channel)}</Typography>
                                                                    </div>
                                                                }
                                                                <Typography component="p">{new Date(contact.startedAt).toLocaleTimeString()} <span className={styles.textMuted}>~ {this.timeDifference(contact.startedAt)} ago</span> </Typography>
                                                                <div className={[styles.iconText].join(' ')}>
                                                                    <FiberManualRecord
                                                                        fontSize="inherit"
                                                                        htmlColor={{
                                                                            'ENDED': 'red',
                                                                            'CONNECTED': '#86bc25',
                                                                            'CONNECTING': 'orange'
                                                                        }[contact.state]}
                                                                    />
                                                                    <Typography component="h5">{this.camelCase(contact.state)}</Typography>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    )
                                                }
                                            </div>
                                        </div> 
                                    }
                                </div>
                            </Box>
                        </Collapse>
                    </StyledTableCell>
                </TableRow>
            </Fragment>
        )
    }
}

export default TableCollapseRow;