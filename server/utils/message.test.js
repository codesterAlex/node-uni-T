var expect = require('expect');

var {generateMessage} = require('./message');



describe('generateMessage',()=>{
    it('should generate correct message object', ()=>{
      var from = 'codester';
      var text = 'this is me codester, whats your position';
      var genMessage = generateMessage(from,text);

      expect(genMessage.createdAt).toBeA('number');
      expect(genMessage).toInclude({from,text});
    })
})
