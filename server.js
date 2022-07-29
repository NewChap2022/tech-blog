const sequelize = require('./config/connection');
const express = require('express');
const cookieParser = require("cookie-parser");
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Secret',
  cookie: { expires: new Date(Date.now() + (2 * 60 * 60 * 1000)),},
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
      db: sequelize
  })
};

app.use(cookieParser());
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  });