import { OAuth2Client } from "google-auth-library";

import {
  GOOGLE_OAUTH2_CLIENT_ID,
  GOOGLE_OAUTH2_CLIENT_SECRET,
} from "./server-constants";

const client = new OAuth2Client(
  GOOGLE_OAUTH2_CLIENT_ID,
  GOOGLE_OAUTH2_CLIENT_SECRET,
  "postmessage"
);

export default client;
