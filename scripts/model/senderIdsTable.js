(function(module){
  var senderIdsTable = {};
  createTableD = function(){
    webDB.execute(
     'CREATE TABLE IF NOT EXISTS senderIds(' +
       'sender VARCHAR NOT NULL,' +
       'emailsNo INTEGER NOT NULL,' +
       'allIds VARCHAR NOT NULL);'
    );
  };
  senderIdsTable.createDelTable = function(from, ids){
    webDB.execute([{
      'sql': 'INSERT INTO senderIds' +
      '(sender, emailsNo, allIds)' +
      'VALUES(?,?,?);',
      'data': [from, ids.length, ids]
    }]);
  };
  var insert = function(){
    webDB.execute('SELECT * FROM senderIds', function(all){
      if(all.length){
        all.forEach(function(item){
          if(item.allIds === "0"){
            if(item.emailsNo === 1){
              document.getElementById(item.sender).innerHTML = item.emailsNo + ' email deleted';
            }else{
              document.getElementById(item.sender).innerHTML = item.emailsNo + ' email deleted';
            };
            document.getElementById(item.sender).setAttribute( 'onClick', 'emailNo.offEventListner(this);' );
          }else{
            emailNo.allEmails(item.sender, item.emailsNo);
          }
        });
      }
    });
  }
  createTableD();
  insert();
  module.senderIdsTable = senderIdsTable;
})(window);
