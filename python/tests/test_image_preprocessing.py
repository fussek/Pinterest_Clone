from pathlib import Path
from PIL import Image
from tempfile import TemporaryDirectory

import numpy as np
import pytest

from data_preparation.image_preprocessing import ImagePreprocessor, IMG_HEIGHT, IMG_WIDTH


@pytest.fixture()
def image_downloader():
    image_downloader = ImagePreprocessor(IMG_WIDTH, IMG_HEIGHT)
    return image_downloader


def test_convert_to_grayscale(image_downloader):
    # Create a sample image
    img_array = np.random.randint(0, 255, size=(50, 50, 3)).astype('uint8')
    img = Image.fromarray(img_array)

    # Convert to grayscale using the method being tested
    grayscale_img = image_downloader.convert_to_grayscale(img)

    # Check that the resulting image is grayscale
    assert grayscale_img.mode == 'L'


def test_normalize_image(image_downloader):
    # Create a sample image
    img_array = np.random.randint(0, 255, size=(50, 50, 3)).astype('uint8')
    img = Image.fromarray(img_array)

    # Normalize pixel values using the method being tested
    normalized_img = image_downloader.normalize_image(img)

    # Check that the resulting image is normalized
    assert np.all((normalized_img >= 0) | (normalized_img <= 1))


def test_resize_image(image_downloader):
    # Create a sample image
    img = Image.new('RGB', (100, 100), color='red')

    # Resize the image
    resized_img = image_downloader.resize_image(img)

    # Check if the image has been resized to the desired dimensions
    assert resized_img.size == (IMG_WIDTH, IMG_HEIGHT)


def test_preprocess_single_image(image_downloader):
    img_array = np.random.randint(0, 255, size=(50, 50, 3)).astype('uint8')
    img = Image.fromarray(img_array)
    preprocessed_img = image_downloader.preprocess_single_image(img)
    assert len(preprocessed_img.shape) == 2
    assert np.all((preprocessed_img >= 0) | (preprocessed_img <= 1))
    assert preprocessed_img.shape == (IMG_WIDTH, IMG_HEIGHT)


def test_preprocess_images(image_downloader):
    with TemporaryDirectory() as temp_dir:
        temp_dir = Path(temp_dir)
        raw_img = np.random.randint(0, 255, size=(512, 512, 3)).astype(np.uint8)
        with Image.fromarray(raw_img) as image:
            raw_images_dir = temp_dir / 'raw_images'
            raw_images_dir.mkdir(exist_ok=True)
            image.save(raw_images_dir / 'img_1.png')

        processed_images_dir = temp_dir / 'processed_images'
        image_downloader.preprocess_images(raw_images_dir, processed_images_dir)

        processed_img_path = processed_images_dir / 'img_1.png'
        assert processed_img_path.exists()
        with Image.open(processed_img_path) as processed_img:
            assert processed_img.mode == 'L'
            assert processed_img.size == (IMG_WIDTH, IMG_HEIGHT)
