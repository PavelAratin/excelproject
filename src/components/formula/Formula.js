import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent{
  static className = 'excel__formula'
  toHTML(){
    return `
    <div class="info">
          FX
        </div>
        <div class="input" contenteditable spellcheck="false"></div>
    `;
  }
}