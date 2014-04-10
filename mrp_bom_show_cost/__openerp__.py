#!/usr/bin/python
# -*- encoding: utf-8 -*-
#############################################################################
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
################################################################################
{
    "name" : "BoM Show Cost",
    "version" : "1.0",
    "depends" : ['product','mrp'],
    "author" : "Timothy Solomon",
    #"license" : "AGPL-3",
    "description" : """This module inherits standard price field in mrp.bom and shows the total cost of BOM
    """,
    "website" : "http://timothysolomon.co.za",
    "category" : "Generic Modules",
    "init_xml" : [],
    "demo_xml" : [],
    "test": [],
    "update_xml" : ['mrp_bom_view.xml',
    ],
    "active": False,
    "installable": True,
}

