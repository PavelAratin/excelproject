export class Emmiter {
  constructor(){
    this.listeners={
    }
  }
  emit(event, ...args){
    if(!Array.isArray(this.listeners[event])){
      return false
    }
    this.listeners[event].forEach(listener =>{
      listener(...args)
    })
    return true
  }

  subscribe(event,fn){
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
    return ()=>{
      this.listeners[event] = this.listeners.filter(listener => listener !== fn)
    }
  }
}

// const emitter = new Emmiter()
// emitter.subscribe('Vladilen', data => console.log('Sub',data))
// emitter.emit('vladilen',42)
