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
  return db.createTable('kingdom_resource', {
    id: { type: 'int', primaryKey: true, autoIncrement: true, notNull: true },
    kingdom_id: {
      type: 'int',
      notNull: true,
    },
    type: { type: 'string', notNull: true },
    amount: { type: 'int', notNull: true },
    generation: { type: 'int', notNull: true },
    updatedAt: { type: 'timestamp', notNull: true },
  });
};

exports.down = function (db) {
  return db.dropTable('kingdom_resource');
};

exports._meta = {
  version: 1,
};
