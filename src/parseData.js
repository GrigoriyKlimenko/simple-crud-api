const parseData = (data) => {
    try {
        return JSON.parse(data)
    } catch (error) {
        console.log('Problem with parsing data');
        throw new Error('Problem with data');
    }
} 
module.exports = parseData;