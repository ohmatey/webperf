import { db } from './firebaseAdmin'

const shapeItem = (item = {}) => ({
  id: item.id,
  ...item?.data()
})

const shapeItems = (items = []) => items.docs.map(shapeItem)

const newFirestoreModule = (collectionName) => {

  const getById = async id => {
    if (!id) throw new Error('id is required')

    const item = await db.collection(collectionName).doc(id).get()

    return shapeItem(item)
  }

  const getAll = async () => {
    const data = await db.collection(collectionName).get()
  
    return shapeItems(data)
  }
  
  const create = async item => {
    const createdItem = await db.collection(collectionName).add(item)

    return getById(createdItem.id)
  }
  
  const update = async (id, item) => {
    if (!id) throw new Error('id is required')

    await db.collection(collectionName).doc(id).update(item)
  
    return getById(id)
  }
  
  const deleteDoc = async id => {
    if (!id) throw new Error('id is required')

    await db.collection(collectionName).doc(id).delete()
  
    return true
  }

  return {
    getById,
    getAll,
    create,
    update,
    delete: deleteDoc
  }
}

export default newFirestoreModule