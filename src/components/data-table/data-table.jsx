import { Component, Fragment } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableCell, TableRow, TablePagination } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import styles from './data-table.module.sass';


const StyledTableCell = withStyles((theme) => ({
    head: {
        fontWeight: 'bold',
        border: '0.5px solid #f0f0f0'
    },
    body: {
        border: '0.5px solid #f0f0f0'
    }
}))(TableCell);

class DataTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rows: [...this.props.rows.slice(0, 25)],
            page: 0,
            rowsPerPageOptions: [1, 5, 10, 25],
            rowsPerPage: 25
        }

        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    handleChangeRowsPerPage(e) {
        const rowsPerPage = parseInt(e.target.value, 10)
        this.setState({
            rowsPerPage,
            rows: this.props.rows.slice(this.state.page*rowsPerPage, (this.state.page+1)*rowsPerPage)
        });
    }

    handleChangePage(e, newPage) {
        this.setState({
            page: newPage,
            rows: this.props.rows.slice(newPage*this.state.rowsPerPage, (newPage+1)*this.state.rowsPerPage)
        })
    }

    render() {
        return (
            <div className={styles.dataTable}>
                {this.props.show}
                {
                    this.props.show && 
                    <Fragment>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {
                                            Object.keys(this.state.rows[0] || {}).map(key => <StyledTableCell>{key}</StyledTableCell>)
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        this.state.rows.length === 0 && <TableRow>
                                            <StyledTableCell align="center">No Data Found</StyledTableCell>
                                        </TableRow>
                                    }
                                    {
                                        this.state.rows.map((row, i) =>
                                            <TableRow key={i}>
                                                {
                                                    Object.keys(this.state.rows[0] || {}).map((key, j) => <StyledTableCell key={j}>{row[key]}</StyledTableCell>)
                                                }
                                            </TableRow>    
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={this.state.rowsPerPageOptions}
                            component="div"
                            count={this.props.rows.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Fragment>
                }
            </div>
        )
    }


}

export default DataTable;