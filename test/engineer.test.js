const Engineer = require('../lib/engineer');

describe('Engineer', () => {
    it('should create a new object class that contains a name, id, email, and github as well as getName(), getId(), getemail, getRole(), and getGithub() methods', () => {

        const engineer = new Engineer('Joey Jo-Jo Jr Shabadoo', 42, 'JJJJS@email.com', 'github');

        expect(engineer.name).toEqual('Joey Jo-Jo Jr Shabadoo');
        expect(engineer.id).toEqual(42);
        expect(engineer.email).toEqual('JJJJS@email.com');
        expect(engineer.github).toEqual('github');
        expect(engineer.getName()).toEqual('Joey Jo-Jo Jr Shabadoo');
        expect(engineer.getId()).toEqual(42);
        expect(engineer.getEmail()).toEqual('JJJJS@email.com');
        expect(engineer.getGithub()).toEqual('github');
        expect(engineer.getRole()).toEqual('Engineer');
    })
});