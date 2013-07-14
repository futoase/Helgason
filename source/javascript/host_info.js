var hostInfo = {
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      port: window.location.port,
      origin: function () {
        var url =  (
          hostInfo.protocol + '//' + 
          hostInfo.hostname
        );
        if (hostInfo.port !== "") {
          url += ':' + hostInfo.port;
        }
        return url;
      }
    };
