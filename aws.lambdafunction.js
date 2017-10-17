

'use strict';

const Alexa = require('alexa-sdk');
const recipes = require('./recipes');

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).

var https = require('https');


const languageStrings = {
    'en': {
        translation: {
            HELP_MESSAGE: "You can ask questions such as, what is the water pressure in Amsterdam...Now, what can I help you with?",
            HELP_REPROMPT: "You can say things like, what is the water pressure in Amsterdam...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!'
        },
    }
};

const handlers = {

    'Quality': function () {
        this.attributes.speechOutput = this.t('QUALITY_MESSAGE');

        this.emit(':tell', this.attributes.speechOutput);
    },
    'Pressure': function () {
        var mythis = this;
        
        https.get({
            'host': 'proghackuc2017.osisoft.com' , 
            'auth' : 'hacker04:********',
            'path' : '/piwebapi/streams/A0EIv2LjHEeN0GMUsPKVd0Xxg9u3z7f2o5xGpSgANOiuWVQIRJSLXs8KlQ01_t45n08iQSlVQSVRFUjAwMVxWSVRFTlNcVklURU5TXEZSSUVTTEFORCBQUk9WSU5DRVwwMSBQUk9EVUNUSU9OIFNJVEVTXFBST0RVQ1RJT04gU0lURSBTUEFOTkVOQlVSR1xESVNUUklCVVRJT05cUElQRVNcUElQRSBGUi1QU1BfLVRSMjF8UFJFU1NVUkU/value'
            
        },  (res) => {
           var responseString = '';

            res.on('data', function(data) {
              responseString += data;
            });

            res.on('end', function() {
                var jsonObj = JSON.parse(responseString);

                var value = Math.round(jsonObj.Value * 100) / 100

                mythis.attributes.speechOutput =  'The water pressure in ' + mythis.event.request.intent.slots.city.value + ' is ' + value.toString();
                mythis.emit(':tell', mythis.attributes.speechOutput);
            });
        }).on('error', (e) => {
          console.error(e);
        });
        

    },
    'Pump': function () {
        var mythis = this;
        
        https.get({
            'host': 'proghackuc2017.osisoft.com' , 
            'auth' : 'hacker04:********',
            'path' : '/piwebapi/streams/A0EIv2LjHEeN0GMUsPKVd0Xxgqu7z7f2o5xGpSgANOiuWVQHN5OX_fNg1MQVeUcr-89ZwSlVQSVRFUjAwMVxWSVRFTlNcVklURU5TXEZSSUVTTEFORCBQUk9WSU5DRVwwMiBESVNUUklCVVRJT04gU0lURVNcQk9PU1RFUiBTVEFUSU9OIFdJUkRVTVxESVNUUklCVVRJT05cUFVNUFNcUFVNUCBGUi1PV0lSLUQxUk4xUDAxUFAwMXxTVEFUVVM/value'
            
        },  (res) => {
           var responseString = '';

            res.on('data', function(data) {
              responseString += data;
            });

            res.on('end', function() {
                var jsonObj = JSON.parse(responseString);

                mythis.attributes.speechOutput =  'The status of the pump at ' + mythis.event.request.intent.slots.location.value + ' is ' + jsonObj.Value.toString();
                mythis.emit(':tell', mythis.attributes.speechOutput);
            });
        }).on('error', (e) => {
          console.error(e);
        });
        

    },
    'Technician': function () {
var mythis = this;
        
        https.get({
            'host': 'proghackuc2017.osisoft.com' , 
            'auth' : 'hacker04:********',
            'path' : '/piwebapi/elements/E0QlqvSyIj702xjP96PHIItwoiVck2uy5xGpbgANOimkwAU0FUVVJOMDM4XENPTk5FQ1RQT0lOVFxWSVRFTlNcRlJJRVNMQU5EIFBST1ZJTkNFXDAxIFBST0RVQ1RJT04gU0lURVNcUFJPRFVDVElPTiBTSVRFIE5PT1JEQkVSR1VNXERJU1RSSUJVVElPTlxRVUFMSVRZ/eventframes?startTime=*-24h'
            
        },  (res) => {
           var responseString = '';

            res.on('data', function(data) {
              responseString += data;
            });

            res.on('end', function() {
                var jsonObj = JSON.parse(responseString);
                
                mythis.attributes.speechOutput =  'In the area ' + mythis.event.request.intent.slots.location.value + ' there are ' + jsonObj.Items.length.toString() + ' quality alarms that needs to be handled';
                mythis.emit(':tell', mythis.attributes.speechOutput);
            });
        }).on('error', (e) => {
          console.error(e);
        });
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'Unhandled': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMPT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
