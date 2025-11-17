class BingoSquare extends HTMLElement {
    static get observedAttributes() {
        return ['bingo-number', 'has-been-called', 'has-been-clicked'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.hasBeenCalled = false;
    }
  
    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'has-been-called') {
        this.hasBeenCalled = parseInt(newValue) ? true : false;
        this.render();
      }
    }
    
    render() {
      const number = this.getAttribute('bingo-number') || '1';
      // const hasBeenClicked = this.getAttribute('has-been-clicked') || '0';

      // const color = this.hasBeenCalled ? 'red' : 'white';
      const color = this.hasBeenClicked ? 'red' : 'white';
  
      this.shadowRoot.innerHTML = `
        <style>
          .container {
              width: 50px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: ${color};
              border-radius: 5px;
              border: 2px solid rgb(0, 0, 0);
          }
        </style>
        <div class="container"> 
         <button>
          ${number}
          </button> 
        </div>
        `;
    }
}

customElements.define('bingo-square', BingoSquare);
  