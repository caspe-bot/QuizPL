import * as React from "react";

interface OTPInputContextProps {
  value: string;
  onChange: (val: string) => void;
}

export const OTPInputContext = React.createContext<OTPInputContextProps>({
  value: "",
  onChange: () => {},
});

export const useOTPInput = () => React.useContext(OTPInputContext);
