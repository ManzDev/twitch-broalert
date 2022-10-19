import { chooseUser, getUserInfo } from "../modules/chooseUser.js";
import "./AvatarPicture.js";

// const image = "https://static-cdn.jtvnw.net/jtv_user_pictures/9002b248-0ce0-48c3-8d63-f5c1ac4c2ff4-profile_image-300x300.png";
const image = "https://static-cdn.jtvnw.net/jtv_user_pictures/0f28ea98-184e-41e1-8216-205ba15a3c92-profile_image-300x300.png";
const audio = new Audio("sounds/subparty.mp3");

class SubnameAlert extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return /* css */`
      :host {
        position: relative;
      }

      .container {
        width: 100%;
        position: relative;
      }

      .card {
        width: 250px;
        height: 388px;
        background: #333;
        border-radius: 20px;
        justify-self: start;
        display: none;
      }

      .grid {
        display: grid;
        grid-template-columns: 1fr 600px;
        width: 100%;
        position: absolute;
        z-index: 5;
        place-items: center;
        place-content: center;
      }

      .band {
        width: 105vw;
        height: 300px;
        background-image:
          url("images/back.png"),
          linear-gradient(black 0%, darkred 20% 90%, black 100%);
        background-size: 125px, auto;
        background-blend-mode: multiply;
        -webkit-mask-image: url(images/mask.png);
        -webkit-mask-size: 520px 680px;
        -webkit-mask-position: 0 -180px;
        transform: translate(-50px, 195px) rotate(-5deg);
        position: absolute;
        z-index: 2;

        clip-path: inset(45% 100% 45% 0);
        animation: open-band 1s ease-in-out 1 normal forwards 2s;
      }

      .off {
        display: none;
      }

      @keyframes open-band {
        50% {
          clip-path: inset(45% 0 45% 0);
        }

        100% {
          clip-path: inset(0 0 0 0);
        }
      }
    `;
  }

  startMusic() {
    audio.play();
  }

  async connectedCallback() {
    const user = await chooseUser();
    const data = await getUserInfo(user);
    this.name = data.name;
    this.image = data.picture.replace("70x70", "300x300");

    document.body.addEventListener("click", () => {
      this.render();
      this.startMusic();
      const avatarPicture = document.createElement("avatar-picture");
      avatarPicture.setAttribute("name", this.name);
      avatarPicture.setAttribute("subtext", "2 meses de suscripción");
      avatarPicture.setAttribute("image", this.image);
      this.shadowRoot.querySelector(".grid").insertAdjacentElement("afterbegin", avatarPicture);
      avatarPicture.show();
    });
  }

  render() {
    this.shadowRoot.innerHTML = /* html */`
    <style>${SubnameAlert.styles}</style>
    <div class="container">
      <div class="grid">
        <div class="card"></div>
      </div>
      <div class="band"></div>
    </div>`;
  }
}

customElements.define("subname-alert", SubnameAlert);
