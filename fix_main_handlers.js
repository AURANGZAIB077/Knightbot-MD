const fs = require('fs');
let code = fs.readFileSync('main.js', 'utf8');

const handlersToRemove = [
    'handleAutoread',
    'storeMessage',
    'handleMessageRevocation',
    'handleAutotypingForMessage',
    'handleLinkDetection',
    'handleBadwordDetection',
    'handleStatusUpdate',
    'handleChatbotResponse',
    'handleTagDetection',
    'handleMentionDetection',
    'handleJoinEvent',
    'handleLeaveEvent',
    'handlePromotionEvent',
    'handleDemotionEvent',
    'showTypingAfterCommand'
];

for (const handler of handlersToRemove) {
    const regex = new RegExp(`.*${handler}\\(.*\\);?\\n?`, 'g');
    code = code.replace(regex, '');
}

fs.writeFileSync('main.js', code);
