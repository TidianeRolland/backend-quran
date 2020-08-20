var Request = require("request");

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("../index");
    });
    afterAll(() => {
        server.close();
    });
    
    describe("GET Recitators /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:5000/recitators", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            const recitators = require('../public/recitators/recitators.json');
            const bd = JSON.parse(data.body);
            expect(bd).toEqual(recitators);
        });
    });
    
    describe("GET Surahs /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:5000/surahs", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            const surahs = require('../public/surahs/surahs.json');
            const bd = JSON.parse(data.body);
            expect(bd).toEqual(surahs);
        });
    });
    
    describe("GET Surahs:id /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:5000/surahs/5", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 200", () => {
            expect(data.status).toBe(200);
        });
        it("Body", () => {
            const surahs = require('../public/surahs/surahs.json');
            const surah = surahs.filter((s) => s.number === 5)[0];
            const bd = JSON.parse(data.body);
            expect(bd).toEqual(surah);
        });
    });
    
    describe("GET Surahs:117 should fail /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:5000/surahs/117", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 404", () => {
            expect(data.status).toBe(404);
        });
        it("Body", () => {
            const bd = JSON.parse(data.body);
            expect(bd).toEqual({"code": "NotFound","message": "Surah not Found"});
        });
    });
    
    describe("GET Surahs:aff should fail /", () => {
        var data = {};
        beforeAll((done) => {
            Request.get("http://localhost:5000/surahs/aff", (error, response, body) => {
                data.status = response.statusCode;
                data.body = body;
                done();
            });
        });
        it("Status 404", () => {
            expect(data.status).toBe(404);
        });
        it("Body", () => {
            const bd = JSON.parse(data.body);
            expect(bd).toEqual({"code": "NotFound","message": "Surah not Found"});
        });
    });


});