const http = require('http');
let data = [];
http.createServer((req, res) => {
    if (req.method == 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            let finalData = JSON.parse(body);
            console.log(finalData);
            data.push(finalData);
            console.log(data);
            res.statusCode = 200;
            res.end('Data Inserted');
        })
    }
    if (req.method == 'GET') {
        if (req.url == '/getById') {
            let body = '';
            req.on('data', chunk => {
                body += chunk;
            });
            req.on('end', () => {
                if (body) {
                    var finalData = JSON.parse(body);
                    if (finalData.roll) {
                        let ans = data.find((el) => finalData.roll == el.roll);
                        res.end(JSON.stringify(ans));
                    }
                }
            }
            )
        }
        else {
            res.end(JSON.stringify(data));
        }
    }
    if (req.method == 'DELETE') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            let finalData = JSON.parse(body);
            let index = data.findIndex((el) => finalData.roll == el.roll);
            data.splice(index, 1)
            console.log(data)
            res.end('Data deleted');
        }
        )
    }
    if (req.method == 'PUT') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            let finalData = JSON.parse(body);
            console.log(finalData);
            let index = data.findIndex((el) => finalData.roll == el.roll);
            console.log(data[index])
            data[index] = finalData;
            console.log(data)
            res.end('Data edited');
        }
        )
    }
}).listen(3000);
