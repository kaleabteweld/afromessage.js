import axios, { AxiosResponse } from 'axios';
import { BulkSMSRequest, BulkSMSResponse, SendSecurityCodeRequest, SendSecurityCodeResponse, SendSmsGetRequest, SendSmsGetResponse, SmsApiConfig, VerifyCodeRequest, VerifyCodeResponse } from "./types/index.types";

/**
 * A class to interact with an SMS API.
 */
export class SmsApi {
    private readonly apiKey: string;
    private readonly baseUrl: string;
    private readonly headers: Record<string, string>;
    private readonly senderName: string;
    private readonly identifierId: string;

    /**
     * Initializes the SmsApi class.
     * @param apiKey - The API key for authentication.
     * @param baseUrl - The base URL of the SMS API.
     */
    constructor({
        apiKey = process.env.AFROMESSAGE_TOKEN || "",
        baseUrl = "https://api.afromessage.com/api",
        senderName = process.env.AFROMESSAGE_SENDER_NAMES || "",
        identifierId = process.env.AFROMESSAGE_IDENTIFIER_ID || "",
    }: SmsApiConfig) {
        if (!apiKey || !baseUrl) {
            throw new Error("API key and base URL are required.");
        }
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization': 'Bearer ' + apiKey
        };
        this.senderName = senderName;
        this.identifierId = identifierId;
    }

    /**
     * Sends an SMS message.
     * @param payload - The SMS payload containing the phone number and message.
     * @returns A promise that resolves to the SMS response.
     */
    async sendSms(payload: SendSmsGetRequest): Promise<SendSmsGetResponse> {
        if (!payload.to || !payload.message) {
            throw new Error("Both phoneNumber and message are required.");
        }

        if (this.senderName) payload.sender = this.senderName;
        if (this.identifierId) payload.from = this.identifierId;


        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/send`, payload, {
                headers: this.headers,
            });

            return {
                acknowledge: "success",
                response: response.data,
            };
        } catch (error) {
            throw error instanceof Error ? error.message : "Unknown error";
        }
    }

    /**
     * Sends a bulk SMS to multiple recipients.
     * 
     * @param {BulkSMSRequest} params - The request parameters for sending the SMS.
     * @returns {Promise<BulkSMSResponse>} - The API response containing details about the campaign.
     * @throws {Error} - If the request fails or the server returns a non-200 status.
     */
    async sendBulkSMS(params: BulkSMSRequest): Promise<BulkSMSResponse> {
        const payload = {
            to: params.to || params.personalizedTo,
            from: params.from,
            sender: params.sender,
            message: params.message,
            campaign: params.campaign,
            createCallback: params.createCallback,
            statusCallback: params.statusCallback,
        };

        try {
            const response: AxiosResponse = await axios.post(`${this.baseUrl}/bulk_send`, payload, {
                headers: this.headers,
            });

            return response.data;
        } catch (error) {
            throw error instanceof Error ? error.message : "Unknown error";
        }
    }

    /**
     * Sends a security code to the specified recipient.
     * @param {SendSecurityCodeRequest} params - The request parameters for sending the security code.
     * @returns {Promise<SendSecurityCodeResponse>} - The API response.
     */
    async sendSecurityCode(params: SendSecurityCodeRequest): Promise<SendSecurityCodeResponse> {
        if (this.senderName) params.sender = this.senderName;
        if (this.identifierId) params.from = this.identifierId;

        const queryString = new URLSearchParams(params as unknown as Record<string, string>).toString();
        const url = `${this.baseUrl}/challenge?${queryString}`;

        try {
            const response: AxiosResponse = await axios.get(url, {
                headers: this.headers,
            });

            return response.data;
        } catch (error) {
            throw error instanceof Error ? error.message : "Unknown error";
        }
    }

    /**
     * Verifies a security code.
     * @param {VerifyCodeRequest} params - The request parameters for verifying the security code.
     * @returns {Promise<VerifyCodeResponse>} - The API response.
     */
    async verifyCode(params: VerifyCodeRequest): Promise<VerifyCodeResponse> {
        const queryString = new URLSearchParams(params as unknown as Record<string, string>).toString();
        const url = `${this.baseUrl}/verify?${queryString}`;

        try {
            const response: AxiosResponse = await axios.get(url, {
                headers: this.headers,
            });

            return response.data;
        } catch (error) {
            return {
                acknowledge: "failure",
                error: error instanceof Error ? error.message : "Unknown error",
            } as VerifyCodeResponse;
        }
    }
}