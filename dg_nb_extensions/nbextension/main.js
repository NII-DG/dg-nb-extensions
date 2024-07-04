define([
    'base/js/namespace',
    "base/js/events"
], function(Jupyter, events) {
    'use strict';

    var mod_name = 'DG_Nb_Extensions';
    var log_prefix = '[' + mod_name + ']';

    function unfreeze_all_cells() {
        try {
            Jupyter.notebook.get_cells().forEach(function(cell) {
                if (cell.metadata.hasOwnProperty('run_through_control') &&
                    typeof cell.metadata.run_through_control === 'object' &&
                    cell.metadata.run_through_control !== null &&
                    cell.metadata.run_through_control.hasOwnProperty('frozen')) {
                    cell.metadata.run_through_control.frozen = false;
                }
            });
        } catch (e) {
            outputErr('unfreeze_all_cells: '+error.message);
        }
    }

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
        events.off("kernel_connected.Kernel", initializeNotebook);
        outputInfo('Executing notebook initialization process');
        unfreeze_all_cells();
        Jupyter.notebook.clear_all_output();
        Jupyter.notebook.save_notebook().then(
            Jupyter.notebook.kernel.restart()
        );
    }

    function outputInfo(msg){
        /**
         * Functions for Info log output
         */
        console.info(`${log_prefix} ${msg}`);
    }

    function outputErr(msg){
        /**
         * Functions for Error log output
         */
        console.error(`${log_prefix} ${msg}`);
    }

    function outputWarm(msg){
        /**
         * Functions for Warm log output
         */
        console.warn(`${log_prefix} ${msg}`);
    }

    function load_extension() {

        var urlParams = new URLSearchParams(window.location.search); // Obtain URL parameters

        var target_param_key =  `init_nb`;
        if (urlParams.get(target_param_key) === 'true') {
            outputInfo('Notebook initialization required');
            // Wait for the event to trigger if kernel is unavailable,
            // otherwise execute immediately
            events.on("kernel_connected.Kernel", initializeNotebook);
            if (Jupyter.notebook.kernel) {
                initializeNotebook()
            }

        } else {
            outputInfo('Notebook initialization not required');
        }
    }

    return {
        load_ipython_extension: load_extension,
        load_jupyter_extension: load_extension
    };

});