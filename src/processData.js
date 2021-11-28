function processData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        } catch (error) {
            reject(new Error('Internal server error'));
            console.log('Problem with parsing data');
        }
    });
}
module.exports = { processData };