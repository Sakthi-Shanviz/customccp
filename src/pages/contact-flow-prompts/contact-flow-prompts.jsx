import { Button, Table, TableBody, TableContainer, TableHead, TableRow, TextField, FormControl, InputLabel, Select, Menu, FormHelperText, MenuItem, Grid } from '@material-ui/core';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DateFormat from 'dateformat';
import { Visibility } from '@material-ui/icons';
import { BeatLoader } from 'react-spinners';

import CFPromptBlock from '../../components/cf-prompt-block/cd-prompt-block';
import { fetchContactFlows, fetchContactFlowPrompts } from '../../redux/action/contactFlows';
import { fetchConnectPrompts } from '../../redux/action/connectPrompts';
import DataState from '../../utilities/dataState';
import PagePaperComponent from '../../components/styled-components/page-paper';

import styles from './contact-flow-prompts.module.sass';

class ContactFlowPromptsPage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            formIsDirty: false,
            contactFlow: null
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchContactFlowBlocks = this.fetchContactFlowBlocks.bind(this);
    }

    componentDidMount() {
        this.props.fetchContactFlows();
        this.props.fetchConnectPrompts();
    }

    handleInputChange({target}) {
        console.log(target.value)
        this.setState({
            [target.name]: target.value
        })
    }

    fetchContactFlowBlocks() {
        if(this.state.contactFlow) {
            this.props.fetchContactFlowPrompts(this.state.contactFlow);
        }
    }

    render() {
        return (
            <PagePaperComponent header="Contact Flow Prompts">
                <Fragment>
                    <form noValidate>
                        <div className={styles.formRow}>
                            {
                                this.props.contactFlowsListState !== DataState.LOADING && <FormControl
                                    error={this.state.formIsDirty && !this.state.contactFlow}
                                    className={styles.formElement}
                                    required>
                                    <InputLabel>Contact Flows</InputLabel>
                                    <Select name="contactFlow" onChange={this.handleInputChange}>
                                        {
                                            this.props.contactFlowsList.map((flow) => <MenuItem value={flow.id}>{flow.name}</MenuItem>)
                                        }
                                    </Select>
                                    {
                                        (this.state.formIsDirty && !this.state.contactFlow) &&
                                        <FormHelperText>The field is required</FormHelperText>
                                    }
                                </FormControl>
                            }
                            {
                                this.props.contactFlowsListState === DataState.OK && <Button
                                    onClick={this.fetchContactFlowBlocks}
                                    className={styles.submitButton}
                                    variant="contained"
                                    color="primary"
                                    startIcon={<Visibility />}
                                >View</Button>
                            }
                        </div>
                    </form>
                    {
                        (this.props.contactFlowsListState === DataState.LOADING || this.props.contactFlowPromptListState === DataState.LOADING) && <div className={styles.loader}>
                            <BeatLoader color="#86bc25" />
                        </div>
                    }
                    {
                        <Grid container>
                            {
                                this.props.contactFlowPromptListState == DataState.OK &&
                                this.props.contactFlowPromptList.map((_prompt) => <Grid item xs={12} className={styles.prompt}>
                                    <CFPromptBlock
                                        contactFlowId={this.state.contactFlow}
                                        blockId={_prompt.id}
                                        blockType={_prompt.blockType}
                                        type={_prompt.type}
                                        value={_prompt.value}
                                        dynamic={String(_prompt.dynamic)}
                                    />
                                </Grid>)
                            }
                        </Grid>
                    }
                    
                </Fragment>
            </PagePaperComponent>
        )
    }
}

const mapStateToProps = (state) => ({
    contactFlowsList: state.contactFlows.list,
    contactFlowsListState: state.contactFlows.listState,
    contactFlowPromptList: state.contactFlows.promptList,
    contactFlowPromptListState: state.contactFlows.promptListState

});

const mapActionToProps = (dispatch) => ({
    fetchContactFlows: () => dispatch(fetchContactFlows()),
    fetchConnectPrompts: () => dispatch(fetchConnectPrompts()),
    fetchContactFlowPrompts: (contactFlowId) => dispatch(fetchContactFlowPrompts(contactFlowId))
});

export default connect(mapStateToProps, mapActionToProps)(ContactFlowPromptsPage);