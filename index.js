const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  assert.strictEqual(err, null);

  console.log('Connect correctly to server');

  const db = client.db(dbname);

  // DELETE documents in campsites selection (not typical to do this)
  db.dropCollection('campsites', (err, result) => {
    assert.strictEqual(err, null);
    console.log('Dropped Collection', result);

    const collection = db.collection('campsites');

    // Insert document into this collection
    collection.insertOne(
      { name: 'Breadcrumb Trail Campground', description: 'Test' },
      (err, result) => {
        assert.strictEqual(err, null);
        console.log('Insert Document:', result.ops);

        collection.find().toArray((err, docs) => {
          assert.strictEqual(err, null);
          console.log('Found Documents:', docs);

          client.close();
        });
      }
    );
  });
});
