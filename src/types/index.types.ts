/**
 * Interface representing the configuration options for the SMS API.
 */
export interface SmsApiConfig {
    /**
     * The base URL of the SMS API.
     */
    baseUrl: string;

    /**
     * The API key used for authenticating requests to the SMS API.
     */
    apiKey: string;

    senderName: string;

    identifierId: string;
}


/**
 * Request parameters for sending an SMS via GET request.
 * 
 * @typedef {Object} SendSmsGetRequest
 * @property {string} [from] - The value of the system identifier ID if you have subscribed to multiple short codes. Default is empty.
 * @property {string} [sender] - The value of Sender Name to use for this message. Must be verified before usage. Default is the short code of the identifier.
 * @property {string} to - The recipient phone number. Mandatory.
 * @property {string} message - The SMS message to send or the template UID if using a custom template. Mandatory.
 * @property {number} [template=0] - Indicates if the message is a template ID. Default is 0 (don't use template).
 * @property {string} [callback] - The callback URL to receive SMS send progress. Should be a GET endpoint. Default is empty.
 */
export type SendSmsGetRequest = {
    from?: string;
    sender?: string;
    to: string;
    message: string;
    template?: number;
    callback?: string;
};

/**
 * Response object for sending an SMS via GET request.
 * 
 * @typedef {Object} SendSmsGetResponse
 * @property {string} acknowledge - The status of the request, typically "success" or "failure".
 * @property {Object} response - The response details.
 * @property {string} response.status - The status of the message sending process.
 * @property {string} response.message_id - The ID of the sent message.
 * @property {string} response.message - The original message sent.
 * @property {string} response.to - The original recipient phone number.
 * @property {string} [error] - Error message in case of failure.
 */
export type SendSmsGetResponse = {
    acknowledge: string;
    response?: {
        status: string;
        message_id: string;
        message: string;
        to: string;
    };
    error?: string;
};

/**
 * Request parameters for sending bulk SMS.
 * 
 * @typedef {Object} BulkSMSRequest
 * @property {string[]} [to] - List of recipient phone numbers for a single message. 
 * @property {Array<{to: string, message: string}>} [personalizedTo] - List of personalized messages for each recipient.
 * @property {string} [from] - Identifier ID for the sender (optional).
 * @property {string} sender - Sender name shown as the FROM value in the message.
 * @property {string} message - Message content to send (mandatory for non-personalized).
 * @property {string} campaign - Campaign name for tracking (optional).
 * @property {string} [createCallback] - POST callback URL for campaign actions (optional).
 * @property {string} [statusCallback] - GET callback URL for message status updates (optional).
 */
export type BulkSMSRequest = {
    to?: string[];
    personalizedTo?: { to: string; message: string }[];
    from?: string;
    sender: string;
    message?: string;
    campaign?: string;
    createCallback?: string;
    statusCallback?: string;
};

/**
 * Response object for sending bulk SMS.
 * 
 * @typedef {Object} BulkSMSResponse
 * @property {string} acknowledge - Status of the request: "success" or "failure".
 * @property {Object} response - Contains details about the bulk SMS campaign.
 * @property {string} response.message - Description of the response.
 * @property {string} response.campaign_id - ID of the campaign created for the bulk SMS.
 */
export type BulkSMSResponse = {
    acknowledge: string;
    response: {
        message: string;
        campaign_id: string;
    };
};



/**
 * @typedef {Object} SendSecurityCodeRequest
 * @property {string} [from] - The identifier ID. If not provided, the default identifier is used.
 * @property {string} [sender] - The sender name. Must be verified before usage. Defaults to the identifier short code.
 * @property {string} to - The recipient's phone number. Mandatory.
 * @property {number} [len=4] - The length of the security code. Default is 4.
 * @property {number} [t=0] - The type of code: 0 for numeric, 1 for alphabetic, 2 for alphanumeric. Default is 0.
 * @property {number} [ttl=0] - Time-to-live for the code in seconds. A value of 0 means the code does not expire.
 * @property {string} [callback] - The callback URL to receive SMS progress updates. Must be a GET endpoint.
 * @property {string} [pr] - A prefix for the message to prepend before the security code.
 * @property {string} [ps] - A postfix for the message to append after the security code.
 * @property {number} [sb=0] - The number of spaces between the prefix and the generated code. Default is 0.
 * @property {number} [sa=0] - The number of spaces between the generated code and the postfix. Default is 0.
 */
export type SendSecurityCodeRequest = {
    from?: string; // Optional identifier ID.
    sender?: string; // Optional sender name.
    to: string; // Mandatory recipient phone number.
    len?: number; // Optional length of the code. Default is 4.
    t?: number; // Optional code type: 0 (numeric), 1 (alphabetic), 2 (alphanumeric). Default is 0.
    ttl?: number; // Optional time-to-live in seconds. Default is 0.
    callback?: string; // Optional callback URL.
    pr?: string; // Optional message prefix.
    ps?: string; // Optional message postfix.
    sb?: number; // Optional spaces before the code. Default is 0.
    sa?: number; // Optional spaces after the code. Default is 0.
};

/**
 * @typedef {Object} SendSecurityCodeResponse
 * @property {string} acknowledge - The status of the request. Typically "success" or "failure".
 * @property {Object} response - The response details.
 * @property {string} response.status - The status of the send operation.
 * @property {string} response.message_id - The unique identifier for the message.
 * @property {string} response.message - The message sent, including the security code.
 * @property {string} response.to - The recipient's phone number.
 * @property {string} response.code - The generated security code.
 * @property {string} response.verificationId - A unique ID for verification purposes.
 */
export type SendSecurityCodeResponse = {
    acknowledge: string; // Status of the request: "success" or "failure".
    response: {
        status: string; // Status of the send operation.
        message_id: string; // Unique identifier for the message.
        message: string; // The message sent, including the code.
        to: string; // Recipient's phone number.
        code: string; // Generated security code.
        verificationId: string; // Unique ID for verification purposes.
    };
}



/**
 * Request parameters for verifying a security code.
 * 
 * @typedef {Object} VerifyCodeRequest
 * @property {string} [to] - The recipient phone number. Mandatory if `vc` is not provided.
 * @property {string} [vc] - The verification ID received when sending the code. Mandatory if `to` is not provided.
 * @property {string} code - The security code to verify. This is a mandatory field.
 */
export type VerifyCodeRequest = {
    to?: string; // Optional recipient phone number. Mandatory if `vc` is not provided.
    vc?: string; // Optional verification ID. Mandatory if `to` is not provided.
    code: string; // Mandatory security code to verify.
};

/**
 * Response object for the verification of a security code.
 * 
 * @typedef {Object} VerifyCodeResponse
 * @property {string} acknowledge - Status of the request: "success" or "failure".
 * @property {Object} [response] - Contains verification details if the request is successful.
 * @property {string} response.phone - The recipient's phone number.
 * @property {string} response.code - The verified security code.
 * @property {string} response.verificationId - The verification ID associated with the code.
 * @property {string} response.sentAt - The time the code was sent.
 * @property {string} [error] - Description of the error, if the verification fails.
 */
export type VerifyCodeResponse = {
    acknowledge: string; // Status of the request: "success" or "failure".
    response?: {
        phone: string; // Recipient's phone number.
        code: string; // Verified security code.
        verificationId: string; // Verification ID associated with the code.
        sentAt: string; // Time when the code was sent.
    };
    error?: string; // Description of the error if verification fails.
};
