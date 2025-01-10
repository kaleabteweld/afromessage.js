# Afromessage.js

A Node.js library to interact with the AfroMessage SMS API. This library provides a simple and efficient way to send SMS messages, bulk SMS, and security codes, as well as verify security codes using the AfroMessage API.

For more information, visit the [AfroMessage Developer Documentation](https://afromessage.com/developers).

## Installation

Install the package using npm or yarn:

```bash
npm install afromessage
```

```bash
yarn add afromessage
```

## Environment Variables

Set the following environment variables in your `.env` file or directly in your environment:

```bash
AFROMESSAGE_TOKEN="YOUR_API_KEY"
AFROMESSAGE_IDENTIFIER_ID="YOUR_IDENTIFIER_ID"
AFROMESSAGE_SENDER_NAMES="YOUR_SENDER_NAME"
```

## Usage Examples

Below are examples of how to use the library. Ensure you have initialized your environment variables with `dotenv`.

```typescript
import { SmsApi } from "afromessage";
import {
  SendSmsGetRequest,
  BulkSMSRequest,
  SendSecurityCodeRequest,
  VerifyCodeRequest,
} from "afromessage/types/index.types";
import dotenv from "dotenv";

dotenv.config();

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
    console.dir(response, { depth: null });
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
```

## API Reference

### `constructor(config: SmsApiConfig)`

Initializes the `SmsApi` class.

**Parameters:**

- `config: SmsApiConfig`
  - `apiKey`: The API key for authentication.
  - `baseUrl`: The base URL of the SMS API.
  - `senderName`: The sender name.
  - `identifierId`: The identifier ID.

### Methods

#### `sendSms(payload: SendSmsGetRequest): Promise<SendSmsGetResponse>`

Sends an SMS message.

**Parameters:**

- `payload: SendSmsGetRequest`
  - `to`: The recipient phone number. **Mandatory**.
  - `message`: The SMS message to send. **Mandatory**.
  - `from`: The identifier ID. **Optional**.
  - `sender`: The sender name. **Optional**.
  - `template`: Indicates if the message is a template ID. Default is `0`. **Optional**.
  - `callback`: The callback URL to receive SMS send progress. **Optional**.

**Returns:**

- `Promise<SendSmsGetResponse>`

#### `sendBulkSMS(params: BulkSMSRequest): Promise<BulkSMSResponse>`

Sends a bulk SMS to multiple recipients.

**Parameters:**

- `params: BulkSMSRequest`
  - `to`: List of recipient phone numbers for a single message. **Optional**.
  - `personalizedTo`: List of personalized messages for each recipient. **Optional**.
  - `from`: Identifier ID for the sender. **Optional**.
  - `sender`: Sender name shown as the FROM value in the message.
  - `message`: Message content to send. **Mandatory for non-personalized**.
  - `campaign`: Campaign name for tracking. **Optional**.
  - `createCallback`: POST callback URL for campaign actions. **Optional**.
  - `statusCallback`: GET callback URL for message status updates. **Optional**.

**Returns:**

- `Promise<BulkSMSResponse>`

#### `sendSecurityCode(params: SendSecurityCodeRequest): Promise<SendSecurityCodeResponse>`

Sends a security code to the specified recipient.

**Parameters:**

- `params: SendSecurityCodeRequest`
  - `to`: The recipient's phone number. **Mandatory**.
  - `len`: The length of the security code. Default is `4`. **Optional**.
  - `t`: The type of code: `0` for numeric, `1` for alphabetic, `2` for alphanumeric. Default is `0`. **Optional**.
  - `ttl`: Time-to-live for the code in seconds. A value of `0` means the code does not expire. **Optional**.
  - `callback`: The callback URL to receive SMS progress updates. **Optional**.
  - `pr`: A prefix for the message to prepend before the security code. **Optional**.
  - `ps`: A postfix for the message to append after the security code. **Optional**.
  - `sb`: The number of spaces between the prefix and the generated code. Default is `0`. **Optional**.
  - `sa`: The number of spaces between the generated code and the postfix. Default is `0`. **Optional**.

**Returns:**

- `Promise<SendSecurityCodeResponse>`

#### `verifyCode(params: VerifyCodeRequest): Promise<VerifyCodeResponse>`

Verifies a security code.

**Parameters:**

- `params: VerifyCodeRequest`
  - `to`: The recipient phone number. **Mandatory if vc is not provided**. **Optional**.
  - `vc`: The verification ID received when sending the code. **Mandatory if to is not provided**. **Optional**.
  - `code`: The security code to verify. **Mandatory**.

**Returns:**

- `Promise<VerifyCodeResponse>`
