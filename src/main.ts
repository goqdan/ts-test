import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as config from 'config';

import router from './routes';

const app: express.Application = express();
const CONFIG_SERVER_PORT = config.get('server.port');

app.use(bodyParser.json());
app.use('/', router);
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send({ err: err.message || 'Something broken!' });
});

app.listen(CONFIG_SERVER_PORT, () => {
  console.log(`server started at http://localhost:${CONFIG_SERVER_PORT}`);
});
