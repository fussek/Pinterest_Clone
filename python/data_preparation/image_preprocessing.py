from PIL import Image

import numpy as np
from tqdm import tqdm

from utils import configure_logging

IMG_WIDTH = 300
IMG_HEIGHT = 300

logger = configure_logging()


class ImagePreprocessor:
    def __init__(self, img_width=IMG_WIDTH, img_height=IMG_HEIGHT):
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

    def preprocess_images(self, raw_images_dir, processed_images_dir):
        images_paths = list(raw_images_dir.glob('*.png'))
        for image_path in tqdm(images_paths, total=len(images_paths), desc='Image preprocessing'):
            with Image.open(image_path) as img:
                logger.info(f'Path: {image_path}, Img size: {img.size}')
                preprocessed_image = self.preprocess_single_image(img)
                logger.info(f'Image size after preprocessing: {preprocessed_image.shape}')
                preprocessed_image = Image.fromarray(preprocessed_image, 'L')
                processed_images_dir.mkdir(exist_ok=True)
                preprocessed_image.save(processed_images_dir / image_path.name)
