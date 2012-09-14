# -*- coding: utf-8 -*-
##############################################################################
#    
#    Copyright (C) 2012 Timothy Solomon (<http://www.timothysolomon.co.za>)
#    Copyright (C) 2012 Spiraleye (<http://www.spiraleye.com>)
#    All Rights Reserved
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as published
#    by the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

{
    'name': 'Jquery Print',
    'version': '1.0',
    'category': 'Web',
    'description': """Allows printing of any block using jquery print (jqprint)
    
to use add the following to your view xml:
<html>
	<a  onclick="javascript:$('.view-manager-main-content').jqprint();" class="oe_button">Print</a>
</html>
to print the content area, 
or use your own jquery selector to target a specific part of the page (eg the currently open page in a notebook would be $('.ui-tabs-panel:visible'))
-----
credits to https://github.com/tanathos/jquery.jqprint

    """,
    'author': 'Timothy Solomon',
    'website': 'http://www.spiraleye.com',
    'license': 'AGPL-3',
    'depends': ['web'],
    'data': [],
    'active': False,
    'auto_install': False,
    'js': [
        'static/js/jqprint.js',
    ],
}

