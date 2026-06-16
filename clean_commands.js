const fs = require('fs');

const keepCommands = [
    'clearsession.js',
    'cleartmp.js',
    'settings.js',
    'facebook.js',
    'instagram.js',
    'tiktok.js',
    'igs.js',
    'play.js',
    'song.js',
    'video.js',
    'spotify.js'
];

const dir = './commands';
const files = fs.readdirSync(dir);
for (const file of files) {
    if (file.endsWith('.js') && !keepCommands.includes(file)) {
        fs.unlinkSync(`${dir}/${file}`);
        console.log(`Deleted ${file}`);
    }
}
