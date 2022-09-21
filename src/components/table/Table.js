import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isCell, shouldResize } from "./table.function";
import { TableSelection } from "./TableSelection";
import {$} from '../../core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown']
    })
  }
  toHTML() {
    return createTable(20)
  }
  prepare(){
    console.log('prepare')
  }
  init(){
    super.init();
    this.selection = new TableSelection();
    const $cell = this.$root.find(`[data-id="0:0"]`)
    this.selection.select($cell)
  }


  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root,e)      
    }else if(isCell(e)){
      const $target = $(e.target)
      this.selection.select($target)
    }
  }

}