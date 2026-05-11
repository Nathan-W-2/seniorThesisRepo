class DisplaySquare extends HTMLElement {
    static get observedAttributes() {
        return ['bingo-number', 'has-been-called', 'most-recent', 'extra-padding'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.hasBeenCalled = false;
      this.mostRecent = false;
      this.extraPadding = false;
    }
  
    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'has-been-called') {
        this.hasBeenCalled = parseInt(newValue) ? true : false;
        this.render();
      }
      if (name === 'most-recent') {
        this.mostRecent = parseInt(newValue) ? true : false;
        this.render();
      }
      if (name === 'extra-padding') {
        this.extraPadding = parseInt(newValue) ? true : false;
        this.render();
      }
    }
    
    render() {
      const number = this.getAttribute('bingo-number') || '1';
      // const hasBeenClicked = this.getAttribute('has-been-clicked') || '0';

      // const color = this.hasBeenCalled ? 'red' : 'white';
      const color = this.hasBeenCalled ? 'white' : 'gray';
      const padding = this.extraPadding ? 'padding: 0px 0px 0px 8px;' : '';
    
      // console.log(this.hasBeenAWhile)
      const animation1 = (this.mostRecent) ? `animation: blinker 1s step-end infinite;` : ``;
      const animation2 = (this.mostRecent) ? `
                                                @keyframes blinker {
                                                      50% {
                                                        color: gray;
                                                      }
                                                    }
                                                ` : ``;
  
      this.shadowRoot.innerHTML = `
        <style>
          .display-square {
              font-family: "Gemunu Libre", sans-serif;
              font-optical-sizing: auto;
              font-weight: <weight>;
              font-style: normal;
              font-size: 40px; 

              width: 40px;
              height: 50px;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: transparent; 
              color: ${color};
              border-radius: 5px;
              border: 2px solid rgb(0, 0, 0);
              
              border-color: black; 
              ${animation1}
              ${padding}
          }

          ${animation2}
        </style>
        <div id="bingo-square-${number}" class="display-square"> 
          ${number}
        </div>
        `;
    }
}

customElements.define('display-square', DisplaySquare);
  