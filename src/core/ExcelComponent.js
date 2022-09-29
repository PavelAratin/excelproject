import { DomListener } from "./DomListener";

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.subscribe = options.subscribe || [];
    this.store = options.store;
    this.unsubscribes = [];
    this.prepare()
  }
  prepare() { }
  //возвращает шаблон компонента
  toHTML() {
    return ''
  }
  //уыедомляем слушателей о событии эвент
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged(){}

  isWatching(key){
    return this.subscribe.includes(key)
  }


  init() {
    this.initDomListeners()
  }

  destroy() {
    this.removeDomListeners()
    this.unsubscribes.forEach(unsub => unsub())
    // this.storeSub.unsubscribe()
  }
}