#!/usr/bin/env python

from setuptools import setup
import os

HERE = os.path.abspath(os.path.dirname(__file__))
VERSION_NS = {}
with open(os.path.join(HERE, 'dg_nb_extensions', '_version.py')) as f:
    exec(f.read(), {}, VERSION_NS)

setup_args = dict (name='dg_nb_extensions',
      version=VERSION_NS['__version__'],
      description='Jupyter Notebook Extensions for NII Data Governance',
      packages=['dg_nb_extensions'],
      include_package_data=True,
      platforms=['Jupyter Notebook 4.2.x', 'Jupyter Notebook 5.x'],
      zip_safe=False,
      install_requires=[
          'notebook>=4.2.0',
      ]
)

if __name__ == '__main__':
    setup(**setup_args)
