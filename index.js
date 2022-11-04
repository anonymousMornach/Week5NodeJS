const fs = require('fs');
const http = require ('http');
const path = require('path');
text = "Damn it Page not found";

const getContentType = (filePath) =>{
    switch (path.extname(filePath)) {
        case ".js":
            return "text/javascript";
            break
        case ".css":
            return "text/css";
            break;
        case ".json":
            return "application/json";
            break;
        case ".html":
            return "text/html";
            break;
            default:
            return "text/plain";
            break;
    }

}
const server = http.createServer((req, res)=>{
    //created filePath that leads to whatever route is requested
    let filePath = path.join(__dirname, req.url === ('/home')|| req.url === ('/')? 'home.html' : req.url);
    //Used to get the content type of the file
    let contentType = getContentType(filePath);
    //Reads the File and returns the content
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
                console.log(`File not found: ${err}`)
        }
        //Returns the content based on the content type
        res.writeHead(200,{'contentType': contentType});
        res.end(data);
    })
})

//created the port
const port = 8800
server.listen(port, (err, server) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server listening on port ${port}`);
});