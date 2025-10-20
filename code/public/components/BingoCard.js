class BingoCard extends HTMLElement {
    static get observedAttributes() {
        return ['bingo-card-nums'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
      if (name === 'bingo-card-nums') {
        this.hasBeenCalled = parseInt(newValue) ? true : false;
        this.render();
      }
    }
    
    render() {
      const ballNumStr = this.getAttribute('bingo-card-nums') || '1 2 3 4 5 16 17 18 19 20 31 32 33 34 35 46 47 48 49 50 66 67 68 69 70';
      const ballNumArr = ballNumStr.split(" ")
      let tableData = ""
      for (let i = 0; i < 5; i++) {
        tableData += `<tr>`
        for (let j = 0; j < 5; j++) {
          tableData += `
          <td>
            <bingo-square class="test"
              bingo-number="${ballNumArr[i*5 + j]}" 
              has-been-called="0">
            </bingo-square>
          </td>
          `
        }
        tableData += `</tr>`
      }
  
      this.shadowRoot.innerHTML = `
      <style>
        :host {
          padding: 20px; /* Adds 20px padding on all sides */
        }
        .card-letters {
            text-align: center;
        }
      </style>
      <table>
          <thead>
              <tr>
                <th class="card-letters">B</th>
                <th class="card-letters">I</th>
                <th class="card-letters">N</th>
                <th class="card-letters">G</th>
                <th class="card-letters">O</th>
              </tr>
          </thead>
          <tbody>
            ${tableData}
          </tbody>
      </table>
        `;
  }
}

customElements.define('bingo-card', BingoCard);
  