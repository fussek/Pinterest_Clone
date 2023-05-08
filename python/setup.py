from setuptools import find_packages, setup

setup(
    name="python",
    version="0.1.0",
    author="Patryk Szelag",
    description="ML package for Pinterest Clone project",
    url="https://github.com/thebambooguy/Pinterest_Clone/tree/master/python",
    packages=find_packages(),
    install_requires=[
        'PyYAML==6.0',
        'tqdm==4.65.0',
        'firebase-admin==6.1.0',
        'Pillow==9.5.0',
        'pytest==7.3.1',
        'numpy==1.24.3',
        'google-cloud-firestore==2.11.1',
    ],
    python_requires="==3.10",
)