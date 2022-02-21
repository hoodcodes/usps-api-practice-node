if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const PORT = process.env.PORT;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const utf8 = require("utf-8");
const parseString = require("xml2js").parseString;

const app = express();

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

var usps = require("usps-web-tools-node-sdk");

console.log(process.env.USERNAME);

// tell it to use your username from the e-mail
usps.configure({ userID: process.env.USERNAME });

// invoke the API you need with...
usps.addressInformation.cityStateLookup(
  // a data object with the required fields
  {
    zipCode: ["90210"],
  },
  // and a callback
  function (error, response) {
    if (error) {
      // if there's a problem, the error object won't be null
      console.log(error);
    } else {
      // otherwise, you'll get a response object
      console.log(JSON.stringify(response));
    }
  }
);

// invoke the API you need with...
usps.addressInformation.verify(
  // a data object with the required fields
  {
    includeOptionalElements: true,
    returnCarrierRoute: true,
    address: [
      //examples
      // { address2: "205 bagwell ave", city: "nutter fort", state: "wv" },
      // {
      //   firmName: "mrs. jane doe",
      //   address1: "apt. 1",
      //   address2: "150 calle a",
      //   city: "san juan",
      //   state: "pr",
      //   urbanization: "urb las gladiolas",
      //   zip5: "00926",
      //   zip4: "3232",
      // },
      {
        address1: "7000 w morning dove",
        address2: "",
        city: "glendale",
        state: "az",
        zip5: "85308",
        zip4: "",
      },
    ],
  },
  // and a callback
  function (error, response) {
    if (error) {
      // if there's a problem, the error object won't be null
      console.log(error);
    } else {
      // otherwise, you'll get a response object
      console.log(JSON.stringify(response));
    }
  }
);

const xmlRequest =
  '<AddressValidateRequest USERID="710THECO0597"><Revision>1</Revision><Address ID="0"><Address1>7000 West Morning Dove Dr</Address1><Address2></Address2><City>Glendale</City><State>Arizona</State><Zip5>85308</Zip5><Zip4></Zip4></Address></AddressValidateRequest>';

const options = {
  method: "post",
  url: "http://production.shippingapis.com/ShippingApi.dll",
  data: {
    API: "Verify",
    XML: xmlRequest,
  },
  headers: {
    "Content-Type": "application/xml",
  },
};

// axios(options)
//   .then((response) => {
//     console.log(response.data);
//     parseString(response.data, (err, result) => {
//       //console.log(result)
//       //replace below with xml parsing
//       // console.log(JSON.stringify(result['soap:Envelope']['soap:Body']))
//       // var searchResult = result['soap:Envelope']['soap:Body'][0]['QASearchResult'][0]['QAPicklist'][0]['PicklistEntry']
//       // searchResult.forEach((item) => {
//       //   console.dir(item)
//       // })
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });

/*
  <Error><Number>80040B19</Number><Description>XML Syntax Error: 
  Please check the XML request to see if it can be parsed.
  </Description><Source>USPSCOM::DoAuth</Source></Error>
  */

/*






*/

// request.post({
//     url:"http://production.shippingapis.com/ShippingApi.dll",
//     port: 9000,
//     method:"POST",
//     headers:{
//         'Content-Type': 'application/xml',
//     },
//     data:{
//       api: 'Verify',
//       XML: xmlRequest
//     }
// },
// function(error, response, body){
//     console.log(response.statusCode);
//     console.log(body);
//     console.log(error);
// });
