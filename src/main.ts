 @Query("select docLive from DocumentLiveEntity docLive join docLive.doc doc1 where docLive.doc.idRequest = ?1 ")
