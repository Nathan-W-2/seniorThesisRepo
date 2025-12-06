class BingoBall extends HTMLElement {
    static get observedAttributes() {
        return ['bingo-number'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.bingoNumber = 1;
    }
  
    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'bingo-number') {
        this.bingoNumber = parseInt(newValue);
        this.render();
      }
    }
    
    render() {
      const number = this.getAttribute('bingo-number') || '1';
      // const hasBeenClicked = this.getAttribute('has-been-clicked') || '0';
      
      // const color = this.hasBeenCalled ? 'red' : 'white';
      var numberStr; 
      var color;
      if (number < 16) {
        numberStr = `B${number}`;
        color = "#69c5ffff"; 
      }
      else if (number < 31) {
        numberStr = `I${number}`;
        color = "#ff5b5bff"; 
      }
      else if (number < 46) {
        numberStr = `N${number}`;
        color = "#ffffffff"; 
      }
      else if (number < 61) {
        numberStr = `G${number}`;
        color = "#72d463ff"; 
      }
      else if (number < 76) {
        numberStr = `O${number}`;
        color = "#fffa69ff"; 
      }
      else {
        numberStr = `Error${number}`;
        color = "orange"; 
      }
      
  
      this.shadowRoot.innerHTML = `
        <style>
          .bingo-ball {
              font-family: "IBM Plex Sans", sans-serif;
              font-optical-sizing: auto;
              font-weight: <weight>;
              font-style: normal;
              font-size: 20px; 

              border-radius: 50%;
              width: 50px;
              height: 50px; 
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: ${color};
              border: 2px solid rgb(0, 0, 0);
              margin: 2px; 
          }

          
        </style>
        <div class="bingo-ball"> 
          ${numberStr}
        </div>
        `;
    }
}

customElements.define('bingo-ball', BingoBall);
  