const resetPasswordBlock = `
                                    <h3
                                      style="
                                        margin: 0;
                                        font-family: Imprima, Arial, sans-serif;
                                        mso-line-height-rule: exactly;
                                        letter-spacing: 0;
                                        font-size: 28px;
                                        font-style: normal;
                                        font-weight: bold;
                                        line-height: 34px;
                                        color: #2d3142;
                                      "
                                    >
                                      $__GREETING__,
                                    </h3>
                                    <p
                                      style="
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        font-family: Imprima, Arial, sans-serif;
                                        line-height: 27px;
                                        letter-spacing: 0;
                                        color: #2d3142;
                                        font-size: 18px;
                                      "
                                    >
                                      <br />We received a request to reset your
                                      password.<br />Let's get you a new one!<br />This link is valid for one hour only.<br /><br />
                                    </p>
                                    <a
                                      href="$__RESET_PASSWORD_URL__"
                                      class="es-button msohide"
                                      target="_blank"
                                      style="
                                        mso-style-priority: 100 !important;
                                        text-decoration: none !important;
                                        mso-line-height-rule: exactly;
                                        color: #ffffff;
                                        font-size: 22px;
                                        padding: 15px 20px 15px 20px;
                                        display: block;
                                        background: #37AB31;
                                        border-radius: 30px;
                                        font-family: Imprima, Arial, sans-serif;
                                        font-weight: bold;
                                        font-style: normal;
                                        line-height: 26px;
                                        width: auto;
                                        text-align: center;
                                        letter-spacing: 0;
                                        mso-padding-alt: 0;
                                        mso-border-alt: 10px solid #37AB31;
                                        mso-hide: all;
                                        padding-left: 5px;
                                        padding-right: 5px;
                                      "
                                      >Reset Password</a
                                    >
`;

const reviewAppBlock = `
                                    <h3
                                      style="
                                        margin: 0;
                                        font-family: Imprima, Arial, sans-serif;
                                        mso-line-height-rule: exactly;
                                        letter-spacing: 0;
                                        font-size: 28px;
                                        font-style: normal;
                                        font-weight: bold;
                                        line-height: 34px;
                                        color: #2d3142;
                                      "
                                    >
                                      Hi,
                                    </h3>
                                    <p
                                      style="
                                        margin: 0;
                                        mso-line-height-rule: exactly;
                                        font-family: Imprima, Arial, sans-serif;
                                        line-height: 27px;
                                        letter-spacing: 0;
                                        color: #2d3142;
                                        font-size: 18px;
                                      "
                                    >
                                      <br />A new app has been requested for review.<br/><br/>$__APP_DETAILS__<br /><br />
                                    </p>
                                    <a
                                      href="$__REVIEW_APP_URL__"
                                      class="es-button msohide"
                                      target="_blank"
                                      style="
                                        mso-style-priority: 100 !important;
                                        text-decoration: none !important;
                                        mso-line-height-rule: exactly;
                                        color: #ffffff;
                                        font-size: 22px;
                                        padding: 15px 20px 15px 20px;
                                        display: block;
                                        background: #37AB31;
                                        border-radius: 30px;
                                        font-family: Imprima, Arial, sans-serif;
                                        font-weight: bold;
                                        font-style: normal;
                                        line-height: 26px;
                                        width: auto;
                                        text-align: center;
                                        letter-spacing: 0;
                                        mso-padding-alt: 0;
                                        mso-border-alt: 10px solid #37AB31;
                                        mso-hide: all;
                                        padding-left: 5px;
                                        padding-right: 5px;
                                      "
                                      >Review App</a
                                    >
`;

export { resetPasswordBlock, reviewAppBlock };
