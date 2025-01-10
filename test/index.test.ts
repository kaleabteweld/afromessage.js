import { SmsApi } from '../src';
import { SendSmsGetRequest, BulkSMSRequest, SendSecurityCodeRequest, VerifyCodeRequest } from '../src/types/index.types';

const smsApi = new SmsApi({
    apiKey: process.env.AFROMESSAGE_TOKEN || "",
    baseUrl: "https://api.afromessage.com/api",
    senderName: process.env.AFROMESSAGE_SENDER_NAMES || "",
    identifierId: process.env.AFROMESSAGE_IDENTIFIER_ID || "",
});

// Example for sendSms
const sendSmsExample = async () => {
    const payload: SendSmsGetRequest = {
        to: "0900640160",
        message: "Hello, this is a test message.",
    };

    try {
        const response = await smsApi.sendSms(payload);
        console.log("sendSms response:", response);
    } catch (error) {
        console.error("sendSms error:", error);
    }
};

// Example for sendBulkSMS
const sendBulkSmsExample = async () => {
    const payload: BulkSMSRequest = {
        to: ["0900640160"],
        sender: "Shewaber",
        message: "Hello, this is a bulk test message.",
    };

    try {
        const response = await smsApi.sendBulkSMS(payload);
        console.log("sendBulkSMS response:", response);
    } catch (error) {
        console.error("sendBulkSMS error:", error);
    }
};

// Example for sendSecurityCode
const sendSecurityCodeExample = async () => {
    const payload: SendSecurityCodeRequest = {
        to: "0900640160",
        len: 6,
    };

    try {
        const response = await smsApi.sendSecurityCode(payload);
        console.log("sendSecurityCode response:", response);
    } catch (error) {
        console.error("sendSecurityCode error:", error);
    }
};

// Example for verifyCode
const verifyCodeExample = async () => {
    const payload: VerifyCodeRequest = {
        to: "0900640160",
        code: "123456",
    };

    try {
        const response = await smsApi.verifyCode(payload);
        console.log("verifyCode response:", response);
    } catch (error) {
        console.error("verifyCode error:", error);
    }
};

// Run examples
sendSmsExample();
sendBulkSmsExample();
sendSecurityCodeExample();
verifyCodeExample();