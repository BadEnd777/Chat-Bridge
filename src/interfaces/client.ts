/**
 * Represents the options for configuring a client.
 */
export interface ClientOptions {
    /**
     * The access token for authentication.
     */
    accessToken: string;
    /**
     * The verify token for authentication.
     */
    verifyToken: string;
    /**
     * The endpoint URL for the client.
     */
    endpoint?: string;
    /**
     * The port number for the client.
     */
    port?: number;
    /**
     * The host address for the client.
     */
    host?: string;
    /**
     * Specifies whether to enable logging.
     */
    loggers?: boolean;
}
