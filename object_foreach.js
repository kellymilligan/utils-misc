/*
    Replicate Array.prototype.forEach on objects
    while supporting down to Internet Explorer 9
    ---

    obj        Number      Object to iterate over
    iterator   Function    Callback to run on each "list" item

*/

export default function objectForEach (obj, iterator) {

  const keys = Object.keys(obj)
  const list = keys.map(key => (obj[key]))

  keys.forEach((key, index) => iterator(obj[key], index, list))

}
