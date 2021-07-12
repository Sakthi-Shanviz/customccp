import { AppBar, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { Component } from 'react';

import styles from './app-header.module.sass';

class AppHeader extends Component {

    constructor(props) {
        super(props);

        this.theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#008080'
                }
            }
        })
    }

    render() {
        return(
            <ThemeProvider theme={this.theme}>
                <AppBar>
                    <Toolbar>
                        <img className={styles.logo} src="image/hnfs.png" alt="Health Net Logo" />
                        <Typography className={styles.headerText} variant="h6">Health Net Federal Services</Typography>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        )
    }
}

export default AppHeader;