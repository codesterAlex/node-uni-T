const expect = require('expect');
const {Users} = require('./users');

describe('Users', ()=>{
  var users;

  beforeEach(() =>{
    users = new Users();
    users.users = [{
      id:'1',
      name:'Lalit',
      room:'Node Course'
    },{
      id:'2',
      name:'Ram',
      room:'React Course'
    },{
      id:'3',
      name:'Krishna',
      room:'Node Course'
    }];
  });

it('Should add new User',()=>{
  var users = new Users();
  var user = {
    id: '123',
    name:'Lalit',
    room:'Nepal'
  };
  var resUser = users.addUser(user.id, user.name, user.room);
  expect(users.users).toEqual([user]);
  });

  it('Should remove a user', ()=>{
    var userId = '1';
    var user = users.removeUser(userId);

  expect(user.id).toBe(userId);
  console.log(user);
  expect(users.users.length).toBe(2);

  });

  it('Should not remove user', ()=>{
      var userId = '99';
      var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);

  });

  it('should find user', ()=>{
    var foundUser = users.getUser('3');
    expect(foundUser.name).toEqual('Krishna');
  });

  it('should not find a user',()=>{
    var notFound = users.getUser('124');

    expect(notFound).toNotExist();
  });

  it('Should return names for node course', ()=>{
    var userList =  users.getUserList('Node Course');

    expect(userList).toEqual(["Lalit","Krishna"]);
  });

  it('Should return names for react course', ()=>{
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(["Ram"]);
  });

});
