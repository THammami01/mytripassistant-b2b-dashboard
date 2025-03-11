"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Textarea,
  Button,
  Divider,
  Accordion,
  AccordionItem,
} from "@heroui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useTheme } from "next-themes";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";

import { updateAppUsageFormSchema, UpdateAppUsageFormType } from "./types";

import { NEXT_PUBLIC_APP_URL } from "@/config/public-constants";

const INTEGRATION_GUIDE_MARKDOWN = `
### Integration Guide

Using your backend, send us a request with the following details:

\`\`\`json
URL: ${NEXT_PUBLIC_APP_URL}/api/external/generate-token

Method: POST

Headers:
x-api-key: "<API_KEY>"

JSON Body:
{
  "userId": "<USER_ID>",
  "sessionDuration": "<SESSION_DURATION_IN_MS>"
}
\`\`\`

_x-api-key_ header is required. You can find your API key in the top right corner of this section. Copy it and use it in your requests. This key is unique to the selected app and should never be shared with others or exposed publicly.

_userId_ is optional, however, we recommend providing it so we can track and identify your unique users' actions and show stats about them later.

_sessionDuration_ is optional and defaults to 1 day if not provided.

The response will be as follows:

\`\`\`json
JSON Body:
{
  "url": "${NEXT_PUBLIC_APP_URL}/?token=<TOKEN>"
}
\`\`\`

_TOKEN_ is a signed JWT containing:

- The user ID you provided
- The app ID linked to your API key
- The session duration

This token is required for us to verify your users and track their actions.

With _url_ in the response, you can embed it in your platform or open it in a new browser tab.
`;

const CODE_EXAMPLES_MARKDOWN = {
  curl: `curl -X POST ${NEXT_PUBLIC_APP_URL}/api/external/generate-token \\
  -H "x-api-key: AK-1234567890ab" \\
  -H "Content-Type: application/json" \\
  -d '{"userId": "user123", "sessionDuration": 14400000}'  # 4 hours in milliseconds`,

  python: `import requests

url = "${NEXT_PUBLIC_APP_URL}/api/external/generate-token"
headers = {
    "x-api-key": "AK-1234567890ab",
    "Content-Type": "application/json"
}
payload = {
    "userId": "user123",
    "sessionDuration": 14400000  # 4 hours in milliseconds
}

response = requests.post(url, headers=headers, json=payload)
data = response.json()

# Use the URL from the response
mytripassistant_url = data["url"]
print(f"MyTripAssistant URL: {mytripassistant_url}")
# You can now redirect users to this URL or embed it in an iframe`,

  nodejs: `// Using fetch API
async function generateToken() {
  const response = await fetch("${NEXT_PUBLIC_APP_URL}/api/external/generate-token", {
    method: "POST",
    headers: {
      "x-api-key": "AK-1234567890ab",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: "user123",
      sessionDuration: 14400000  // 4 hours in milliseconds
    })
  });

  const data = await response.json();
  
  // Use the URL from the response
  const mytripassistantUrl = data.url;
  console.log("MyTripAssistant URL:", mytripassistantUrl);
  
  // You can now redirect users to this URL or embed it in an iframe
  return mytripassistantUrl;
}`,
};

export default function Usage() {
  const { theme } = useTheme();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<UpdateAppUsageFormType>({
    mode: "all",
    resolver: zodResolver(updateAppUsageFormSchema),
    defaultValues: {
      tokenGenerationOriginsWhitelist: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (data: UpdateAppUsageFormType) => {
    console.log(data);

    setIsLoading(true);

    setTimeout(() => {
      toast.success("Token generation origins whitelist updated successfully.");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 px-2">
      <div>
        <p className="text-base font-medium text-default-700">Usage</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Learn how to integrate with MyTripAssistant, and add token generation
          origins whitelist.
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
              const { children, className, ...rest } = props;
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
          {INTEGRATION_GUIDE_MARKDOWN}
        </ReactMarkdown>
      </div>

      <Divider className="mt-3 mb-1.5" />

      <div>
        <h3 className="mb-2 text-base font-medium">Code examples</h3>

        <p className="mb-4 text-sm text-default-500">
          Here are some examples of how to integrate with MyTripAssistant.
        </p>

        <div className="flex flex-col gap-4">
          <Accordion isCompact selectionMode="multiple" variant="light">
            <AccordionItem key="1" aria-label="cURL" title="cURL">
              <SyntaxHighlighter
                PreTag="div"
                className="!text-sm !-mt-1 !mb-2"
                language="bash"
                style={theme === "dark" ? atomDark : undefined}
              >
                {CODE_EXAMPLES_MARKDOWN.curl}
              </SyntaxHighlighter>
            </AccordionItem>
            <AccordionItem key="2" aria-label="Python" title="Python">
              <SyntaxHighlighter
                PreTag="div"
                className="!text-sm !-mt-1 !mb-2"
                language="python"
                style={theme === "dark" ? atomDark : undefined}
              >
                {CODE_EXAMPLES_MARKDOWN.python}
              </SyntaxHighlighter>
            </AccordionItem>
            <AccordionItem key="3" aria-label="Node.js" title="Node.js">
              <SyntaxHighlighter
                PreTag="div"
                className="!text-sm !-mt-1 !mb-2"
                language="javascript"
                style={theme === "dark" ? atomDark : undefined}
              >
                {CODE_EXAMPLES_MARKDOWN.nodejs}
              </SyntaxHighlighter>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <Divider className="mt-2 mb-1.5" />

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
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
          {...register("tokenGenerationOriginsWhitelist")}
          description={errors?.tokenGenerationOriginsWhitelist?.message}
        />
        <div className="flex mt-4">
          <Button
            color="success"
            isDisabled={!isValid || isLoading}
            isLoading={isLoading}
            radius="full"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
