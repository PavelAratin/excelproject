import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isCell, shouldResize } from "./table.function";
import { TableSelection } from "./TableSelection";
import { $ } from '../../core/dom';
import { matrix } from "./table.function";
import { nextSelector } from "./TableSelection";
import * as actions from '../../redux/action';

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: "Table",
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }
  toHTML() {
    return createTable(20,this.store.getState())
  }
  prepare() {
    console.log('prepare')
  }
  init() {
    super.init();
    this.selection = new TableSelection();
    this.selectCell(this.$root.find(`[data-id="0:0"]`))

    this.$on('FORMULA INPUT', text => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
    // this.$subscribe(state => {
    //   console.log("TableState", state)
    // })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  async resizeTable(e) {
    try {
      const data = await resizeHandler(this.$root, event)
      this.$dispatch(actions.tableResize(data))
      console.log('RESIZE DATA', data)
    } catch (e) {
      console.log('RESIZE ERROR', e.message)
    }
  }


  onMousedown(e) {
    if (shouldResize(e)) {
      this.resizeTable(e)
    } else if (isCell(e)) {
      const $target = $(e.target)
      if (e.shiftKey) {
        const $cells = matrix($target, this.selection.current).map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectgroup($cells)
      } else {
        this.selectCell($target)
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
      this.selectCell($next)
      this.selection.select($next)
      this.$emit('table:select', $next)
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}