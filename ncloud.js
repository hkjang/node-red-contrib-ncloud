const ncloud = require('naver-ncloud-apis');

module.exports = function(RED) {
    "use strict";
    function ncloudOut(n) {
        RED.nodes.createNode(this,n);
        var self = this;
        this.method = n.method || "";
        this.basePath = n.basePath || "";
        this.action = n.action || "";
        this.actionParams = n.actionParams || "";
        this.on('input', function (msg) {
            const method = self.method || msg.method;
            const basePath = self.basePath || msg.basePath;
            const action = self.action || msg.action;
            const actionParams = self.actionParams || msg.actionParams;

            ncloud({
                method: method,
                basePath: basePath, //'/server/v2/'
                action: action, //'getServerInstanceList'
                actionParams : actionParams
            }).then(response => {
                msg.payload = response.data;
                self.send(msg);
                self.log(msg.payload);
            }).catch(error =>{
                msg.payload = error.response.data;
                self.send(msg);
                self.log(msg.payload);
            });
        });
    }
    RED.nodes.registerType("ncloud", ncloudOut);
};
