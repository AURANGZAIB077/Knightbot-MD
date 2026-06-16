const fs = require('fs');

let indexCode = fs.readFileSync('index.js', 'utf8');

// The block to remove starts around line 318
indexCode = indexCode.replace(/\/\/ Anticall handler: block callers when enabled[\s\S]*?XeonBotInc\.ev\.on\('call', async \(calls\) => \{[\s\S]*?\}\);/g, "");

fs.writeFileSync('index.js', indexCode);
