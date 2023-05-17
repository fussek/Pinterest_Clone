import io
import requests

from pathlib import Path
from PIL import Image

from tqdm import tqdm

from firestore.firebase_connector import FirebaseConnector, PINS_COLLECTION
from utils import configure_logging

FIREBASE_CONFIG_PATH = Path('../firebase_config.yaml')
IMAGE_DIR = Path('images/')

logger = configure_logging()


class ImageDownloader(FirebaseConnector):
    """
    ImageDownloader class which is responsible for downloading raw images from URLs that can be found in NoSQL db.
    """
    def __init__(self, config_path=FIREBASE_CONFIG_PATH, collection=PINS_COLLECTION, imgs_dir=IMAGE_DIR):
        super().__init__(config_path, collection)
        self.imgs_dir = imgs_dir

    def check_if_new_images(self, id_urls):
        """
        Function that checks if new pins were added and will download ones that are not on a local machine
        :param imgs_dir:
        :return:
        """
        offline_ids = sorted([offline_id.stem for offline_id in self.imgs_dir.glob('*.png')])
        missing_ids = list(set(id_urls.keys()) - set(offline_ids))
        logger.info(f'Number of new images in a database: {len(missing_ids)}')
        return missing_ids

    def get_images_urls(self):
        """
        Function that gets urls from db that will be use later to download images.
        :return id_urls: dict with ids and urls
        """
        id_urls = {}
        pins_docs = self.coll_ref.stream()
        for pins_doc in pins_docs:
            id_urls[pins_doc.id] = pins_doc.to_dict()['img_url']

        new_ids = self.check_if_new_images(id_urls)
        new_id_urls = {new_id: id_urls[new_id] for new_id in new_ids}
        return new_id_urls

    def get_images(self, img_urls, verify=True):
        """
        Function that downloads images to local machine.
        :param img_urls: dict with ids and urls
        :param verify: param for testing purposes
        """
        for img_id, img_url in tqdm(img_urls.items(), total=len(img_urls), desc='Downloading available images'):
            response = requests.get(img_url, verify=verify)
            if response.status_code == 200:
                self.imgs_dir.mkdir(exist_ok=True)
                with io.BytesIO(response.content) as img_bytes:
                    img = Image.open(img_bytes)
                    img.save(self.imgs_dir / '{}.png'.format(img_id))

            elif response.status_code == 404:
                logger.warning(f'Image with id: {img_id} cannot be downloaded.')


if __name__ == '__main__':
    img_downloader = ImageDownloader(imgs_dir=IMAGE_DIR)
    img_urls = img_downloader.get_images_urls()
    img_downloader.get_images(img_urls)


