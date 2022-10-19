class AvatarPicture extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .off {
        opacity: 0;
        animation: none;
      }

      .name {
        --light-color: #e99cc3;
        --dark-color: #8f2f72;
        --regular-color: #c84a9b;
        font-family: var(--font);
        font-weight: bold;
        letter-spacing: 3px;
        font-size: 142px;
        filter:
          drop-shadow(1px 1px 0 #fff)
          drop-shadow(1px -4px 0 #fff)
          drop-shadow(-3px 0px 0 #fff);
        color: var(--regular-color);
        text-shadow: 1px 1px 0 var(--light-color), 2px 2px 0 var(--light-color), 3px 3px 0 var(--light-color), 4px 4px 0 var(--dark-color), 5px 5px 0 var(--dark-color), 6px 6px 0 var(--dark-color), 7px 7px 0 var(--dark-color), 8px 8px 0 var(--dark-color), 9px 9px 0 var(--dark-color), 10px 10px 0 var(--dark-color);
        text-align: right;
        line-height: 110%;
        animation: text-focus 1s ease-in 1 forwards;
      }

      .subtext {
        font-family: var(--font);
        font-weight: bold;
        letter-spacing: 3px;
        font-size: 42px;
        color: gold;
        text-shadow: 3px 3px 0 black;
        text-align: center;
        line-height: 100%;
      }

      .avatar {
        --size: 300px;

        border-radius: 50%;
        background: #0009;
        border: 15px solid #ffd700;
        box-shadow: 10px 10px 10px 0 #0008;
        width: var(--size);
        height: var(--size);
        margin-top: 20px;

        animation: beat 0.5s ease-in-out 8s 5 backwards;
      }

      @keyframes beat {
        0, 15% { transform: scale(1.05); }
        20% { transform: scale(1); }
        35%, 40% { transform: scale(1.15); }
        75% { transform: scale(1); }
        75%, 85% { transform: scale(1.10); }
        100% { transform: scale(1); }
      }

      @keyframes text-focus {
        25% {
          transform: scale(1.15);
        }

        50% {
          transform: scale(1);
        }
      }
    `;
  }

  show() {
    const [name, subtext, avatar] = this.shadowRoot.querySelectorAll(".name, .subtext, .avatar");

    setTimeout(() => name.classList.remove("off"), 4000);
    setTimeout(() => subtext.classList.remove("off"), 6000);
    setTimeout(() => avatar.classList.remove("off"), 7900);
  }

  connectedCallback() {
    this.name = this.getAttribute("name");
    this.image = this.getAttribute("image");
    this.subtext = this.getAttribute("subtext");
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${AvatarPicture.styles}</style>
    <div class="container">
      <div class="name off">${this.name}</div>
      <div class="subtext off">${this.subtext}</div>
      <img class="avatar off" src="${this.image}" alt="${this.name}">
    </div>`;
  }
}

customElements.define("avatar-picture", AvatarPicture);
