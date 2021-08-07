const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);


module.exports.sendVerificationEmail = (email) => {
    client.verify.services(process.env.serviceId)
        .verifications
        .create({ to: email, channel: 'email' })
        .then(verification => console.log(verification.sid));

}

module.exports.verifyCode = (email, code) => {
    client.verify.services(process.env.serviceId)
        .verificationChecks
        .create({ to: email, code })
        .then(verification_check => {
            console.log(verification_check.status)
            return verification_check.status
        });
}
