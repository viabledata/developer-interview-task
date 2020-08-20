const Keycloak = require('keycloak-connect');
const winston = require('winston');

const { createLogger, format, transports } = winston;
const { combine, timestamp, json, splat } = format;

const port = process.env.WWW_PORT || 8080;

const express = require('express');
const https = require('https');
const http = require('http');

const app = express();
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const logger = createLogger({
  format: combine(
    timestamp(),
    splat(),
    json(),
  ),
  transports: [
    new transports.Console(),
  ],
  exitOnError: false,
});


if (process.env.NODE_ENV === 'production') {
  logger.info('Setting ca bundle');
  const trustedCa = [
    '/etc/ssl/certs/ca-bundle.crt',
  ];

  https.globalAgent.options.ca = [];
  http.globalAgent.options.ca = [];
  for (const ca of trustedCa) {
    https.globalAgent.options.ca.push(fs.readFileSync(ca));
    http.globalAgent.options.ca.push(fs.readFileSync(ca));
  }
  logger.info('ca bundle set...');
}

const respond = (req, res) => {
  res.send('OK');
};

process.title = 'cop-private-ui';

app.set('port', port);

app.use('/assets', express.static(path.join(__dirname, '/assets')));
app.use(express.static(`${__dirname}/`));

app.use(cors());
app.use(express.json());

app.get('/healthz', respond);
app.get('/readiness', respond);

const kcConfig = {
  clientId: process.env.WWW_KEYCLOAK_CLIENT_ID,
  serverUrl: process.env.KEYCLOAK_URI,
  realm: process.env.KEYCLOAK_REALM,
  bearerOnly: true,
};


const keycloak = new Keycloak({}, kcConfig);
app.use(keycloak.middleware());

app.post('/log', [keycloak.protect(), (req, res) => {
  const logStatements = req.body;
  logStatements.forEach((log) => {
    logger.log(log);
  });
  res.sendStatus(200);
}]);


app.get('/api/config', (req, res) => {
  res.send({
    REALM: process.env.KEYCLOAK_REALM,
    AUTH_URL: process.env.KEYCLOAK_URI,
    CLIENT_ID: process.env.WWW_KEYCLOAK_CLIENT_ID,
    UI_VERSION: process.env.WWW_UI_VERSION,
    UI_ENVIRONMENT: process.env.WWW_UI_ENVIRONMENT,
    WWW_KEYCLOAK_ACCESS_ROLE: process.env.WWW_KEYCLOAK_ACCESS_ROLE,
    OPERATIONAL_DATA_URL: process.env.API_COP_URI,
    REF_DATA_URL: process.env.API_REF_URI,
    WORKFLOW_SERVICE_URL: process.env.ENGINE_URI,
    TRANSLATION_SERVICE_URL: process.env.TRANSLATION_URI,
    REPORT_SERVICE_URL: process.env.REPORT_URI,
    ANALYTICS_URL: process.env.ANALYTICS_URL,
    ANALYTICS_SITE_ID: process.env.ANALYTICS_SITE_ID,
  });
});


app.get('*.js', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/javascript');
  next();
});

app.get('*.css', (req, res, next) => {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  res.set('Content-Type', 'text/css');
  next();
});

app.all('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = http.createServer(app).listen(app.get('port'), () => {
  logger.info(`TaskList Prod server listening on port ${app.get('port')}`);
});


const shutDown = () => {
  logger.info('Received kill signal, shutting down gracefully');
  server.close(() => {
    logger.info('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
};

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);
process.on('SIGQUIT', shutDown);

let connections = [];

server.on('connection', (connection) => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

