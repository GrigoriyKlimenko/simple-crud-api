const parseData = (data) => {
    try {
        return JSON.parse(data)
    } catch (error) {
        throw new Error('Problem with data');
    }
} 
module.exports = parseData;