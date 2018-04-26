import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import { getMuiTheme } from 'material-ui/styles';
import { HashRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';


ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>        
                <App />        
            </MuiThemeProvider>
        </HashRouter>
    </Provider>, document.getElementById('root'));
registerServiceWorker();
