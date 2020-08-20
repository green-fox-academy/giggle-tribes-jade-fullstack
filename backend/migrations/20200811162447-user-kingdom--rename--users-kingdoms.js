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
  return db.renameTable("user_kingdom", "users_kingdoms");
};

exports.down = function(db) {
  return db.renameTable("users_kingdoms", "user_kingdom");
};

exports._meta = {
  "version": 1
};
