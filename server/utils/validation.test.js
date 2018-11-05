const expect = require('expect');

const {isRealString} = require('./validation');


describe('isRealString',()=>{
  it('should reject non-string values',()=>{
    var non_string = isRealString(1122);

    expect(non_string).toBe(false);
  });

  it('should reject string with only spaces',()=>{
    var non_string = isRealString(' ');

    expect(non_string).toBe(false);
  });


  it('should allow string with non-space characters',()=>{
    var non_string = isRealString('lalit sunar');

    expect(non_string).toBe(true);
  });


});
