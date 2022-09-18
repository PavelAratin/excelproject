import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent{
  static className = 'excel__formula';
  constructor($root){
    super($root,{
      name:'Formula',
      listeners:['input']
    })
  }
  toHTML(){
    return `
    <div class="info">
          FX
        </div>
        <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
  onInput(event){
    console.log('oninput formula',event)
  }

}