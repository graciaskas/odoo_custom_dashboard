# -*- coding: utf-8 -*-
{
    "name": "Coccafatlas dashboard",
    "version": "1.0",
    "summary": "Coccafatlas dashbord",
    "sequence": -1,
    "description": """coccafatlas  Dashboard""",
    "category": "OWL",
    "depends": ["base", "web", "board", "coccafatlas"],
    "author": "ZeSlap Platforms, Gracias Kasongo",
    "data": [
        "views/coccafatlas_dashboard.xml",
    ],
    "demo": [],
    "installable": True,
    "application": False,
    "auto_install": False,
    "assets": {
        "web.assets_backend": [
            "coccafatlas_dashboard/static/src/components/**/*.js",
            "coccafatlas_dashboard/static/src/components/**/*.xml",
            "coccafatlas_dashboard/static/src/components/**/*.scss",
        ],
    },
}
