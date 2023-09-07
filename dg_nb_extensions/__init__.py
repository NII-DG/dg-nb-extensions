# nbextension
def _jupyter_nbextension_paths():
    return [dict(
        section="notebook",
        src="nbextension",
        dest="dg_nb_extensions",
        require="dg_nb_extensions/main")]
