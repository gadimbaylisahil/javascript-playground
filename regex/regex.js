let re;
re = /hello/;
re = /hello/i; // case insensitive
re = /hello/g; // Global search for all instances, not the first one

console.log(re.source);

// exec() - return result in an array or null
const result = re.exec('mathing text to test');

// result.index result[0]

// result.input gives you search string

// test(); returns true or false
const result = re.test('some matching text');

// match(); other way around
const str = 'hello there';
const result = str.match(re);

// search(); index of first match if not found returns -1
const str = 'Hello there';
const restult = str.search(re);

// place(); returns new string with some or all matches of a pattern
const str = 'Hello there';
const result = str.replace(re, 'text to replace');

