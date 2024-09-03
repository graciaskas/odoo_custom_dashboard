# -*- coding: utf-8 -*-
{
    "name": "Coccafatlas dashboard",
    "version": "1.0",
    "summary": "Coccafatlas dashbord",
    "sequence": -1,
    "description": """coccafatlas  Dashboard""",
    "category": "OWL",
    "depends": ["base", "web", "board", "coccafatlas"],
    "data": [
        "views/sales_dashboard.xml",
    ],
    "demo": [],
    "installable": True,
    "application": True,
    "assets": {
        "web.assets_backend": [
            "odoo_custom_dashboard/static/src/components/**/*.js",
            "odoo_custom_dashboard/static/src/components/**/*.xml",
            "odoo_custom_dashboard/static/src/components/**/*.scss",
        ],
    },
}
