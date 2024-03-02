const MAX_MAPPINGS_IN_STORAGE = 2000
let currentMappings = []
let currentMappingIds = []

const getIds = () => {
    return [...currentMappingIds]
}

const getMappings = () => {
    return [...currentMappings]
}

const addMapping = (mapping) => {
    if (currentMappings.length > MAX_MAPPINGS_IN_STORAGE) {
        currentMappings = []
        currentMappingIds = []
    }

    currentMappings.push(mapping)
    currentMappingIds.push(mapping.id)
}

const addMappings = (mappings) => {
    mappings.forEach(mapping => addMapping(mapping))
}

module.exports.getCurrentMappings = getMappings
module.exports.getCurrentMappingIds = getIds
module.exports.storeMapping = addMapping
module.exports.storeMappings = addMappings
