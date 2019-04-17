// @flow

export const getMapPrefix = (map: string) => {
  switch(map) {
    case 'de_dust2':
      return [540, 715]
    case 'de_train':
      return [0, 0]
    case 'de_mirage':
      return [0, 0]
    case 'de_vertigo':
      return [0, 0]
    case 'de_cache':
      return [0, 0]
    case 'de_overpass':
      return [0, 0]
    case 'de_cbble':
      return [0, 0]
    case 'de_nuke':
      return [0, 0]
    default:
      return [0, 0]
  }
}

export const getMapScale = (map: string) => {
  switch(map) {
    case 'de_dust2':
      return [0.2256, -0.2256]
    case 'de_train':
      return [0, 0]
    case 'de_mirage':
      return [0, 0]
    case 'de_vertigo':
      return [0, 0]
    case 'de_cache':
      return [0, 0]
    case 'de_overpass':
      return [0, 0]
    case 'de_cbble':
      return [0, 0]
    case 'de_nuke':
      return [0, 0]
    default:
      return [0, 0]
  }
}