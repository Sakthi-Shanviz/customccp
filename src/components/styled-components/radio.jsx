import { withStyles, Radio } from '@material-ui/core'

const StyledRadio = withStyles({
    root: {
        color: '#86bc25',
        '&$checked': {
            color: '#86bc25'
        }
    }
})((props) => <Radio color="default" {...props}></Radio>);

export default StyledRadio;