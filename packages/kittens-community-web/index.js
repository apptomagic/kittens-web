// Import the LitElement base class and html helper function
import {LitElement, html} from './node_modules/lit-element/lit-element.js';

// Extend the LitElement base class
class MyElement extends LitElement {
  render() {
    return html`
      <p>The list of our Community's topics goes here</p>
    `;
  }
}
// Register the new element with the browser.
customElements.define('kittens-topics-listing', MyElement);

console.log('Community UI initialized');
