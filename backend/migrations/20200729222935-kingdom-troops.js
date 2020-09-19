'use strict';

let dbm;
let type;
let seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.createTable('kingdom_troops', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    kingdom_id: {
      type: 'int',
      notNull: true,
    },
    level: { type: 'int', notNull: true },
    hp: { type: 'int', notNull: true },
    attack: { type: 'int', notNull: true },
    defence: { type: 'int', notNull: true },
    started_at: { type: "timestamp", notNull: true, defaultValue: new String('CURRENT_TIMESTAMP') },
    finished_at: { type: "timestamp", notNull: true, defaultValue: new String('CURRENT_TIMESTAMP') }
  });
};

exports.down = function (db) {
  return db.dropTable('kingdom_troops');
};

exports._meta = {
  version: 1,
};
