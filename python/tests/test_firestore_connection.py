from pathlib import Path

import pytest
from firebase_admin import App, credentials, delete_app

from firestore.firebase_connector import FirebaseConnector, PINS_COLLECTION

FIREBASE_CONFIG_PATH = Path('../firebase_config.yaml')


@pytest.fixture
def firebase_connector():
    firestore_conn = FirebaseConnector(config_path=FIREBASE_CONFIG_PATH, collection=PINS_COLLECTION)
    yield firestore_conn
    delete_app(firestore_conn.app)


def test_firebase_connector(firebase_connector):
    assert isinstance(firebase_connector.cred, credentials.Certificate)
    assert isinstance(firebase_connector.app, App)


def test_get_collection_reff_that_exists(firebase_connector):
    assert firebase_connector.coll_ref is not None


def test_get_collection_reff_that_does_not_exist():
    empty_coll = 'empty_collection'
    with pytest.raises(Exception) as e_info:
        firestore_conn = FirebaseConnector(config_path=FIREBASE_CONFIG_PATH, collection=empty_coll)
    assert e_info.value.args[0] == f'Collection: {empty_coll} is empty!'
