const request = require('request');


function tokenGenerator(){
    const authOptions = {
      method: 'post',
      url: "https://api.symbl.ai/oauth2/token:generate",
      body: {
        type: "application",
        appId: "477659333969343359707a4e4735535531756b5268503749714e784359555866",
        appSecret: "7854474e325a6b5a694e4476616a49796b62545f577073415850756169654164365a43564c4734757a5673497366427048554b3045564861744278694a6d5335"
      },
      json: true
    };
    
    request(authOptions, (err, res, body) => {
      if (err) {
        console.error('error posting json: ', err);
        throw err
      }
    
      console.log(JSON.stringify(body, null, 2));
      return body["accessToken"];
    });  
  }
  module.exports={tokenGenerator};
  


