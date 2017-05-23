/*
    Test whether an input value matches the pre-defined regular expression
    ---

    val        String      Value to test against the expression

    ---
    Returns    Boolean     Result of the test
*/

// Emptiness
export function isEmpty(val) {

    let regex = /([^\s])/;
    return !regex.test( val );
}
export function isNotEmpty(val) { return !isEmpty( val ); }

// Email
export function isEmail(val) {

    let regex = /[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return regex.test( val );
}
export function isNotEmail(val) { return !isEmail( val ); }

// Phone
export function isPhone(val) {

    let regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return regex.test( val );
}
export function isNotPhone(val) { return !isPhone( val ); }
