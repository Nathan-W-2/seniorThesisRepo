class AuthBoxLogout extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.username = null;
    }

    static get observedAttributes() {
        return ['username'];
    }

    attributeChangedCallback(name, oldVal, newVal) {
        if (name === 'username') {
            this.username = newVal;
            this.render();
        }
    }

    connectedCallback() {
        this.render();
    }

    render() {
        let authElement;
        if(this.username) {
            authElement = `
            <p class="">You are signed in as <strong>${this.username}</strong>. To use a different account, logout.</p>
            <button onClick="window.location.reload();" id="logoutButton" class="">Logout</button>`;
            console.log(authElement)
        } else {
            authElement = `
                <p class="card-title">Login</p>
                <form>
                    <label>Username</label>
                    <input id="loginUserName" type="text" name="username" required />
                    
                    <label>Password</label>
                    <input id="loginUserPassword" type="password" name="password" required />

                    <button id="loginButton" class="btn btn-primary" type="submit">Login</button>
                </form>

                <hr />

                <p class="card-title">Register</p>
                <form>
                    <label>New Username</label>
                    <input id="registerUserName" type="text" name="username" required />

                    <label>New Password</label>
                    <input id="registerUserPassword"type="password" name="password" required />
                    
                    <button id="register" class="" type="submit">Register</button>
                </form>
            `;
        }

        this.shadowRoot.innerHTML = `
            <style>
                .card {
                    border: 1px solid #ccc;
                    padding: 1rem;
                    border-radius: 8px;
                    margin-bottom: 1rem;
                }

                .card-title {
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                }

                input, button {
                    width: 100%;
                    padding: 0.5rem;
                    box-sizing: border-box;
                }

                hr {
                    margin: 1rem 0;
                }
            </style>
  
            <div class="card">
                <div>
                    ${authElement}
                </div>
            </div>
        `;

        if(this.username) {
            this.shadowRoot.getElementById('logoutButton').addEventListener('click', (event) => {
                event.preventDefault();

                this.dispatchEvent(new CustomEvent('logout', {
                    bubbles: true,
                    composed: true
                }));
            });
        } else {
            // this.shadowRoot.getElementById('loginButton').addEventListener('click', (event) => {
            //     event.preventDefault();

            //     const username = this.shadowRoot.getElementById('loginUserName').value;
            //     const password = this.shadowRoot.getElementById('loginUserPassword').value;

            //     this.dispatchEvent(new CustomEvent('login', {
            //         detail: { username, password },
            //         bubbles: true,
            //         composed: true
            //     }));
            // });

            // this.shadowRoot.getElementById('register').addEventListener('click', (event) => {
            //     event.preventDefault();
                
            //     const username = this.shadowRoot.getElementById('registerUserName').value;
            //     const password = this.shadowRoot.getElementById('registerUserPassword').value;

            //     this.dispatchEvent(new CustomEvent('register', {
            //         detail: { username, password },
            //         bubbles: true,
            //         composed: true
            //     }));
            // });
        }
    }
}

customElements.define('auth-box-logout', AuthBoxLogout);
