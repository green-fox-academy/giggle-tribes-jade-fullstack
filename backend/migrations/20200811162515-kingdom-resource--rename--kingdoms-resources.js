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
  return db.renameTable("kingdom_resource", "kingdoms_resources");
};

exports.down = function(db) {
  return db.renameTable("kingdoms_resources", "kingdom_resource");
};

exports._meta = {
  "version": 1
};
