var Parser = require ('../index.js');
var assert  = require ('assert');

describe ('Parser', function () {
    describe ('parse', function () {
        it ('Should always return a fixed schema.', function () {
            let res = Parser.parse (`type sometype { }, input name { } interface something { } schema { }`);
            let schema = ['fields', 'interfaces', 'class', 'name'];
            schema.forEach ((val) => {
                res.forEach ((o) => {
                    assert (o.hasOwnProperty (val), true, `${val} was not found.`);
                });
            });
        });

        it ('Should return fixed fields schema.', function () {
            let res = Parser.parse (`type sometype { id:ID}`);
            let fieldSchema = ['identifier', 'type', 'nonNull', 'list'];
            fieldSchema.forEach ((val) => {
                res[0].fields.forEach ((field) => {
                    assert (field.hasOwnProperty (val), true, `${val} was not found in ${field}.`);
                });
            });
        });

        it ('Should ignore spaces and commas everywhere.', function () {
            let res = Parser.parse (`,,type,name  , { , id,:,[, ID,],,,!,,age,,,,,:,,,,Int, },,,,`);
            assert (res !== undefined, true, "Couldn't handle spaces.");
            let res2 = Parser.parse (`schema{id:[ID]!}`);
            assert (res2 !== undefined, true, "Couldn't handle no-spaces.");
        });

        it ('Should ignore comments.', function () {
            let res = Parser.parse (`#hi there`);
        });
    });
});