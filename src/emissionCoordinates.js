const _ = require("lodash")

/*
def generate_data_bulk(timestamp, amount = DEFAULT_BULK_PER_TIMESTAMP):
result = [generate_data_frame(timestamp) for _ in range(amount)]
return result

def generate_data_frame(timestamp):
data_window = {
    "id": uuid.uuid1(),
    "time": int(timestamp.timestamp())
}

generate_geolocation(data_window)
generate_emission(data_window)
generate_category(data_window)
generate_company(data_window)
return data_window
*/

const DEFAULT_BULK_PER_TIMESTAMP = 20

const Categories = [
    "OPERATION",
    "UPSTREAM",
    "DOWNSTREAM"
]

const companies = [
    "Company A",
    "Company B",
    "Some other company",
    "Some company",
    "Company 123"
]

const countries = [
    "France",
    "Germany",
    "Netherlands",
    "Poland",
    "Spain",
    "Italy"
]

const generateCategory = () => {
    return _.sample(Categories)
}

const generateCompany = () => {
    return _.sample(companies)
}

const generateEmissionPoint = (timestamp) => {
    const emissionPoint = {
        id: "someUUID",
        time: timestamp,
        category: generateCategory(),
        company: generateCompany()
    }

    return emissionPoint
}

const generateCoordinatesBulk = (timestamp, amount = 20) => {
    const generatedBulk = Array.from({ length: amount }, () => generateEmissionPoint(timestamp))
    return generatedBulk
}

function getSomeCoordinates() {
    const currentMoment = Date.now().timestamp
    const coordinatesBulk = generateCoordinatesBulk(currentMoment, 50)
    return {
        "ok": "coordinates2",
        "data": coordinatesBulk
    }
}

module.exports.getCoordinates = getSomeCoordinates