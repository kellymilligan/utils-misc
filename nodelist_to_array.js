/*
    Convert a NodeList object into an Array
    ---

    list        NodeList      NodeList object (i.e. returned by querySelectorAll() method)

    ---
    Returns     Array         Converted list

*/

export default function(list) {

    return [].slice.call( list );
}
