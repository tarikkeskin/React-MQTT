import Rejson from 'iorejson';

var instance = new Rejson();
instance.connect()

instance.set('foo', '.', {
  bar: {
    hello: 'world'
  }
});

const value =  instance.get('foo', '.');
console.log(value);