"use client";

import { createContext, useContext, useState } from "react";

type RegistrationState = {
  submitted: boolean;
  setSubmitted: (submitted: boolean) => void;
};

const RegistrationContext = createContext<RegistrationState>({
  submitted: false,
  setSubmitted: () => {},
});

export function RegistrationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [submitted, setSubmitted] = useState(false);
  return (
    <RegistrationContext.Provider value={{ submitted, setSubmitted }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  return useContext(RegistrationContext);
}
