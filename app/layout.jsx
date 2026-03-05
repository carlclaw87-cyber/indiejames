import "./globals.css";

export const metadata = {
title: "IndieJames",
description: "Indie milestone curator"
};

export default function RootLayout({ children }) {
return (
<html lang="en">
<body>{children}</body></html>
);
}
