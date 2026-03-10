class BingoSquare extends HTMLElement {
    static get observedAttributes() {
        return ['bingo-number', 'has-been-called', 'has-been-clicked', 'has-been-a-while'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.hasBeenCalled = false;
      this.hasBeenClicked = false;
      this.hasBeenAWhile = false;
    }
  
    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'has-been-called') {
        this.hasBeenCalled = parseInt(newValue) ? true : false;
        this.render();
      }
      if (name === 'has-been-clicked') {
        this.hasBeenClicked = parseInt(newValue) ? true : false;
        this.hasBeenAWhile = false;
        this.render();
      }
      if (name === 'has-been-a-while') {
        this.hasBeenAWhile = parseInt(newValue) ? true : false;
        this.render();
      }
    }
    
    render() {
      const number = this.getAttribute('bingo-number') || '1';
      // const hasBeenClicked = this.getAttribute('has-been-clicked') || '0';

      // const color = this.hasBeenCalled ? 'red' : 'white';
      const color = this.hasBeenClicked ? 'red' : 'white';
      const fontSize = (this.getAttribute('bingo-number') === "FREE") ? "20px" : "25px";
      // console.log(this.hasBeenAWhile)
      const animation1 = (this.hasBeenAWhile && !this.hasBeenClicked) ? `animation: blinker 1s step-end infinite;` : `foo`;
      const animation2 = (this.hasBeenAWhile && !this.hasBeenClicked) ? `
                                                @keyframes blinker {
                                                      50% {
                                                        border-color: red;
                                                      }
                                                    }
                                                ` : `foo`;
  
      this.shadowRoot.innerHTML = `
        <style>
          .bingo-square-button {
              font-family: "Sofia Sans", sans-serif;
              font-optical-sizing: auto;
              font-weight: <weight>;
              font-style: normal;
              font-size: 20px; 

              width: 50px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: ${color};
              border-radius: 5px;
              border: 2px solid rgb(0, 0, 0);
              font-size: ${fontSize};
              
              border-color: black; 
              ${animation1}
          }

          ${animation2}
        </style>
        <button id="bingo-square-${number}" class="bingo-square-button"> 
          ${number}
        </button>
        `;
    }
}

customElements.define('bingo-square', BingoSquare);
  