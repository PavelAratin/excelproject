class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' 
    ? document.querySelector(selector) 
    : selector
  }
  html(html){
    if(typeof html === 'string'){
      this.$el.innerHTML = html;
      return this
    }
    return this.$el.outerHTML.trim()
  }
  clear(){
    this.html('')
    return this
  }
  append(node){
    console.log(node)
    if(Element.prototype.append){
      this.$el.append(node.$el)
    }else{
      this.$el.appendChild(node.$el)
    }
  }
}
export function $(selector) {
  return new Dom(selector)
};
$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}