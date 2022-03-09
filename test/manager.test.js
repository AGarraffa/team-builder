const Manager = require('../lib/manager');

describe('Manager', () => {
    it('should create a new object class that contains a name, id, email, and office as well as getName(), getId(), getemail, getRole(), and getOffice() methods', () => {

        const manager = new Manager('Joey Jo-Jo Jr Shabadoo', 42, 'JJJJS@email.com', 42);

        expect(manager.name).toEqual('Joey Jo-Jo Jr Shabadoo');
        expect(manager.id).toEqual(42);
        expect(manager.email).toEqual('JJJJS@email.com');
        expect(manager.office).toEqual(42);
        expect(manager.getName()).toEqual('Joey Jo-Jo Jr Shabadoo');
        expect(manager.getId()).toEqual(42);
        expect(manager.getEmail()).toEqual('JJJJS@email.com');
        expect(manager.getOffice()).toEqual(42);
        expect(manager.getRole()).toEqual('Manager');
    })
});