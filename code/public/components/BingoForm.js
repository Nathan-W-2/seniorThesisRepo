class BingoForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    let tableForm = ""
    for (let i = 0; i < 5; i++) {
      tableForm += `<tr>`
      for (let j = 0; j < 5; j++) {
        if (i*5 + j == 12) {
          tableForm += `
        <td class="form-container">
          <input class="bingo-input" type="text" name="num12" id="num12" value="FREE">
        </td>
        `
        } else {
          tableForm += `
          <td class="form-container">
            <input class="bingo-input" type="number" name="num${i*5 + j}" id="num${i*5 + j}">
          </td>
          `
        }
      }
      tableForm += `</tr>`
    }

    this.shadowRoot.innerHTML = `
    
    <style>
      .submitButton {
          cursor: pointer;
          outline: 0;
          color: #fff;
          background-color: #0d6efd;
          border-color: #0d6efd;
          display: inline-block;
          font-weight: 400;
          line-height: 1.5;
          text-align: center;
          border: 1px solid transparent;
          padding: 6px 12px;
          font-size: 16px;
          border-radius: .25rem;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          :hover {
              color: #fff;
              background-color: #0b5ed7;
              border-color: #0a58ca;
          }
      }
      .clearButton {
          cursor: pointer;
          outline: 0;
          color: #fff;
          background-color:rgb(253, 13, 13);
          border-color:rgb(253, 13, 13);
          display: inline-block;
          font-weight: 400;
          line-height: 1.5;
          text-align: center;
          border: 1px solid transparent;
          padding: 6px 12px;
          font-size: 16px;
          border-radius: .25rem;
          transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
          :hover {
              color: #fff;
              background-color:rgb(215, 11, 11);
              border-color:rgb(202, 10, 10);
          }
      }
      .container {
          padding: 10px;
          margin: 10px;
      }
      .card-letters {
          text-align: center;
      }
      .bingo-input {
          width: 42px;
      }
      .form-container{
          width: 50px;
          height: 50px;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          border: 2px solid rgb(0, 0, 0);
      }
    </style>
    <div class="container">
      <label for="num0">Enter in bingo card:</label>
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
            ${tableForm}
          </tbody>
      </table>
      <br>
        <button class="submitButton" id="submitButton">Submit</button>
        <button class="clearButton" id="clearButton">Clear All Cards</button>
      </form>
    <form>
    </div>
    `;

    this.shadowRoot.getElementById('submitButton').addEventListener('click', async (e) => {
      e.preventDefault();
  

      const bingoCardNums = []
      for (let i = 0; i < 25; i++) {
        bingoCardNums.push(this.shadowRoot.getElementById(`num${i}`).value)
      } 
      const bingoCardStr = bingoCardNums.join(" ");
      const bingoCard = { 
        bingoCardStr
      }; 

      for (let i = 0; i < 25; i++) {
        if (i != 12) {
          this.shadowRoot.getElementById(`num${i}`).value = '';
        }
      }

      this.dispatchEvent(new CustomEvent('add-new-card', {
          detail: bingoCard,
          bubbles: true,
          composed: true
      }));
    });

    this.shadowRoot.getElementById('clearButton').addEventListener('click', (event) => {
      event.preventDefault();

      const Id = { 
        gameId: 1
      }; 

      this.dispatchEvent(new CustomEvent('clear-all-cards', {
          detail: Id,
          bubbles: true,
          composed: true
      }));
  });

  }
}
customElements.define('bingo-form', BingoForm);
