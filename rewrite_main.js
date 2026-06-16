const fs = require('fs');

let mainCode = fs.readFileSync('main.js', 'utf8');

// The original commands we want to keep
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

// Let's find the start of switch(true)
const switchStart = mainCode.indexOf('switch (true) {');
if (switchStart === -1) {
    console.error("switch(true) not found!");
    process.exit(1);
}

// Find the end of the switch statement
let openBraces = 0;
let switchEnd = -1;
let started = false;

for (let i = switchStart; i < mainCode.length; i++) {
    if (mainCode[i] === '{') {
        openBraces++;
        started = true;
    } else if (mainCode[i] === '}') {
        openBraces--;
    }
    
    if (started && openBraces === 0) {
        switchEnd = i + 1;
        break;
    }
}

console.log(`Switch starts at ${switchStart}, ends at ${switchEnd}`);

const newSwitch = `switch (true) {
            case userMessage.startsWith('.instagram') || userMessage.startsWith('.insta') || (userMessage === '.ig' || userMessage.startsWith('.ig ')):
                await instagramCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.igsc'):
                await igsCommand(sock, chatId, message, true);
                break;
            case userMessage.startsWith('.igs'):
                await igsCommand(sock, chatId, message, false);
                break;
            case userMessage.startsWith('.fb') || userMessage.startsWith('.facebook'):
                await facebookCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.music'):
                await playCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.spotify'):
                await spotifyCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.play') || userMessage.startsWith('.mp3') || userMessage.startsWith('.ytmp3') || userMessage.startsWith('.song'):
                await songCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.video') || userMessage.startsWith('.ytmp4'):
                await videoCommand(sock, chatId, message);
                break;
            case userMessage.startsWith('.tiktok') || userMessage.startsWith('.tt'):
                await tiktokCommand(sock, chatId, message);
                break;
            case userMessage === '.settings':
                await settingsCommand(sock, chatId, message);
                break;
            case userMessage === '.clearsession' || userMessage === '.clearsesi':
                await clearSessionCommand(sock, chatId, message);
                break;
            case userMessage === '.cleartmp':
                await clearTmpCommand(sock, chatId, message);
                break;
            default:
                commandExecuted = false;
                break;
        }`;

mainCode = mainCode.substring(0, switchStart) + newSwitch + mainCode.substring(switchEnd);

// Also remove the inline if buttonId === 'owner' block which requires ownerCommand
mainCode = mainCode.replace(/else if \(buttonId === 'owner'\) \{[\s\S]*?return;\n\s*\}/g, "");
mainCode = mainCode.replace(/const ownerCommand = require\('\.\/commands\/owner'\);/g, "");

fs.writeFileSync('main.js', mainCode);
console.log("main.js updated");
