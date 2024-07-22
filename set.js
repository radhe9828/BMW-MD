const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUh0UHFkZ3M2UEcxTE5EQURpQjVJcUIvd3FRb2Vkb3Y2bG8wdVlWamRYRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUkpieHVqYjNSUUZkOU52UVBMRkFCb1NDaDRhZ1RTOHNmUEI0UHA0b3kyWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpQVRkMVhaVHg1Y0kxcmN2N29GVVRIOEdtdW9YcDhzMVBiM281MUsrSW5FPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJycytldUJONSt3aVpoWklnSnJxNjZDOXE0MXRIazdCeFZrcytDbVBJMDBZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVDWk1nTlFuYUFBcFlaZkpHMzF5eWZsc3RaTEJ6WXZxdGI5d2hreEwyRlE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImZ1WjRuUFJTRER4V2RWU3lZb01UMEVaK3A5cWY2RHZZSmVyYUcxRnl3SEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK0dxNGdvVzBSM0taWmVwWDY3VUxmbDZ0YVdiVUxrRTVkbEhBejFwb3ZFYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSTYyS3hLSElEUDd4eisxTW9HbXl4NmgxYjVXbUZOVnozVEd6OEFTeEtFQT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjE0NGhFNmhWOXJFRVZ1cVZGNERUUzYvMjhUQi9iVkh0dFpldkFtVFp2SkRnMXpWRjZXVUlXcmtoSVZIWTRkRGJUa3FXU0lDZHltZGkxQjVKQXI5NmlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDksImFkdlNlY3JldEtleSI6Ilg0L094S0VGdlJrcW82cUR6R2RkSVhnck5IeCtFaTZYaVJZSkFpQ1YyQmM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiOTE4OTU1ODk4NzYzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjdCMEM3RTUwQjFGMjM2RDE0OTg0MEE5MTVFMUFDRDk2In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjE2MTI1NTR9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkxpWUN2M3BhUi1paUtGYzJjZWhvOEEiLCJwaG9uZUlkIjoiMzA2ZWYwYzAtMjRjNC00NTFmLWJjOTMtNzk0YzEzNDU1YTVhIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFUMER0N2pPZzArUzJITXYvTHVPVDcyc2luWT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlUHNZVTdrdkRxUTNPdkJQVGVWYTNoRWdVekE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWDE5MUxRUEMiLCJtZSI6eyJpZCI6IjkxODk1NTg5ODc2MzoxMEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZCR8J2QmvCdkJ3wnZCh8J2QniJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSm1HenJzQ0VQdng5clFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiamN3MTkvS1psbEQ1Y2ZxZUFWMDNMTmhyU2hzczQ2M3ZZaDV3Q0ZtZ2FrND0iLCJhY2NvdW50U2lnbmF0dXJlIjoia1UyUU1TTGFWdDM0R1JXNlJsNmVXZnhlb3FsdmtBNTdpV0d1WHRac1g0RGV4aEZGUGp4T2Q4KzN2OTZpa3ZxaFBPNWdQNlJ3ZU1XRmIwTGJxWHNJQWc9PSIsImRldmljZVNpZ25hdHVyZSI6InR2OVYyRDArNXhUdEdFMG43TmdKNjYva1dGY1QvQnpidjNQSjZrQVBGQm5lMHJHcFQ0QmFiOEk5bjYzSVp2L3duZ1MzU2dGY2RmL2Zra2VKZmF1dWdRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTE4OTU1ODk4NzYzOjEwQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlkzTU5mZnltWlpRK1hINm5nRmROeXpZYTBvYkxPT3Q3MkllY0FoWm9HcE8ifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE2MTI1NTEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBQ0daIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Radhe",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Radhe",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
