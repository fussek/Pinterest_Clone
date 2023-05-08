from pathlib import Path

from python.data_preparation.get_raw_images import ImageDownloader
from python.data_preparation.image_preprocessing import ImagePreprocessor
from python.utils import configure_logging

FIREBASE_CONFIG_PATH = Path('firebase_config.yaml')
RAW_IMAGES_DIR = Path('data_preparation/raw_images/')
PROCESSED_IMAGES_DIR = Path('data_preparation/processed_images/')
IMG_WIDTH = 300
IMG_HEIGHT = 300


logger = configure_logging()

if __name__ == '__main__':
    img_downloader = ImageDownloader(config_path=FIREBASE_CONFIG_PATH, imgs_dir=RAW_IMAGES_DIR)
    img_urls = img_downloader.get_images_urls()
    img_downloader.get_images(img_urls)

    image_preprocessor = ImagePreprocessor(IMG_WIDTH, IMG_HEIGHT)
    image_preprocessor.preprocess_images(RAW_IMAGES_DIR, PROCESSED_IMAGES_DIR)
