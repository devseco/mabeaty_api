const router = require('./routes/Router');
const express = require("express");
var compression = require('compression')
const cors = require("cors");
const os = require('os');
const bodyParser = require('body-parser');
const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(compression())
app.use(express.json());

const port = process.env.PORT || 3000;

// الحصول على كافة واجهات الشبكة
const networkInterfaces = os.networkInterfaces();

// البحث عن عنوان IPv4
let ip;
for (let interface of Object.keys(networkInterfaces)) {
  for (let interfaceInfo of networkInterfaces[interface]) {
    if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
      ip = interfaceInfo.address;
      break;
    }
  }
  if (ip) {
    break;
  }
}
app.use(router);
app.use('/uploads', express.static('uploads'));
app.listen(port, () => {
    console.log(`Running with ip ${ip}:${port}`);
});