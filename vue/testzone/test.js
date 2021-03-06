var obj = {
    foo: 'bar'
  }
  
  Object.freeze(obj)
  
  new Vue({
    el: '#app',
    data: obj
  })


  new Vue({
    data: {
      a: 1
    },
    created: function () {
      // `this` points to the vm instance
      console.log('a is: ' + this.a)
    }
  })
  // => "a is: 1"