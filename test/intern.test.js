const Intern = require('../lib/intern');

describe('Intern', () => {
    it('should create a new object class that contains a name, id, email, and school as well as getName(), getId(), getemail, getRole(), and getSchool() methods', () => {

        const intern = new Intern('Joey Jo-Jo Jr Shabadoo', 42, 'JJJJS@email.com', 'school');

        expect(intern.name).toEqual('Joey Jo-Jo Jr Shabadoo');
        expect(intern.id).toEqual(42);
        expect(intern.email).toEqual('JJJJS@email.com');
        expect(intern.school).toEqual('school')
        expect(intern.getName()).toEqual('Joey Jo-Jo Jr Shabadoo');
        expect(intern.getId()).toEqual(42);
        expect(intern.getEmail()).toEqual('JJJJS@email.com');
        expect(intern.getSchool()).toEqual('school');
        expect(intern.getRole()).toEqual('Intern');
    })
});