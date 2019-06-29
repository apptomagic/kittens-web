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

  async connectedCallback() {
    super.connectedCallback();
    if (this.topics === null) {
      console.log('fetch topics from rpc');
      this.topics = [];
      const res = await fetch('/rpc/kittens.topic.Topics/AllTopics');
      if (res.status === 200) {
        this.topics = await res.json();
        this.loading = false;
      } else {
        console.error('Failed to fetch data', res);
      }
    } else {
      this.loading = false;
    }
  }
}
customElements.define('kittens-topics-listing', TopicsListing);
