const fs = require("fs");
const vcard = require("vcard-parser");

var raw =
  "BEGIN:VCARD\r\n" +
  "VERSION:3.0\r\n" +
  "N:Gump;Forrest;;Mr.;\r\n" +
  "FN:Forrest Gump\r\n" +
  "TEL;TYPE=HOME:78884545247\r\n" +
  "END:VCARD";


fs.writeFileSync('./output.vcf', raw);

const rawData = vcard.parse(raw);

console.log({ rawData });

console.log(rawData.tel[0].value)

// const filePath = "./input/4.vcf";

// const data = vcard.parse(filePath);

// const dataExact = data["/input/4"];

// console.log({ dataExact });
