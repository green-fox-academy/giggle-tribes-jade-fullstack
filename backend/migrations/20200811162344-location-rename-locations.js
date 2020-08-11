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
  return db.renameTable("location", "locations");
};

exports.down = function(db) {
  return db.renameTable("locations", "location");
};

exports._meta = {
  "version": 1
};
