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
  return db.createTable("kingdom", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    name:  { type: "string" }
  });
};

exports.down = function(db) {
  return db.dropTable("kingdom");
};

exports._meta = {
  "version": 1
};
