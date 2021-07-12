import { Button, Table, TableBody, TableContainer, TableHead, TableRow, TextField } from '@material-ui/core';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DateFormat from 'dateformat';
import { Visibility } from '@material-ui/icons';
import { BeatLoader } from 'react-spinners';

import { fetchAttributeReport } from '../../redux/action/metrics';
import StyledTableCell from '../../components/styled-components/table-cell';
import PagePaperComponent from '../../components/styled-components/page-paper';

import styles from './attribute-report.module.sass';

class AttributeReportPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: '',
            endDate: DateFormat(new Date(), 'yyyy-mm-dd'),
            formIsDirty: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleViewReport = this.handleViewReport.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleInputChange({target}) {
        console.log(target.value)
        this.setState({
            [target.name]: target.value
        })
    }

    handleViewReport() {
        this.validateForm();
    }

    validateForm() {
        this.setState({
            formIsDirty: true
        });
        if(this.state.startDate && this.state.endDate) {
            this.props.fetchAttributeReport(this.state.startDate, this.state.endDate);
        }
    }

    render() {
        return (
            <PagePaperComponent header="Attribute Counts">
                <Fragment>
                    <form noValidate>
                        <div className={styles.formRow}>
                            <TextField
                                name="startDate"
                                onChange={this.handleInputChange}
                                required
                                error={this.state.formIsDirty && !this.state.startDate}
                                label="Start Date"
                                type="date"
                                helperText={(this.state.formIsDirty && !this.state.startDate) ? "The field is required" : ''}
                                className={styles.startDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                name="endDate"
                                onChange={this.handleInputChange}
                                required
                                error={this.state.formIsDirty && !this.state.endDate}
                                label="End Date"
                                type="date"
                                className={styles.endDate}
                                defaultValue={this.state.endDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                helperText={(this.state.formIsDirty && !this.state.endDate) ? "The field is required" : ''}
                            />
                        </div>
                        <Button
                            onClick={this.handleViewReport}
                            className={styles.submitButton}
                            variant="contained"
                            color="primary"
                            startIcon={<Visibility />}
                        >View</Button>
                    </form>
                    {
                        this.props.dataState === 'LOADING' && <div className={styles.loader}>
                            <BeatLoader color="#86bc25" />
                        </div>
                    }
                    {
                        this.props.dataState === 'OK' &&
                        <TableContainer className={styles.tableContainer}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Attribute</StyledTableCell>
                                        {
                                            this.props.consolidatedAttrs.dateRange.map((date) => <StyledTableCell>{date}</StyledTableCell>)
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.props.attributesToBeShown.map((attr) =>
                                            <TableRow>
                                                <StyledTableCell>{attr}</StyledTableCell>
                                                {
                                                    this.props.consolidatedAttrs.data.map((attrObj) => <StyledTableCell>{attrObj[attr] || 0}</StyledTableCell>)
                                                }
                                            </TableRow>
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    }
                </Fragment>
            </PagePaperComponent>
        )
    }
}

const mapStateToProps = (state) => ({
    consolidatedAttrs: state.metrics.attributeReport,
    dataState: state.metrics.attributeReportDataState,
    attributesToBeShown: state.metadata.attributeTracing
});

const mapActionToProps = (dispatch) => ({
    fetchAttributeReport: (startDate, endDate) => dispatch(fetchAttributeReport(startDate, endDate))
});

export default connect(mapStateToProps, mapActionToProps)(AttributeReportPage);