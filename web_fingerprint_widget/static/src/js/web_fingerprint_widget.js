
/*---------------------------------------------------------
 * OpenERP web_fingerprint_widget
 *---------------------------------------------------------*/


openerp.web_fingerprint_widget = function (openerp)
{   
    openerp.web_fingerprint_widget = {};



    openerp.web.form.widgets.add('biometric', 'openerp.web_fingerprint_widget.biometric');
    // openerp.web.page.readonly.add('biometric', 'openerp.web_fingerprint_widget.biometric');
    openerp.web_fingerprint_widget.biometric = openerp.web.form.FieldMany2One.extend({ //FieldMany2One
      template: 'biometric',
      start: function() {
        this._super.apply(this, arguments);
        var self = this;
        var ctx_callback = function(e) {
          if (self.value) {
            var pop = new openerp.web.form.FormOpenPopup(self.view);
            ctx = self.build_context();
            //ctx.mode = this.mode;
            pop.show_element(
                self.field.relation,
                self.value[0],
                ctx,
                {
                    title: (self.value[0]?"Confirm: "+self.value[1]:"Register Biometrics")
                }
            );
            pop.on_write_completed.add_last(function() {
                // TODO: change icon to tick
                self.set_value(self.value[0]);
            });
          } else {
            self._search_create_popup("form");
          }
          e.preventDefault()
        };
        this.$element.find("#biometric_image").click(ctx_callback);
      },

      set_value: function(value) {
        this._super.apply(this, arguments);
        var img = "enroll"
        if (value) {
          img = "confirm";
          if (window.bio_confirmed)
            img = "pass";
        } else {
          img = "enroll";
        }
        this.$element.find("#biometric_image").attr("src","/web_fingerprint_widget/static/src/images/"+img+".jpg"); // set the button text
      },
    });




    openerp.web.form.widgets.add('biometric_confirm', 'openerp.web_fingerprint_widget.biometric_confirm');
    // openerp.web.page.readonly.add('biometric', 'openerp.web_fingerprint_widget.biometric');
    openerp.web_fingerprint_widget.biometric_confirm = openerp.web.form.FieldOne2Many.extend({ 
      template: 'biometric_confirm',
      update_dom: function() {
        this._super.apply(this, arguments);
        if ($("input[name='name']:last").val()!="" 
          && $('[data-field="fingerprint_data"]').length>0 
          && $('#divInstruction').length == 0) { // it has a name so must be a confirmation.. would b safer as a different view?
            this.$element.find('#finger_app').html('<object classid="java:UareUApplet.class" '+
              'codebase="/web_fingerprint_widget/static/src/java/" '+
              'type="application/x-java-applet" '+
              'name="UareUApplet" '+
              'width="1" '+
              'height="0" '+
              'pluginspage="http://java.sun.com/javase/downloads" '+
              'archive="UareUApplet.jar, dpuareu.jar" '+
              'onFMDAcquiredScript="verify_onFMDHandler" '+
               'onImageCapturedScript="verify_onCaptureHandler" '+
               'onErrorScript="onErrorHandler" '+
               'onLoadScript="onLoadHandler" '+
               'bRegistrationMode="false" '+
               'bDebug="true" '+
               'bExclusivePriority="true" '+
              //'sFMDs="'+fmds+'" '+
              'scriptable="true" '+
              'mayscript="true" '+
              'separate_jvm="true" /> '+
              '<center><div id="divInstruction"><b>Scan any registered finger...</b></div> <br /> '+
              '<img   name="appletImage" id="appletImage" border="0" src="/web_fingerprint_widget/static/src/images/up.jpg" alt="Sensor ready" /> </center>'
            );
        }
     },
    });


    openerp.web.form.widgets.add('fingerprint', 'openerp.web_fingerprint_widget.fingerprint');
    openerp.web_fingerprint_widget.fingerprint = openerp.web.form.FieldText.extend({ 
      template: 'fingerprint',
      set_value: function(value) {
            this._super.apply(this, arguments);
            if (!value && this.$element.find('#divInstruction').length==0) { // it hasnt got data so must be a registration.. would b safer as a different view?
                
                this.$element.find('#finger_app').html('<object classid="java:UareUApplet.class" '+
                       'codebase="/web_fingerprint_widget/static/src/java/" '+
                       'type="application/x-java-applet" '+
                       'name="UareUApplet" '+
                       'width="1" ' +
                       'height="0" '+
                       'type="application/x-java-applet" '+
                       'pluginspage="http://java.sun.com/javase/downloads" '+
                       'archive="UareUApplet.jar, dpuareu.jar" '+
                       'onFMDAcquiredScript="onFMDHandler" '+
                      'onEnrollmentFailureScript="onEnrollmentFailureHandler" '+
                      'onImageCapturedScript="onCaptureHandler" '+
                      'onDisconnectedScript="onDisconnectedHandler" '+
                      'onConnectedScript="onConnectedHandler" '+
                      'onErrorScript="onErrorHandler" '+
                      'onLoadScript="onLoadHandler" '+
                      'bRegistrationMode="true" '+
                       'bDebug="true" '+
                       'bExclusivePriority="true" '+
                       'scriptable="true" '+
                       'mayscript="true" '+
                       'separate_jvm="true" />'+
                  '<center><div id="divInstruction"><b> Press the same finger 4 times to the sensor.</b></div> <br /> '+
                  '<img  name="appletImage" id="appletImage" border="0" src="/web_fingerprint_widget/static/src/images/up.jpg" alt="Sensor ready" /> </center>'
              
              );
          }
        },
    });

  //--------------------- login -------------------------


openerp.web.Login = openerp.web.Login.extend({
    start: function() {
        this._super.apply(this, arguments);
        var self = this;
       this.$element.find('#finger_app').html('<object classid="java:UareUApplet.class" '+
              'codebase="/web_fingerprint_widget/static/src/java/" '+
              'type="application/x-java-applet" '+
              'name="UareUApplet" '+
              'width="1" '+
              'height="0" '+
              'pluginspage="http://java.sun.com/javase/downloads" '+
              'archive="UareUApplet.jar, dpuareu.jar" '+
              'onFMDAcquiredScript="verify_onFMDHandler" '+
               'onImageCapturedScript="verify_onCaptureHandler" '+
               'onErrorScript="onErrorHandler" '+
               'onLoadScript="onLoadHandler" '+
               'bRegistrationMode="false" '+
               //'iScans="1" '+
               'bDebug="true" '+
               'bExclusivePriority="true" '+
              //'sFMDs="'+fmds+'" '+
              'scriptable="true" '+
              'mayscript="true" '+
              'separate_jvm="true" /> '+
              '<center><div id="divInstruction"><b>OR Scan finger...</b></div> <br /> '+
              '<img   name="appletImage" id="appletImage" border="0" src="/web_fingerprint_widget/static/src/images/up.jpg" alt="Sensor ready" /> </center>'
            );

    },
  });


}


