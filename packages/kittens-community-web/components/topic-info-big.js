import {LitElement, html, css} from 'lit-element';

class TopicInfoBig extends LitElement {
  static get properties() {
    return {
      topic: {
        type: Object,
        converter: (value, type) => {
          if (value === '@route') {
            const topic = {
              name: location.pathname.substr(1),
              related: null,
            };
            if (location.pathname.startsWith('/topic/')) {
              topic.name = location.pathname.substr('/topic/'.length);
            }
            return topic;
          }
        },
      },
      loading: {type: Boolean, reflect: true},
    };
  }

  constructor() {
    super();
    this.topic = {name: null};
    this.loading = true;
  }

  static get styles() {
    return css`
      a:link:not(:hover),
      a:visited:not(:hover) {
        text-decoration: none;
      }
    `;
  }

  render() {
    if (this.loading) {
      return html`
        loading…
      `;
    }
    return html`
      <h2>Topic: ${this.topic.name}</h2>
      <!-- here we'll have a topic blurb area later -->
      ${this.topic.related && this.topic.related.length
        ? html`
            <ul>
              ${this.topic.related.map(
                (topic) => html`
                  <a href="/topic/${topic}">${topic}</a>
                `
              )}
            </ul>
          `
        : null}
    `;
  }

  async connectedCallback() {
    super.connectedCallback();
    if (this.topic.related === null) {
      console.log('fetch related topics from rpc');
      this.topic.related = [];
      const res = await fetch(
        `/rpc/kittens.topic.Topics/Related?name=${this.topic.name}`
      );
      this.loading = false;
      if (res.status === 200) {
        this.topic = {
          ...this.topic,
          related: await res.json(),
        };
      } else {
        console.error('Failed to fetch data', res);
      }
    }
  }
}
customElements.define('kittens-topic-info-big', TopicInfoBig);
