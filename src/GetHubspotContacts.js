const axios = require('axios');
const _ = require('lodash');
const fs = require('fs-extra');

const apiKey = 'acc986e8-317d-46aa-a192-59b0e5f1affb';
const endpoint = `https://api.hubapi.com/contacts/v1/lists/all/contacts/all?hapikey=${apiKey}&property=areas_of_help&property=contact_via
&property=facebook&property=professional_background_and_experience&property=more_about_you&property=volunteer_areas&property=email
&property=city&property=firstname&property=lastname&property=hs_object_id&property=phonec&property=reatedate`;

const parseContact = (contact, id) => ({
    id,
    roles: _.get(contact, 'areas_of_help', null),
    city: _.get(contact, 'city', null),
    contact_via: _.get(contact, 'contact_via', null),
    subscription_date: _.get(contact, 'createdate', null),
    email: _.get(contact, 'email', null),
    facebook: _.get(contact, 'facebook', null),
    first_name: _.get(contact, 'firstname', null),
    last_name: _.get(contact, 'lastname', null),
    experience: _.get(contact, 'professional_background_and_experience', null),
    roles_2: _.get(contact, 'volunteer_areas', null)
});

const getPaginatedResults = (url, dict, offset, path) =>
    axios({
        method: 'GET',
        url: `${url}&vidOffset=${offset}`
    })
        .then(result => {
            console.log(offset);
            const la = result.data.contacts;
            const mapped = _.map(la, contact => {
                const id = _.get(contact, 'canonical-vid', null);
                if (id === null) {
                    console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
                    console.log(contact);
                }
                return parseContact(contact.properties, id);
            });
            if (result.data['has-more']) {
                const mergedDict = _.concat(dict, mapped);
                return getPaginatedResults(url, mergedDict, _.get(result, 'data.vid-offset', 0), path);
            }

            fs.writeJsonSync(path, _.concat(dict, mapped));
            return _.concat(dict, mapped);
        })
        .catch(err => console.log(err));

getPaginatedResults(endpoint, [], 0, './src/data/contacts.json');

// axios({
//     method: 'GET',
//     url: `https://api.hubapi.com/properties/v1/contacts/properties?hapikey=acc986e8-317d-46aa-a192-59b0e5f1affb`
// }).then(res => {
//     fs.writeFileSync('./src/data/properties.json', res)
// });
