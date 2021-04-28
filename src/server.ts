import App from './app';
require('dotenv').config()
import IndexRoute from '@modules/index/index.route';

const routes = [new IndexRoute()]
const app = new App(routes);
app.connectDB(process.env.MONGO_URI);
app.listen();