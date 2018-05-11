let expect = require('chai').expect;
let service = require('../../services/csvToJsonService');

describe('convert from csv string', () => {

    it('should return json', (done) => {
        let s = 'a,b,c\n1,2,3\n4,5,6';
        let expectedJsonObject = [{ a: 1, b: 2, c: 3 }, { a: 4, b: 5, c: 6 }];
        service.convertFromString(s)
            .then((result) => {
                expect(result).to.deep.equals(expectedJsonObject);
                done();
            })
            .catch(done);
    });

});
