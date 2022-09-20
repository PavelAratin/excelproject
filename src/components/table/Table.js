import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { $ } from '../../core/dom';

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

  onMousedown(e) {
    if (e.target.dataset.resize) {
      const $resizer = $(e.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const coords = $parent.getCoords()

      const cells =  this.$root.findAll(`[data-col="${$parent.data.col}"]`)

      document.onmousemove = e => {
        const delta = Math.floor(e.pageX - coords.right);
        const value = coords.width + delta
        $parent.$el.style.width = value + 'px';
        cells.forEach(el => el.style.width = value +'px')        
      }
      document.onmouseup = ()=>{
        document.onmousemove = null
      }
    }
  }

}