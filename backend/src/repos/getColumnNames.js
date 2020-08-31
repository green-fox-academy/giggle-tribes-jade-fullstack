import { db } from '../data/connection';

export const getColumnNames = async table => {
  const columns = await (await db.query(`show columns from ${table};`)).results;

  await columns.forEach((column, index) => {
    columns[index] = column.Field;
  });

  return columns;
};
