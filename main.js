
class FeatureCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const cardTitle = this.getAttribute('card-title');

    shadow.innerHTML = `
      <style>
        .card {
          padding: 2rem;
          height: 100%;
          box-sizing: border-box;
        }
        h3 {
          font-size: 1.5rem;
          color: var(--primary-color, #1a237e);
          margin-top: 0;
          margin-bottom: 1rem;
        }
        .content {
          font-size: 1rem;
          line-height: 1.6;
          color: var(--text-color, #333);
        }
      </style>
      <div class="card">
        <h3>${cardTitle}</h3>
        <div class="content">
          <slot name="content"></slot>
        </div>
      </div>
    `;
  }
}

customElements.define('feature-card', FeatureCard);
