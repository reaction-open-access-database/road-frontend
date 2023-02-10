import { defineConfig } from "cypress";
import { InbucketAPIClient } from "inbucket-js-client";
import type { PreviewMessageModel, MessageModel } from "inbucket-js-client";

export default defineConfig({
    e2e: {
        baseUrl: "http://localhost:3000",
        setupNodeEvents(on, config) {
            const inbucket_client = new InbucketAPIClient(config.env.INBUCKET_URL);

            on("task", {
                reset_mailbox(name: string): Promise<string> {
                    return inbucket_client.prugeMailbox(name);
                },

                async get_latest_email(name: string): Promise<MessageModel> {
                    let mailbox: PreviewMessageModel[] = [];
                    while (mailbox.length === 0) {
                        mailbox = await inbucket_client.mailbox(name);
                    }
                    return await inbucket_client.message(name, mailbox[mailbox.length-1].id);
                }
            });
        },
    },
});
