const _ = require("lodash")
const { v4: uuidv4 } = require('uuid')
const { getCurrentMappingIds, getCurrentMappings, storeMappings } = require("./mappingRepository")

const DEFAULT_NEW_MAPPINGS_IN_BULK = 12
const MAPPINGS_MAX_DELAY_SECONDS = 4

const tools = [
    "Kool",
    "Sage",
    "File"
]

const generateRandomString = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const generateTool = () => {
    return _.sample(tools)
}

const generateCodeFromTool = () => {
    return generateRandomString(6)
}

const generateDescription = () => {
    return generateRandomString(20)
}

const generateMapping = () => {
    return {
        id: uuidv4(),
        tool: generateTool(),
        codeFromTool: generateCodeFromTool(),
        description: generateDescription()
    }
}

const generateMappings = () => {
    const bulkAmount = _.random(1, DEFAULT_NEW_MAPPINGS_IN_BULK)
    const mappingsBulk = Array.from({ length: bulkAmount }, () => generateMapping())

    storeMappings(mappingsBulk)
}

setInterval(generateMappings, MAPPINGS_MAX_DELAY_SECONDS * 1000)

const getMappings = () => {
    return getCurrentMappings()
}

const getMappingIds = () => {
    return getCurrentMappingIds()
}

module.exports.getMappingsWithUnknownCodes = getMappings
module.exports.getMappingsWithUnknownCodeIds = getMappingIds
