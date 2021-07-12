import { TableHead ,TableRow, Table, TableBody, TableContainer, Button } from '@material-ui/core';
import { SyncOutlined } from '@material-ui/icons';
import { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import { refreshAgentMetrics } from '../../redux/action/metrics';
import { timeDifferenceString } from '../../utilities/date';
import DataState from '../../utilities/dataState';

import PagePaperComponent from '../../components/styled-components/page-paper';
import StyledTableCell from '../../components/styled-components/table-cell';
import TableCollapseRow from '../../components/agent-status-table-row/agent-status-table-row';

import styles from './agents.module.sass';

class AgentsPage extends Component {

    constructor(props) {
        super(props);

        this.trigRefreshMetrics = this.trigRefreshMetrics.bind(this);
    }

    componentDidMount(){
        this.props.refreshAgents();
    }

    trigRefreshMetrics() {
        this.props.refreshAgents();
    }

    render() {
        return(
            <PagePaperComponent
                header="Agent Status"
                headerButton={<Button
                    variant="contained"
                    color="primary"
                    startIcon={<SyncOutlined />}
                    onClick={this.trigRefreshMetrics}
                >Refresh</Button>}
            >
                <Fragment>
                    {
                        this.props.agentDataState === DataState.LOADING && <div className={styles.loader}>
                            <BeatLoader color="#86bc25"></BeatLoader>
                        </div>
                    }
                    {
                        this.props.agentDataState === DataState.OK && 
                        <div className={styles.table}>
                            <TableContainer>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell />
                                            {
                                                this.props.agentsMeta.map((col) => <StyledTableCell>{col.label}</StyledTableCell>)
                                            }
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            this.props.agents
                                                .map((agent) => {
                                                    return {...agent, lastUpdatedAt: timeDifferenceString(new Date(agent.lastUpdatedAt), new Date())}
                                                })
                                                .map((agent) => 
                                                    <TableCollapseRow columns={this.props.agentsMeta.map(col => col.field)} data={agent} />
                                                )
                                        }
                                    </TableBody>   
                                </Table>
                            </TableContainer>
                        </div>
                    }
                </Fragment>
            </PagePaperComponent>
        )
    }
}


const mapStateToProps = (state) => ({
    agents: state.metrics.agents.map((agent) => ({...agent, fullName: `${agent.lastName}, ${agent.firstName}`})),
    agentDataState: state.metrics.agentsState,
    agentsMeta: state.metadata.agentMeta
})

const mapActionToProps = (dispatch) => ({
    refreshAgents: () => dispatch(refreshAgentMetrics())
})

export default connect(mapStateToProps, mapActionToProps)(AgentsPage);