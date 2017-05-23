/*
    Format a number value to include thousands separators (i.e. 10000 -> "10,000")
    ---
    value       Number      Value to format
    character   String      Character to inject
    ---
    Returns     String      Formatted value
*/

export function numberToThousands(

  value,

  character = ','

) {

    return value.toString().replace( /\B(?=(\d{3})+(?!\d))/g, character );
}