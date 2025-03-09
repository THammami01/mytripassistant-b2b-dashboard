"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Textarea, Button, Divider } from "@heroui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Usage() {
  const markdownContent = `
### Integration Guide

Using your backend, send us a request with the following details:

\`\`\`json
URL:
${process.env.NEXT_PUBLIC_APP_URL}/api/external/generate-token

Method: POST

Headers:
x-api-key: "<API_KEY>"

JSON Body:
{
  "userId": "<USER_ID>",
  "sessionDuration": "<SESSION_DURATION_IN_MS>"
}
\`\`\`

_userId_ is optional, however, we recommend providing it so we can track and identify your unique users' actions and show stats about them later.

_sessionDuration_ is optional and defaults to 1 day if not provided.

The response will be as follows:

\`\`\`json
JSON Body:
{
  "url": "${process.env.NEXT_PUBLIC_APP_URL}/?token=<TOKEN>"
}
\`\`\`

_TOKEN_ is a signed JWT containing:

- The user ID you provided
- The app ID linked to your API key
- The session duration

This token is required for us to verify your users and track their actions.

With _url_ in the response, you can embed it in your platform or open it in a new browser tab.
`;
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-4 px-2">
      <div>
        <p className="text-base font-medium text-default-700">Usage</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Learn how to integrate with MyTripAssistant, and add origins to the
          whitelist.
        </p>
      </div>

      <div className="flex flex-col gap-1.5 mt-2 text-sm prose dark:prose-invert max-w-none">
        <ReactMarkdown
          components={{
            h3(props) {
              const { children, ...rest } = props;

              return (
                <h3 {...rest} className="mb-2 text-base font-medium">
                  {children}
                </h3>
              );
            },

            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");

              return match ? (
                <SyntaxHighlighter
                  {...rest}
                  ref={undefined}
                  PreTag="div"
                  className="!text-sm"
                  language={match[1]}
                  style={theme === "dark" ? atomDark : undefined}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },

            ul(props) {
              const { children, ...rest } = props;

              return (
                <ul
                  {...rest}
                  className="flex flex-col gap-1 my-2 ml-6 list-disc"
                >
                  {children}
                </ul>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>

      <Divider className="mt-3 mb-1.5" />

      <div className="flex flex-col">
        <h3 className="mb-2 text-base font-medium">
          Token Generation Origins Whitelist
        </h3>
        <p className="mb-4 text-sm text-default-500">
          This is optional. However, if provided, we will only accept token
          generation requests from these origins. If not provided, requests will
          be accepted from anywhere. Either way, the API key must be included in
          the headers.
        </p>
        <Textarea
          className="w-full"
          minRows={3}
          placeholder="Enter origins (one per line, e.g. https://mytripassistant.com)"
        />
        <div className="flex mt-4">
          <Button color="success" radius="full">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
