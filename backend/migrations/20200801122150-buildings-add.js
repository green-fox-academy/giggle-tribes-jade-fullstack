'use strict';

var dbm;
var type;
var seed;

exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable("buildings", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    kingdom_id: { type: "int", notNull: true },
    type:  { type: "string", notNull: true },
    level: { type: "int", defaultValue: 1 },
    hp: { type: "int", notNull: true},
    started_at: { type: "timestamp", notNull: true, defaultValue: new String('CURRENT_TIMESTAMP') },
    finished_at: { type: "timestamp", notNull: true, defaultValue: new String('CURRENT_TIMESTAMP') }
  });
};

exports.down = function(db) {
  return db.dropTable("buildings");
};

exports._meta = {
  "version": 1
};
