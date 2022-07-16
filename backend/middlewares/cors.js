const allowedCors = [
  'http://marina.nomorepatriesxyz.ru',
  'https://marina.nomorepartiesxyz.ru',
  'http://localhost:3000',
  'https://localhost:3000'
];
module.exports = (req, res, next) => {
  const { method } = req;
  const { origin } = req.headers;
  const requestHeaders = req.headers['acces-control-request-headers'];
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Acces-Control-Allow-Origin', origin);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end()
  }
  next()
}
