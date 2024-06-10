import { app } from './main/config/app';
import { env } from './main/config';

app.listen({
    port: env.PORT,
    host: '0.0.0.0'
}).then(() => {
    console.log('listening on port 3333')
})