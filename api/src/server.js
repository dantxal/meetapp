import app from './app';

app.listen(3333, () => console.log(`Listening on ${process.env.APP_URL}`));
