import { render } from 'solid-js/web';
import './index.css';
import { App } from './App';

const root = document.getElementById('root');

// Checks if the root element exists before rendering (a TypeScript best practice)
if (root) {
    render(() => <App />, root);
}
