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
  return db.createTable("user", {
    id: { type: "int", primaryKey: true, autoIncrement: true },
    name:  { type: "string", unique: true },
    password: { type: "string" },
  });
};

exports.down = function(db) {
  return db.dropTable("user");
};

exports._meta = {
  "version": 1
};
