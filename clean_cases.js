const fs = require('fs');

const keepCommands = [
    'clearSessionCommand',
    'clearTmpCommand',
    'settingsCommand',
    'facebookCommand',
    'instagramCommand',
    'tiktokCommand',
    'igsCommand',
    'playCommand',
    'songCommand',
    'videoCommand',
    'spotifyCommand'
];

let lines = fs.readFileSync('main.js', 'utf8').split('\n');
let newLines = [];
let inCase = false;
let currentCase = [];
let keepCase = false;
let openBraces = 0;

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // We are inside the switch(true) block if we see case ...:
    // But we need to handle global context
    if (line.match(/^\s*case\s+.*?:\s*$/) || line.match(/^\s*case\s+.*?:\s*\{\s*$/) || line.match(/^\s*default\s*:\s*$/)) {
        if (!inCase) {
            inCase = true;
            currentCase = [line];
            keepCase = false;
            openBraces = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        } else {
            // Already in a case, but wait, a case could fall through to another case
            // Actually, we'll just treat multiple cases as one block until a break;
            currentCase.push(line);
            openBraces += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        }
        continue;
    }

    if (inCase) {
        currentCase.push(line);
        openBraces += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;

        // Check if there is a command call that we keep
        for (const keep of keepCommands) {
            if (line.includes(keep + '(')) {
                keepCase = true;
            }
        }
        
        // Also keep if it's the "default:" case, but actually wait, default is a case
        if (currentCase[0].includes('default:')) {
            keepCase = true;
        }

        // if we hit break; and braces are balanced, end of case block
        if (line.match(/^\s*break;\s*$/) && openBraces === 0) {
            if (keepCase) {
                newLines = newLines.concat(currentCase);
            }
            inCase = false;
            currentCase = [];
        }
    } else {
        newLines.push(line);
    }
}

fs.writeFileSync('main.js.new', newLines.join('\n'));
