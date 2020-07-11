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
  return db.createTable("user_kingdom", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    user_id:  { type: "int" },
    kingdom_id: { type: "int" },
  });
};

exports.down = function(db) {
  return db.dropTable("user_kingdom");
};

exports._meta = {
  "version": 1
};
