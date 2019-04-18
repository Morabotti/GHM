// @flow

export const getMapPrefix = (map: string) => {
  switch(map) {
    case 'de_dust2':
      return [540, 715]
    case 'de_train':
      return [507, 484]
    case 'de_mirage':
      return [621, 320]
    case 'de_vertigo':
      return [0, 0]
    case 'de_cache':
      return [333, 565]
    case 'de_overpass':
      return [910, 317]
    case 'de_cbble':
      return [0, 0]
    case 'de_nuke':
      return [475, 393]
    default:
      return [0, 0]
  }
}

export const getMapScale = (map: string) => {
  switch(map) {
    case 'de_dust2':
      return [0.2256, -0.2256]
    case 'de_train':
      return [0.2092, -0.2070]
    case 'de_mirage':
      return [0.1949, -0.1990]
    case 'de_vertigo':
      return [0, 0]
    case 'de_cache':
      return [0.1835, -0.1800]
    case 'de_overpass':
      return [0.1926, -0.1902]
    case 'de_cbble':
      return [0, 0]
    case 'de_nuke':
      return [0.1386, -0.1386]
    default:
      return [0, 0]
  }
}