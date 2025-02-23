"use client";

import * as React from "react";
import { RadioGroup } from "@heroui/react";
import { useTheme } from "next-themes";
import { useIsSSR } from "@react-aria/ssr";
import { useState } from "react";

import ThemeCustomRadio from "./ThemeCustomRadio";

export default function Page() {
  const { theme, setTheme } = useTheme();
  const isSSR = useIsSSR();
  const [themeRadio, setThemeRadio] = useState(
    theme === "light" || isSSR ? "light" : "dark"
  );

  React.useEffect(() => {
    setThemeRadio(theme === "light" || isSSR ? "light" : "dark");
  }, [theme, isSSR]);

  return (
    <div className="p-2">
      {/* Theme */}
      <div>
        <p className="text-base font-medium text-default-700">Theme</p>
        <p className="mt-1 text-sm font-normal text-default-400">
          Change the appearance of the app.
        </p>
        {/* Theme radio group */}
        <RadioGroup
          className="flex-wrap mt-4"
          defaultValue={themeRadio}
          orientation="horizontal"
          value={themeRadio}
          onValueChange={(value) => {
            setTheme(value);
            setThemeRadio(value);
          }}
        >
          <ThemeCustomRadio value="light" variant="light">
            Light
          </ThemeCustomRadio>
          <ThemeCustomRadio value="dark" variant="dark">
            Dark
          </ThemeCustomRadio>
        </RadioGroup>
      </div>
    </div>
  );
}
