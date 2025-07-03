
  
  function getDataForEsignFormulaire(documentSelectedTab, urlEsign) {
    var ids = utilService.retrieveIdsFromDocuments(documentSelectedTab);
    var idRequestTab = utilService.getIdRequestDocumentTab(documentSelectedTab);
    var document = documentSelectedTab[0]; //--Les documents doivent se reporter au même client
    var identifiantAbonne = '';
    var deferred = $q.defer();

    var promise1 = retrieveSubscribersFromIds({"ids": ids});
    var promise2 = retrieveChannelsFromIds({"ids": ids});
    var promise = retrieveContextIdFromIds({"ids": ids});
    $q.all([promise1, promise2 ]).then(function (responses) {
      var subscriberResponse = responses[0];
      var subscriberTab = subscriberResponse.data.subscribers != null ? [].concat(subscriberResponse.data.subscribers) : [];
      identifiantAbonne = isArrayNotEmpty(subscriberTab) ? _.join(removeDuplicates(subscriberTab), ';') : '';

      var channelResponse = responses[1];
      var channels = channelResponse.data.channels
      var isValidate = getDocumentIsValidate(documentSelectedTab);
      var esignObject = {
        'urlEsign': urlEsign,
        'data': {
          'ids': ids,
          'idRequestTab': idRequestTab,
          'numberContract': ajoutPrefixe(document.numberContract, 16),
          'numberClient': ajoutPrefixe(document.numberClient, 10),
          'identifiantAbonne': ajoutPrefixe(identifiantAbonne, 10),
          'channels': channels,
          'token': document && document.esignParams ? document.esignParams.token : null,
          'isValidate': isValidate
        }
      }
      deferred.resolve(esignObject);
    }).catch(function (error) {
      $log.error('XHR Failed for retrieveSubscribersFromIds.' + error.data);
    });
    return deferred.promise;
  }
