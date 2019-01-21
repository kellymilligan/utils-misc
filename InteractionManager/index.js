/*
  Establish the InteractionManager as a global singleton.

  The main instance can be imported as a standard module:
  import InteractionManager from 'utils/InteractionManager'

  Access to the underlying class is still available if needed:
  import { InteractionManager } from 'utils/InteractionManager'
*/

import InteractionManager from './InteractionManager'

const instance = new InteractionManager()

export { InteractionManager }
export default instance
