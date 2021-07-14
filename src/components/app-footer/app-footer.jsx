import { Box, Typography } from '@material-ui/core';
import { Component } from 'react';
import { CopyrightOutlined } from '@material-ui/icons';

import styles from './app-footer.module.sass';

class AppFooter extends Component {

    render() {
        return(
            <Box className={styles.wrapper}>
                <CopyrightOutlined fontSize="small" />
                <Typography variant="subtitle2">Copyright Health Net Federal Services</Typography>
            </Box>
        )
    }
}

export default AppFooter;