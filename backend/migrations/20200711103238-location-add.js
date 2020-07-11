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
  return db.createTable("location", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    kingdom_id: { type: "int" },
    code:  { type: "string", unique: true }
  });
};

exports.down = function(db) {
  return db.dropTable("location");
};

exports._meta = {
  "version": 1
};
