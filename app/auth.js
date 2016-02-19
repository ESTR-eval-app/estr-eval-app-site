angular.module('app.auth', ['angular-jwt'])
  .factory('authService', function (jwtHelper) {


    return {

      login: function (token) {
        console.log("logging in");
        window.localStorage['auth'] = token;
        console.log(window.localStorage.getItem("auth"));
      },

      logout: function () {
        console.log("logout");
        window.localStorage.removeItem('auth');
      },

      getAPITokenHeader: function () {
        //console.log(window.localStorage['auth']);
        return {'api-token': window.localStorage['auth']};
      },

      getTokenUser: function () {
        var payload = jwtHelper.decodeToken(window.localStorage['auth']);
        console.log(payload);
        return {
          username: payload.username,
          id: payload.id,
          isAdmin: payload.isAdmin
        }
      },

         isUserAuthenticated : function () {
          var token = window.localStorage['auth'];
          if (token) {
            //console.log(token);
            var expired = jwtHelper.isTokenExpired(token);
            if (expired) {
              console.log("token expired");
              this.logout();
            }
            console.log("authenticated")
            return true;
          }
           console.log("not authenticated");
          return false;
        }
      }
    });