export function shouldResize(e){
  return e.target.dataset.resize
}

export function isCell(e) {
  return e.target.dataset.type === 'cell'
}