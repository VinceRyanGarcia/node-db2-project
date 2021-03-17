const db = require('../../data/db-config')

const getAll = () => {
  return await db('cars');
}

const getById = (id) => {
  return db('cars').where('id',id).first()
}

const create = (car) => {
  return db('cars').insert(car).then(([id]) => getById(id))
}

module.exports {
  getAll,
  getById,
  create
}
