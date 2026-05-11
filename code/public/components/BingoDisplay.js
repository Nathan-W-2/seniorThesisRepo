class BingoDisplay extends HTMLElement {
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
      console.log("test")
      const rowStrs = [
        'B 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15',
        'I 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30', 
        'N 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45', 
        'G 46 47 48 49 50 51 52 53 54 55 56 57 58 59 60', 
        'O 61 62 63 64 65 66 67 68 69 70 71 72 73 74 75' 
      ]

      let tableData = ""
      rowStrs.forEach(rowStr => { 
        const row = rowStr.split(" ")
        tableData += `<tr>`
        row.forEach(num => { 
          if (isNaN(num)) {
            tableData += `<th class="card-letters">${num}</th>`
          } else {
            tableData += `
            <td>
              <display-square class="test"
                bingo-number="${num}" 
                has-been-called="0"
                has-been-clicked="0"
                has-been-a-while="0"
                extra-padding="${num % 15 === 1 ? '1' : '0'}">
                </display-square>
            </td>
            `
          }
        }); 
        
      }); 
      tableData += `</tr>`
      // console.log(tableData)
  
      this.shadowRoot.innerHTML = `
      <style>
        :host {
          padding: 10px 5px;
        }
        .card-letters {
            text-align: center;
            margin: 20px; 
        }
        td {
          padding: 3px;
        }
        th {
          font-family: "Gemunu Libre", sans-serif;
          font-optical-sizing: auto;
          font-weight: 700;
          font-style: normal;
          font-size: 40px; 
          color: red;
          background-color: white;
          border: 0 !important; 
          padding: 0px 10px;
        }
        table {
          background-color: black;
          border-collapse: collapse;
        }
      </style>
      <table>
            ${tableData}
      </table>
        `;
  }
}

customElements.define('bingo-display', BingoDisplay);
  