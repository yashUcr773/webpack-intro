import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import expressStaticGzip from 'express-static-gzip';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get('/', (req, res) => {
    const absolutePathToHTML = path.resolve(__dirname, "../dist/main.html")
    res.sendFile(absolutePathToHTML)
})

app.use('/static', expressStaticGzip(path.resolve(__dirname, '../dist'), { enableBrotli: true, orderPreference: ['br', 'gz'] }))

app.listen(3000, () => {
    console.log('Running on PORT:3000, http://localhost:3000')
})