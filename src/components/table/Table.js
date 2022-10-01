import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./table.template";
import { resizeHandler } from "./table.resize";
import { isCell, shouldResize } from "./table.function";
import { TableSelection } from "./TableSelection";
import { $ } from '../../core/dom';
import { matrix } from "./table.function";
import { nextSelector } from "./TableSelection";
import * as actions from '../../redux/action';
import { defaultStyles } from "../../constans";

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
    return createTable(20, this.store.getState())
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init();
    this.selection = new TableSelection();
    this.selectCell(this.$root.find(`[data-id="0:0"]`))

    this.$on('FORMULA INPUT', text => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    console.log($cell.getStyles(Object.keys(defaultStyles)))
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}