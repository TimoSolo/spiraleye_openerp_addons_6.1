# -*- coding: utf-8 -*-
##############################################################################
#    
#    OpenERP, Open Source Enterprise Management Solution
#    Copyright (C) 2004-2010 Tiny SPRL (<http://openerp.com>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.     
#
##############################################################################


from osv import osv,fields

import tools
import utils
import openerp.exceptions

import os
import sys

class res_users(osv.osv):
    _inherit = 'res.users'
    _columns = {
        'biometric':fields.many2one('biometric','Fingerprints', ), # add fingerprints to user
    }

    def login(self, db, login, password):
        print 'login: login '+login+' ***************'
        result = super(res_users, self).login(db, login, password)
        if result: # TODO or if password is less than 10 char..
            return result
        else:
            try:
                # cwd= os.getcwd()
                syspath = sys.path[0]
                # print os.getcwd()
                # print 'cd "'+syspath+'"'
                # os.system('cd "'+syspath+'"')
                # print os.getcwd()

                # get users with fingerprints..
                with utils.cursor(db) as cr:
                    cr.execute('''SELECT u.id, b.name, b.fingerprint_data
                                FROM res_users u
                                JOIN biometric_fingerprint b ON b.biometric_id = u.biometric
                                WHERE u.active=True''')
                    users = cr.dictfetchall()
                    # print 'users: '+`users`
                    for row in users:
                        print ' call java match user '+`row['id']`+' '+row['name'] +': java -jar "'+syspath+'\\openerp\\addons\\web_fingerprint_widget\\static\\src\\java\\UareUbackend.jar" '
                        match =   os.system('java -jar "'+syspath+'\\openerp\\addons\\web_fingerprint_widget\\static\\src\\java\\UareUbackend.jar" '+row['fingerprint_data']+' '+password)
                        print ' match: '+`match`
                        if match == 2:
                            # jackpot!
                            print 'found finger for user '+`row['id']`+' '+row['name']
                            print """UPDATE res_users
                                SET date=now() AT TIME ZONE 'UTC'
                                WHERE id="""+`row['id']`+""" RETURNING id"""
                            cr.execute("""UPDATE res_users
                                SET date=now() AT TIME ZONE 'UTC'
                                WHERE id="""+`row['id']`+""" RETURNING id""")
                            res = cr.fetchone()
                            cr.commit()
                            print `res`
                            return res[0] if res else False
            except Exception as e:
                print e

        return False # found nothing

    def check(self, db, uid, passwd):
        # print 'login: check '+`uid`+'***************'
        try:
            return super(res_users, self).check(db, uid, passwd)
        except openerp.exceptions.AccessDenied:
            print 'AccessDenied.. '
            if not passwd:
                raise
            with utils.cursor(db) as cr:
                cr.execute('''SELECT COUNT(1)
                                FROM res_users
                               WHERE id=%s
                                  AND active=%s''',
                            (int(uid), True))
                if not cr.fetchone()[0]:
                    raise
                self._uid_cache.setdefault(db, {})[uid] = passwd
res_users()
