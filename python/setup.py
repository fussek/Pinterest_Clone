from setuptools import find_packages, setup

with open('requirements.txt') as f:
    required = f.read().splitlines()

setup(
    name="python",
    version="0.1.0",
    author="Patryk Szelag",
    description="ML package for Pinterest Clone project",
    url="https://github.com/thebambooguy/Pinterest_Clone/tree/master/python",
    packages=find_packages(),
    install_requires=required,
    python_requires="3.10",
)