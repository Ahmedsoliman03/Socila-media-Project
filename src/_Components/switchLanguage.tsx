"use client";

import { useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const router = useRouter();

  const changeLanguage = (locale: string) => {
    // Update the locale and preserve the current path and query params
    router.push(`/${locale}${router.asPath}`);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('ar')}>Arabic</button>
    </div>
  );
}
