import express from 'express'

const app = express();
const port = process.env.PORT ?? 3005;
app.get('/', (request, response) => {
    response.send('Hello world!');
});
app.listen(port, () => console.log(`Running on port ${port}`));


export default app