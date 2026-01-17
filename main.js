
class FeatureCard extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const cardTitle = this.getAttribute('card-title');

    shadow.innerHTML = `
      <style>
        .card {
          padding: 2rem;
        }
        h3 {
          font-family: 'Noto Sans KR', sans-serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--primary-color, #2c5c3b);
          margin: 0 0 1rem 0;
        }
        .content ::slotted(span) {
          font-size: 1rem;
          line-height: 1.7;
          color: #444;
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

// 스크롤 이벤트 리스너 추가 - 헤더 그림자 효과
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 20) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
