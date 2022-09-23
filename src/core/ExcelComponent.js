import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.unsubscribes = [];
    this.prepare()
  }
  prepare(){}
  //возвращает шаблон компонента
  toHTML() {
    return ''
  }
  //уыедомляем слушателей о событии эвент
  $emit(event,...args){
    this.emitter.emit(event,...args)
  }

  $on(event,fn){
    const unsub = this.emitter.subscribe(event,fn)
    this.unsubscribes.push(unsub)
  }

  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribes.forEach(unsub => unsub())
  }
}