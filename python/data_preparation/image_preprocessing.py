from pathlib import Path
from PIL import Image

import numpy as np
from tqdm import tqdm

from python.utils import configure_logging

IMG_WIDTH = 300
IMG_HEIGHT = 300

logger = configure_logging()


class ImagePreprocessor:
    def __init__(self, raw_images_dir, processed_images_dir, img_width=IMG_WIDTH, img_height=IMG_HEIGHT):
        self.raw_images_dir = raw_images_dir
        self.processed_images_dir = processed_images_dir
        self.img_width = img_width
        self.img_height = img_height

    @staticmethod
    def convert_to_grayscale(img):
        return img.convert('L')

    @staticmethod
    def normalize_image(img):
        img = np.asarray(img)
        return img / 255.

    def resize_image(self, img):
        return img.resize((self.img_width, self.img_height))

    def preprocess_single_image(self, img):
        img = self.convert_to_grayscale(img)
        img = self.resize_image(img)
        img = self.normalize_image(img)
        return img

    def preprocess_images(self):
        images_paths = list(self.raw_images_dir.glob('*.png'))
        for image_path in tqdm(images_paths, total=len(images_paths), desc='Image preprocessing'):
            with Image.open(image_path) as img:
                logger.info(f'Path: {image_path}, Img size: {img.size}')
                preprocessed_image = image_preprocessor.preprocess_single_image(img)
                logger.info(f'Image size after preprocessing: {preprocessed_image.shape}')
                preprocessed_image = Image.fromarray(preprocessed_image, 'L')
                self.processed_images_dir.mkdir(exist_ok=True)
                preprocessed_image.save(processed_img_dir / image_path.name)


if __name__ == '__main__':
    image_preprocessor = ImagePreprocessor(IMG_WIDTH, IMG_HEIGHT)
    img_dir = Path('images/')
    for img_path in img_dir.glob('*.png'):
        with Image.open(img_path) as img:
            logger.info(f'Path: {img_path}, Img size: {img.size}')
            preprocessed_img = image_preprocessor.preprocess_single_image(img)
            logger.info(f'Image size after preprocessing: {preprocessed_img.shape}')
            preprocessed_img = Image.fromarray(preprocessed_img, 'L')
            processed_img_dir = Path('data_preparation/processed_images/')
            processed_img_dir.mkdir(exist_ok=True)
            preprocessed_img.save(processed_img_dir / img_path.name)
