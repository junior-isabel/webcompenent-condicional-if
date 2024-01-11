

class IfElse extends HTMLElement {

  static observedAttributes = ["value", 'if-true', 'if-false']
  constructor() {
    super()
    const target = this.attachShadow({ mode: 'open' })
  }


  render() {

    var state = false;

    switch (this.getAttribute('value').toLocaleLowerCase().trim()) {

      case 'true': state = true; break;
      case 'false': state = false; break;
      case '1': state = true; break;
      case '0': state = false; break;

      default:
        throw  new Error('value invalid');
      }
      
    this.shadowRoot.innerHTML = state ? this.getAttribute('if-true') :
    this.getAttribute('if-false')
   
  }


  connectedCallback() {
    this.render();
  }
  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback(name, oldValue, newValue) {

  
    console.log(`Attribute ${name} has changed.`);
    this.render()
  }

  static get observedAttributes() {
    return ["value", 'if-true', 'if-false'];
  }



}

class Calculator extends HTMLElement {
  static observedAttributes = ["value1", 'value2', 'oper']
  constructor () {
    super();
    const target = this.attachShadow({mode: 'open'})

    const content = document.querySelector('#calculator').content

    target.appendChild(content.cloneNode(true));
  }
  
  render () {
    var result = this.calcular()

    let resultTag = this.shadowRoot.querySelectorAll('slot')[6].assignedNodes()[0]

    if (resultTag) {
      let value1tag = this.shadowRoot.querySelectorAll('slot')[0].assignedNodes()[0]?.textContent
      let value2tag = this.shadowRoot.querySelectorAll('slot')[5].assignedNodes()[0]?.textContent
    
      resultTag.innerHTML  = `<p style="font-weight: bold"> ${value1tag} 
      ${this.getAttribute('oper')} 
      ${value2tag} = 
      ${result}</p>`
      
    }
  }

  calcular () {
  
    let value1 = parseFloat(this.getAttribute('value1'))
    let value2 = parseFloat(this.getAttribute('value2'))

    let value1tag = this.shadowRoot.querySelectorAll('slot')[0].assignedNodes()[0]?.textContent
    let value2tag = this.shadowRoot.querySelectorAll('slot')[5].assignedNodes()[0]?.textContent
    
    
    
    if (value2tag) {
      value1 = parseFloat(value1tag)
      value2 = parseFloat(value2tag)
    }
   
      switch(this.getAttribute('oper')) {
        case 'add':
        case '+':  return value1 + value2
        case 'sub':
        case '-': return value1 - value2
        case 'mult':
        case '*': return value1 * value2
        case 'div':
        case '/': if (value2 === 0.0) throw 'can not divided by 0'
        return value1 / value2
        default: throw 'this is not oper ( '+ this.getAttribute('oper') +' ), operation valid +,-,*,/'
      }
  }

  connectedCallback() {

    let slots = Array.from(this.shadowRoot.querySelectorAll('slot'));
    const _this = this
    slots.forEach(slot => {
      
      slot.addEventListener('slotchange', function(e) {
        //console.log(slots[5].assignedNodes()[0]);
          let node = slot.assignedNodes();
        //  console.log(node[0].textContent);
          _this.render()
      });
    })

    this.render();
  }

  disconnectedCallback() {
    console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    console.log("Custom element moved to new page.");
  }

  attributeChangedCallback() {

    this.render();
  }


  static get observedAttributes() {
    return ["value1", 'value2', 'oper'];
  }

}

customElements.define("if-else", IfElse)
customElements.define('wc-calculator', Calculator)