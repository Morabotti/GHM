import { HasMultipleLevels } from '../types'

export const getMapPrefix = (map: string): [number, number] => {
  switch (map) {
    case 'de_dust2':
      return [-2476, 3239]
    case 'de_train':
      return [-2477, 2392]
    case 'de_mirage':
      return [-3230, 1713]
    case 'de_vertigo':
      return [-3168, 1762]
    case 'de_cache':
      return [-2000, 3250]
    case 'de_overpass':
      return [-4831, 1781]
    case 'de_cbble':
      return [-3840, 3072]
    case 'de_nuke':
      return [-3453, 2887]
    default:
      return [-3000, 2000]
  }
}

export const getMapScale = (map: string): number => {
  switch (map) {
    case 'de_dust2':
      return 4.4
    case 'de_train':
      return 4.7
    case 'de_mirage':
      return 5.0
    case 'de_vertigo':
      return 4.0
    case 'de_cache':
      return 5.5
    case 'de_overpass':
      return 5.2
    case 'de_cbble':
      return 6
    case 'de_nuke':
      return 7
    default:
      return 5
  }
}

export const mapMultipleLevels = (map: string): HasMultipleLevels => {
  switch (map) {
    case 'de_vertigo':
      return {
        default: {
          max: 20000,
          min: 11700
        },
        lower: {
          max: 11700,
          min: -10000
        }
      }
    case 'de_nuke':
      return {
        default: {
          max: 10000,
          min: -495
        },
        lower: {
          max: -495,
          min: -10000
        }
      }
    default:
      return null
  }
}
