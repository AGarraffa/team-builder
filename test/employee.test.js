const Employee = require('../lib/employee');

describe('Employee', () => {
    it('should create a new object class that contains a name, id, email as well as getName(), getId(), getemail, getRole() methods', () => {

        const employee = new Employee('Joey Jo-Jo Jr Shabadoo', 42, 'JJJJS@email.com');

        expect(employee.name).toEqual('Joey Jo-Jo Jr Shabadoo');
        expect(employee.id).toEqual(42);
        expect(employee.email).toEqual('JJJJS@email.com');
        expect(employee.getName()).toEqual('Joey Jo-Jo Jr Shabadoo');
        expect(employee.getId()).toEqual(42);
        expect(employee.getEmail()).toEqual('JJJJS@email.com')
        expect(employee.getRole()).toEqual('Employee');

    })
});