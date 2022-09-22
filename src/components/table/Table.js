import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isCell, shouldResize } from "./table.function";
import { TableSelection } from "./TableSelection";
import { $ } from '../../core/dom';
import { matrix } from "./table.function";
import { nextSelector } from "./TableSelection";

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ['mousedown', 'keydown'],
      ...options
    })
  }
  toHTML() {
    return createTable(20)
  }
  prepare() {
    console.log('prepare')
  }
  init() {
    super.init();
    this.selection = new TableSelection();
    const $cell = this.$root.find(`[data-id="0:0"]`)
    this.selection.select($cell)
    this.emitter.subscribe('it is working',text =>{
      this.selection.current.text(text)
      console.log('table from formula',text)
    })
  }


  onMousedown(e) {
    if (shouldResize(e)) {
      resizeHandler(this.$root, e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectgroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
  onKeydown(e) {
    const keys = ['Enter', "Tab", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]
    const { key } = e
    if (keys.includes(key) && !e.shiftKey) {
      e.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id));
      this.selection.select($next)
    }
  }
}