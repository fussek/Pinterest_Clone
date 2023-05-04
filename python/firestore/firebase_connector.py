import yaml

import firebase_admin
from firebase_admin import firestore
from firebase_admin import credentials

PINS_COLLECTION = 'pins'


class FirebaseConnector:
    """
    FirebaseConnector class which is responsible for connecting to Firebase NoSQL db and returning collection with
    pins - data that is used in Pinterest Clone app.
    """
    def __init__(self, config_path='firebase_config.yaml', collection=PINS_COLLECTION):
        with open(config_path, 'r') as f:
            self.config = yaml.safe_load(f)

        self.collection = collection
        self.cred = credentials.Certificate(self.config['secret_key_path'])
        self.app = firebase_admin.initialize_app(self.cred, options=self.config)
        # Initialize the firestore module
        self.firestore_client = firestore.client()
        self.coll_ref = self.get_collection_reff(self.collection)

    def get_collection_reff(self, collection):
        coll_ref = self.firestore_client.collection(collection)
        try:
            # Checking if generator is empty - that means that collection is empty
            first = next(coll_ref.stream())
            return coll_ref
        except StopIteration:
            raise Exception(f'Collection: {collection} is empty!')
