const os = require('os');

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

// استخدام عنوان IP في السيرفر
const router = require('./routes/Router');
const express = require("express");
const app = express();

app.use(express.json());
const port = process.env.PORT || 3000;

app.use(router);

app.listen(port, () => {
    console.log(`Running with ip ${ip}:${port}`);
});
