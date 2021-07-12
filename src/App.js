import { Component } from 'react';
import 'amazon-connect-streams';
import { Provider as StoreProvider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import store from './redux/store';
import axios from 'axios';
import { setInstanceConfig, setAPIConfig, makeAppReady, setAttributeTracing } from './redux/action/metadata';

import Layout from './pages/layout/layout';
import ExternalLayout from './pages/external/external';
import { Route, Switch } from 'react-router';
import { HashRouter as Router } from 'react-router-dom';
class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
            appReady: false
        }

        this.theme = createMuiTheme({
            palette: {
                primary: {
                    main: '#86bc25',
                    contrastText: '#fff'
                }
            },
        })
    }

    componentDidMount() {
        window.localStorage.clear();
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then((stream) => { }).catch((err) => { console.error(err) });
        axios.get('/config.json')
            .then(({data}) => {
                store.dispatch(setInstanceConfig(data.connect.instance));
                store.dispatch(setAPIConfig(data.api));
                store.dispatch(setAttributeTracing(data.attributeTracing));
                store.dispatch(makeAppReady());
                this.setState({
                    appReady: true
                })
            })
    }

    render() {
        return (
            <StoreProvider store={store}>
                <ThemeProvider theme={this.theme}>
                    {
                        this.state.appReady && 
                        <Router>
                            <Switch>
                                <Route path="/external">
                                    <ExternalLayout />
                                </Route>
                                <Route path="/app">
                                    <Layout />
                                </Route>
                            </Switch>
                        </Router>
                    }
                </ThemeProvider>
            </StoreProvider>
        );
    } 
}

export default App;