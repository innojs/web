// Стили
require('./layout.styl');
require('./blocks/feed/feed.styl');
require('./blocks/event/event.styl');
require('./blocks/header/header.styl');

// BH-шаблоны
require('./blocks/event/event.bh.js');

// Клиентские скрипты
require('../node_modules/oauthio-web/dist/oauth.js');
require('./newEvent.js');
require('./events.js');
