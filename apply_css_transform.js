/*
    Apply a css transform rule to the target element
    ---

    element        obj       Element object
    transform      str       Transform string to apply

*/

export default function(element, transform) {

    element.style.mozTransform = transform;
    element.style.webkitTransform = transform;
    element.style.transform = transform;
}
