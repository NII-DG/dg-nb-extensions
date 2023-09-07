define([
    'base/js/namespace',
], function(Jupyter) {

    var mod_name = 'DG_Nb_Extensions';
    var log_prefix = '[' + mod_name + ']';

    function initializeNotebook() {
        /**
         * Function to initialize a JupyterNotebook file
         *
         * Description:
         * If the URL parameter has "init_nb=ture", the following processing is performed on the Notebook file to be accessed.
         * 1. Release the cell freeze.
         * 2. Clear the result output.
         * 3. Save the checkpoints.
         * 4. Restart the kernel.
         */
        var urlParams = new URLSearchParams(window.location.search); // Obtain URL parameters

        var target_param_key =  `init_nb`
        if (urlParams.get(target_param_key) === 'true') {
            outputInfo('Execution initialization of Notebook files')
            // Unfreeze all cells
            Jupyter.notebook.get_cells().forEach(function(cell) {
                if (cell.metadata.hasOwnProperty('run_through_control') &&
                    typeof cell.metadata.run_through_control === 'object' &&
                    cell.metadata.run_through_control !== null &&
                    cell.metadata.run_through_control.hasOwnProperty('frozen')) {
                    cell.metadata.run_through_control.frozen = false;
                }
            });
            // Clear the result output.
            Jupyter.notebook.clear_all_output();
            // Save the checkpoints.
            IPython.notebook.save_checkpoint();
            // Restart the kernel.
            Jupyter.notebook.kernel.restart();
        } else {
            outputInfo('Unexecution initialization of Notebook files')
        }
    }

    function outputInfo(msg){
        /**
         * Functions for Info log output
         */
        console.info(`${log_prefix} ${msg}`)
    }

    function outputErr(msg){
        /**
         * Functions for Error log output
         */
        console.error(`${log_prefix} ${msg}`)
    }

    function outputWarm(msg){
        /**
         * Functions for Warm log output
         */
        console.warn(`${log_prefix} ${msg}`)
    }

    return {
        load_ipython_extension: function() { // Functions for loading extensions
            initializeNotebook();
        }
    };

});