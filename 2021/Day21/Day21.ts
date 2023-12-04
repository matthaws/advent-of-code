const parseDay21Input = require('../../inputParser.ts');
const uuids = parseDay22Input('day-21.txt', 'string');

console.log(uuids.map(uuid => ({ actor: 1, actor_id: uuid, enabled: true})))