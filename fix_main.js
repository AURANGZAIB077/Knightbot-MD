const fs = require('fs');
let code = fs.readFileSync('main.js', 'utf8');

// 1. Remove all requires to ./commands/ that we just deleted
const keepRequires = [
    'clearsession',
    'cleartmp',
    'settings',
    'facebook',
    'instagram',
    'tiktok',
    'igs',
    'play',
    'song',
    'video',
    'spotify'
];

code = code.replace(/const\s+.*?require\('\.\/commands\/.*?'\);\n/g, (match) => {
    for (const keep of keepRequires) {
        if (match.includes(`require('./commands/${keep}')`)) {
            return match;
        }
    }
    return '';
});

// Write it back to see what we need to fix
fs.writeFileSync('main.js', code);
