# dg-nb-extensions

This Jupyter Notebook extension is an extension package for the Research Workflow sub-function of NII Data Governance.

## Prerequisite

* [Jupyter Notebook](https://github.com/jupyter/notebook) 4.2.x or 5.x

## How to Install and Enabling

1. Install the python package

   ```bash
   pip install git+https://github.com/NII-DG/dg-nb-extensions.git
   ```

2. Install extension files

    ```bash
    jupyter nbextension install --py dg_nb_extensions --user
    ```

3. Enabling extension

    ```bash
    jupyter nbextension enable --py dg_nb_extensions --user
    ```

## List of dg-nb-extensions functions

1. [Initialize Jupyter Notebook File(ipynb) on access](./dg_nb_extensions/nbextension/README.md#initialize-jupyter-notebook-fileipynb-on-access)
2. under development

## License

[Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0). See [LICENSE](./LICENSE) for more information.
