import { Client } from '@elastic/elasticsearch'

// const client = new Client({
//   cloud: {
//     id: '<cloud-id>'
//   },
//   auth: {
//     username: 'elastic',
//     password: 'changeme'
//   }
// })

export const esClient = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'PR*tM85JxyfUZ6AhbGT3'
  }
})
