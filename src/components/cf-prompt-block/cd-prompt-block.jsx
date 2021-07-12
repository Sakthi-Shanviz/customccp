import { Box, Button, Card, CardHeader, CardContent, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, TextField, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core';
import { SendOutlined } from '@material-ui/icons';
import { Component } from 'react';
import { connect } from 'react-redux';
import equal from 'deep-equal';

import { updateContactFlowBlock } from '../../redux/action/contactFlows';

import styles from './cd-prompt-block.module.sass';

class CFPromptBlock extends Component {

    constructor(props) {
        super(props);
        const { type, value, dynamic } = this.props;
        this.state = {type, dynamic, value, dirty: false};

        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateBlock = this.updateBlock.bind(this);
    }

    handleInputChange({target}) {
        this.setState({
            [target.name]: target.value,
            dirty: true
        }, () => {
            const currentState = { type: this.state.type, value: this.state.value, dynamic: this.state.dynamic };
            let { type, value, dynamic } = this.props;
            const original = { type, value, dynamic };
            if(equal(original, currentState)){
                this.setState({
                    dirty: false
                });
            }
        })
    }

    updateBlock(e) {
        e.preventDefault();
        let connectPromptName = null;
        if(this.state.type == 'PromptId' && this.state.dynamic == 'false') {
            connectPromptName = this.props.connectPrompts.find((connectPrompt) => connectPrompt.arn == this.state.value).name;
        }
        this.props.updateContactFlowBlock(this.props.contactFlowId, this.props.blockId, this.state.type, this.state.value, this.state.dynamic == 'true', connectPromptName);
    }

    render() {
        return(
            <Card className={styles.root} elevation={1}>
                <Box className={styles.header}>
                    <Typography variant="h6">{this.props.blockTypeLabel[this.props.blockType]}</Typography>
                </Box>
                <Box className={styles.body}>
                    <form noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                {
                                    this.state.type == 'PromptId' && <FormHelperText className={styles.audioAlert}>An Audio has been currently used</FormHelperText>
                                }
                                <div className={styles.formRow}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" className={styles.FormLabel}>Type</FormLabel>
                                        <RadioGroup row name="type" value={this.state.type} onChange={this.handleInputChange}>
                                            {/* <FormControlLabel value="PromptId" control={<Radio color="primary" size="small" />} label="Prompt" /> */}
                                            <FormControlLabel value="Text" control={<Radio color="primary" size="small" />} label="Text" />
                                            <FormControlLabel value="SSML" control={<Radio color="primary" size="small" />} label="SSML (Speech Synthesis Markup Language)" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                {/* <div className={styles.formRow}>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend" className={styles.FormLabel}>Dynamic</FormLabel>
                                        <RadioGroup row name="dynamic" value={this.state.dynamic} onChange={this.handleInputChange}>
                                            <FormControlLabel value="true" control={<Radio color="primary" size="small" />} label="Yes" />
                                            <FormControlLabel value="false" control={<Radio color="primary" size="small" />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div> */}
                                <Button
                                    onClick={this.updateBlock}
                                    className={styles.submitButton}
                                    variant="contained"
                                    color="primary"
                                    disabled={!this.state.dirty}
                                    startIcon={<SendOutlined />}
                                >Update</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <TextField
                                    label="Current Value"
                                    multiline fullWidth
                                    rows={6}
                                    value={this.props.value}
                                    disabled
                                />
                            </Grid>
                            <Grid item xs={4}>
                                {
                                    // !(this.state.type == 'PromptId' && this.state.dynamic == 'false') &&
                                    <TextField
                                        label="Value"
                                        multiline fullWidth
                                        rows={6}
                                        value={this.state.value}
                                        name="value"
                                        onChange={this.handleInputChange}
                                    />
                                }
                                {/* {
                                    (this.state.type == 'PromptId' && this.state.dynamic == 'false') && <FormControl fullWidth>
                                        <InputLabel>Prompts</InputLabel>
                                        <Select name="value" onChange={this.handleInputChange}>
                                            {
                                                this.props.connectPrompts.map((connectPrompt) => <MenuItem value={connectPrompt.arn}>{connectPrompt.name}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                } */}
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Card>
        )
    }
}

const connectStateToProps = (state) => ({
    connectPrompts: state.connectPrompts.list,
    blockTypeLabel: state.metadata.contactFlows.blockTypeLabel
});

const connectDispatchToProps = (dispatch) => ({
    updateContactFlowBlock: (contactFlowId, blockId, type, value, dynamic, connectPromptName) => dispatch(updateContactFlowBlock(contactFlowId, blockId, type, value, dynamic, connectPromptName))
})

export default connect(connectStateToProps, connectDispatchToProps)(CFPromptBlock);