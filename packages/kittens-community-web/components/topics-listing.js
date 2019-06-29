import {LitElement, html} from 'lit-element';

class TopicsListing extends LitElement {
  static get properties() {
    return {
      topics: {type: Array},
      loading: {type: Boolean, reflect: true},
    };
  }

  constructor() {
    super();
    this.topics = null;
    this.loading = true;
  }

  render() {
    if (this.loading) {
      return html`
        loading…
      `;
    }
    return html`
      <h2>Topics</h2>
      <ul>
        ${(this.topics || []).map(
          (topic) => html`
            <a href="/topic/${topic}">${topic}</a>
          `
        )}
      </ul>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.topics === null) {
      console.log('fetch topics from rpc');
      this.topics = [];
      setTimeout(() => {
        this.loading = false;
        this.topics = [
          'chat',
          'introductions',
          'meta',
          'roadmap',
          'bugs',
          'suggestions',
          'help',
          'dev-help',
          'announcements',
          'documentation',
          'web',
          'sandbox',
        ];
      }, 1000);
    } else {
      this.loading = false;
    }
  }
}
customElements.define('kittens-topics-listing', TopicsListing);
