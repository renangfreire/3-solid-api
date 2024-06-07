import { app } from './app';
import { env } from './main/env';

app.listen({
    port: env.PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log('listening on port 3333')
})