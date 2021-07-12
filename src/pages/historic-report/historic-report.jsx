import { FormControl, Grid, InputLabel, MenuItem, Paper, Typography, Select, TextField, Button, FormHelperText } from '@material-ui/core';
import { GetApp, Visibility } from '@material-ui/icons';
import { Component } from 'react';
import dateformat from 'dateformat';
import { connect } from 'react-redux';

import { fetchHistoricReport } from '../../redux/action/metrics';
import DataTable from '../../components/data-table/data-table';
import DataState from '../../utilities/dataState';

import styles from './historic-report.module.sass';
import { BeatLoader } from 'react-spinners';

class HistoricReportPage extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            metricCategory: '',
            metricType: '',
            startTime: '',
            endTime: dateformat(new Date(), 'yyyy-mm-dd"T"HH:MM'),
            formIsDirty: false,
            download: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleViewReport = this.handleViewReport.bind(this);
        this.handleDownloadReport = this.handleDownloadReport.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    handleInputChange({target}) {
        this.setState({
            [target.name]: target.value
        })
    }

    handleViewReport(e) {
        this.setState({ download: false }, () => {
            this.validateForm(e);
        });
    }

    handleDownloadReport(e) {
        this.setState({ download: true }, () => {
            this.validateForm(e);
        });
    }

    validateForm(e) {
        e.preventDefault();
        this.setState({formIsDirty: true});
        const formValid = ['metricCategory', 'metricType', 'startTime', 'endTime'].map(param => this.state[param] || false).reduce((prev, cur)=> (cur && prev), true)
        if(formValid){
            this.props.fetchReport(
                this.state.metricCategory,
                this.state.metricType,
                new Date(this.state.startTime).toISOString().substr(0, 16),
                new Date(this.state.endTime).toISOString().substr(0, 16),
                this.state.download
            );
        }
    }

    render() {
        return (
            <Grid container className={styles.container}>
                <Grid item xs={12}>
                    <Paper className={styles.paper}>
                        <Typography variant="h5" component="h5">Historic Reports</Typography>
                        <form noValidate>
                            <div className={styles.formRow}>
                                <FormControl
                                    error={this.state.formIsDirty && !this.state.metricCategory}
                                    className={styles.category}
                                    required>
                                    <InputLabel>Metrics Category</InputLabel>
                                    <Select name="metricCategory" onChange={this.handleInputChange}>
                                        {
                                            Object.keys(this.props.metadata.metricCategory).map((category) => <MenuItem value={category}>{category}</MenuItem>)
                                        }
                                    </Select>
                                    {
                                        (this.state.formIsDirty && !this.state.metricCategory) &&
                                        <FormHelperText>The field is required</FormHelperText>
                                    }
                                </FormControl>
                                <FormControl
                                    error={this.state.formIsDirty && !this.state.metricType}
                                    className={styles.type}
                                    required>
                                    <InputLabel>Metrics Type</InputLabel>
                                    <Select name="metricType" onChange={this.handleInputChange}>
                                        {
                                            (this.props.metadata.metricCategory[this.state.metricCategory] || []).map((type) => <MenuItem value={type}>{type}</MenuItem>)
                                        }
                                    </Select>
                                    {
                                        (this.state.formIsDirty && !this.state.metricType) &&
                                        <FormHelperText>The field is required</FormHelperText>
                                    }
                                </FormControl>
                            </div>
                            <div className={styles.formRow}>
                                <TextField
                                    name="startTime"
                                    onChange={this.handleInputChange}
                                    required
                                    error={this.state.formIsDirty && !this.state.startTime}
                                    label="Start Time & Date"
                                    type="datetime-local"
                                    helperText={(this.state.formIsDirty && !this.state.startTime) ? "The field is required" : ''}
                                    className={styles.startTime}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    name="endTime"
                                    onChange={this.handleInputChange}
                                    required
                                    error={this.state.formIsDirty && !this.state.endTime}
                                    label="End Time & Date"
                                    type="datetime-local"
                                    className={styles.endTime}
                                    defaultValue={this.state.endTime}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={(this.state.formIsDirty && !this.state.endTime) ? "The field is required" : ''}
                                />
                            </div>
                            <Button
                                onClick={this.handleViewReport}
                                className={styles.submitButton}
                                variant="contained"
                                color="primary"
                                startIcon={<Visibility />}
                            >View</Button>
                            <Button
                                onClick={this.handleDownloadReport}
                                className={styles.submitButton}
                                variant="contained"
                                color="primary"
                                startIcon={<GetApp />}
                            >Download</Button>
                        </form>
                        <div className={styles.tableContainer}>
                        {
                            this.props.reportDataState === DataState.LOADING &&
                            <BeatLoader color="#86bc25" />
                        }
                        {
                            (this.props.reportDataState === DataState.OK && !this.state.download) &&
                            <DataTable rows={this.props.report} show={this.props.reportDataState === DataState.OK} />
                        }
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    reportDataState: state.metrics.reportDataState,
    report: state.metrics.report,
    metadata: state.metadata.historicReport
});

const mapActionToProps = (dispatch) => ({
    fetchReport: (metricCategory, metricType, startTime, endTime, download) => dispatch(fetchHistoricReport(metricCategory, metricType, startTime, endTime, download))
})

export default connect(mapStateToProps, mapActionToProps)(HistoricReportPage);