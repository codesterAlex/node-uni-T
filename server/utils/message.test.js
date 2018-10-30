var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');



describe('generateMessage',()=>{
    it('should generate correct message object', ()=>{
      var from = 'codester';
      var text = 'this is me codester, whats your position';
      var genMessage = generateMessage(from,text);

      expect(genMessage.createdAt).toBeA('number');
      expect(genMessage).toInclude({from,text});
    });
});


describe('generateLocationMessage', ()=>{
  it('Should generate correct location Object',()=>{
    var from = "daemon";
    var latitude =1;
    var longitude = 1;
    var locationMessage = generateLocationMessage(from, latitude, longitude);

    expect(locationMessage.from).toBe(from);
    expect(locationMessage.createdAt).toBeA('number');
    expect(locationMessage.url).toBe('https://www.google.com/maps?q=1,1');
  })
});
