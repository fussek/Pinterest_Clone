from pathlib import Path
from requests.exceptions import SSLError
from tempfile import TemporaryDirectory

import pytest
from firebase_admin import delete_app

from data_preparation.get_raw_images import ImageDownloader

FIREBASE_CONFIG_PATH = Path('firebase_config.yaml')
PINS_COLLECTION = 'pins'
EXAMPLE_IMG_URL = 'https://fastly.picsum.photos/id/741/200/300.jpg?hmac=xaQ9kS4D9YUXp1ih8_9I1Bo0GlrWrUW2UxRv52xf8dU'
EXAMPLE_ID_URL_DICT = {'img1': 'https://example.com/img1.png', 'img2': 'https://example.com/img2.png'}


@pytest.fixture()
def image_downloader():
    image_downloader = ImageDownloader(config_path=FIREBASE_CONFIG_PATH, collection=PINS_COLLECTION)
    yield image_downloader
    delete_app(image_downloader.app)


def test_check_if_new_images_without_local_images(image_downloader):
    with TemporaryDirectory() as temp_dir:
        image_downloader.imgs_dir = Path(temp_dir)
        # Call the method and check the output
        missing_ids = image_downloader.check_if_new_images(EXAMPLE_ID_URL_DICT)
        assert sorted(missing_ids) == ['img1', 'img2']


def test_check_if_new_images_with_local_images(image_downloader):
    with TemporaryDirectory() as temp_dir:
        image_downloader.imgs_dir = Path(temp_dir)
        # Add a file to the temporary directory and check that it is not included in the output
        img_path = Path(temp_dir) / 'img1.png'
        img_path.touch()
        missing_ids = image_downloader.check_if_new_images(EXAMPLE_ID_URL_DICT)
        assert missing_ids == ['img2']


def test_image_downloader_get_images_urls(image_downloader):
    id_urls = image_downloader.get_images_urls()
    assert isinstance(id_urls, dict)
    assert all(isinstance(key, str) and isinstance(value, str) for key, value in id_urls.items())


def test_image_downloader_get_images_with_verify_false(image_downloader):
    img_urls = {'img1': EXAMPLE_IMG_URL}
    with TemporaryDirectory() as temp_dir:
        image_downloader.imgs_dir = Path(temp_dir)
        image_downloader.get_images(img_urls, verify=False)
        assert len(list(image_downloader.imgs_dir.iterdir())) == 1
        assert all(img_file.suffix == '.png' for img_file in image_downloader.imgs_dir.iterdir())


def test_image_downloader_get_images_with_verify_true(image_downloader):
    img_urls = {'img1': EXAMPLE_IMG_URL}
    with TemporaryDirectory() as temp_dir:
        image_downloader.imgs_dir = Path(temp_dir)
        with pytest.raises(SSLError) as e:
            image_downloader.get_images(img_urls)
            assert len(list(image_downloader.imgs_dir.iterdir())) == 1
            assert all(img_file.suffix == '.png' for img_file in image_downloader.imgs_dir.iterdir())
