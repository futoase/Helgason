var frontEnvironment = {
      protocol: window.location.protocol,
      hostname: window.location.hostname,
      port: window.location.port,
      origin: function () {
        var url =  (
          frontEnvironment.protocol + '//' + 
          frontEnvironment.hostname
        );
        if (frontEnvironment.port !== "") {
          url += ':' + frontEnvironment.port;
        }
        return url;
      }
    };
