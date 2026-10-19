const bedrock = require('bedrock-protocol');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot AFK Aura đang chạy 24/7!'));
app.listen(PORT, () => console.log('Web server đã sẵn sàng.'));

// ⚠️ Thay IP và Port server Crystal Chaos của bạn ở đây:
const CONFIG = {
  host: 'IP_SERVER_CỦA_BẠN', // Thay IP server Crystal Chaos vào đây
  port: 19132,                // Port server
  username: 'Bot_AFK_Aura',    // Tên bạn muốn đặt cho Bot
  offline: true               // true nếu server crack, false nếu yêu cầu Xbox
};

function startBot() {
  console.log('Đang kết nối bot tới server...');
  
  const client = bedrock.createClient({
    host: CONFIG.host,
    port: CONFIG.port,
    username: CONFIG.username,
    offline: CONFIG.offline
  });

  let auraLoop = null;

  client.on('join', () => {
    console.log('✅ Bot đã vào game thành công!');
    auraLoop = setInterval(() => {
      if (client) {
        client.queue('animate', {
          action_id: 'swing_arm',
          runtime_entity_id: client.entityId
        });
      }
    }, 3000);
  });

  client.on('close', () => {
    console.log('🔄 Mất kết nối, thử lại sau 10 giây...');
    if (auraLoop) clearInterval(auraLoop);
    setTimeout(startBot, 10000);
  });

  client.on('error', (err) => console.log('Lỗi:', err));
}

startBot();
