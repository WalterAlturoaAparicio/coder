import faker from 'faker'
faker.locale='es'

export default function generateProduct() {
  return {
    title: faker.lorem.words(),
    thumbnail: faker.image.imageUrl(100,100, 'tehnics', true),
    price: faker.datatype.number()
  }
}