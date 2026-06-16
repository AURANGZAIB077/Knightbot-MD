const fs = require('fs');

let mainCode = fs.readFileSync('main.js', 'utf8');

// replace calls to handleJoinEvent and handleLeaveEvent inside handleGroupParticipantUpdate
mainCode = mainCode.replace(/await handleJoinEvent[\s\S]*?;/g, "");
mainCode = mainCode.replace(/await handleLeaveEvent[\s\S]*?;/g, "");
// also handlePromotionEvent and handleDemotionEvent
mainCode = mainCode.replace(/await handlePromotionEvent[\s\S]*?;/g, "");
mainCode = mainCode.replace(/await handleDemotionEvent[\s\S]*?;/g, "");

fs.writeFileSync('main.js', mainCode);
